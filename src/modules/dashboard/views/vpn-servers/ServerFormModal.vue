<template>
  <n-modal
    v-model:show="showModal"
    preset="card"
    :title="`${mode === ViewMode.CREATE ? 'Thêm mới' : mode === ViewMode.EDIT ? 'Sửa' : 'Chi tiết'} Server VPN`"
    size="medium"
    :style="{ width: '55%' }"
  >
    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
      label-placement="left"
      label-width="120px"
      :validate-first="true"
      :scroll-to-first-error="true"
      require-mark-placement="right-hanging"
    >
      <n-form-item
        label="Tên Server"
        path="name"
      >
        <n-input
          v-model:value="formValue.name"
          placeholder="VD: Singapore 1"
          :disabled="isViewMode"
          @keydown.enter.prevent
        />
      </n-form-item>

      <n-form-item
        label="Host"
        path="host"
      >
        <n-input
          v-model:value="formValue.host"
          placeholder="vpn1.example.com"
          :disabled="isViewMode"
          @keydown.enter.prevent
        />
      </n-form-item>

      <n-form-item
        label="Vị trí"
        path="location"
      >
        <n-input
          v-model:value="formValue.location"
          placeholder="Việt Nam"
          :disabled="isViewMode"
          @keydown.enter.prevent
        />
      </n-form-item>

      <n-form-item
        label="Port"
        path="port"
      >
        <n-input-number
          v-model:value="formValue.port"
          :disabled="isViewMode"
        />
      </n-form-item>

      <n-form-item
        label="Protocol"
        path="protocol"
      >
        <n-select
          v-model:value="formValue.protocol"
          :options="VpnProtocol"
          placeholder="Chọn protocol"
          :disabled="isViewMode"
        />
      </n-form-item>

      <n-form-item
        label="Username"
        path="username"
      >
        <n-input
          v-model:value="formValue.username"
          placeholder="vpnuser"
          :disabled="isViewMode"
          @keydown.enter.prevent
        />
      </n-form-item>

      <n-form-item
        label="Password"
        path="password"
      >
        <n-input
          v-model:value="formValue.password"
          type="password"
          show-password-on="click"
          placeholder="securepass"
          :disabled="isViewMode"
          @keydown.enter.prevent
        />
      </n-form-item>

      <n-form-item
        label="Trạng thái"
        path="is_active"
      >
        <n-checkbox
          v-model:checked="formValue.is_active"
          :disabled="isViewMode"
        >
          {{ formValue.is_active ? "Hoạt động" : "Không hoạt động" }}
        </n-checkbox>
      </n-form-item>
    </n-form>

    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <n-button @click="closeModal">
          Đóng
        </n-button>
        <n-button
          v-if="!isViewMode"
          type="primary"
          :loading="store.isLoading"
          @click="submit"
        >
          Xác nhận
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, defineProps, defineEmits, onBeforeMount } from 'vue'
import { FormRules, useMessage } from 'naive-ui'
import { ViewMode } from '@/cores/contants/enum'
import { VpnServer } from '@dashboard/types/vpn-server'
import { VpnProtocol } from '@/cores/contants/data'
import { useVpnServerStore } from '@module/dashboard/stores/vpn-server'

interface Props {
  visibleModal?: boolean,
  mode?: ViewMode,
  server?: VpnServer | null
}

const props = withDefaults(defineProps<Props>(), {
  mode: ViewMode.VIEW,
  visibleModal: false,
  server: null
})

const emits = defineEmits(['update:visibleModal', 'close'])

const showModal = ref(props.visibleModal)
watch(showModal, (val) => emits('update:visibleModal', val))

const isViewMode = computed(() => props.mode === ViewMode.VIEW)

const formRef = ref()
const message = useMessage()
const store = useVpnServerStore();

const formValue = reactive<VpnServer>({
  name: props.server?.name || '',
  host: props.server?.host || '',
  location: props.server?.location || '',
  port: props.server?.port || 51820,
  protocol: props.server?.protocol || 'wireguard',
  username: props.server?.username || '',
  password: props.server?.password || '',
  ping_ms: props.server?.ping_ms || 0,
  is_active: props.server?.is_active ?? true
} as VpnServer)

const rules: FormRules = {
  name: [{ required: true, message: 'Vui lòng nhập tên server' }],
  host: [{ required: true, message: 'Vui lòng nhập host' }],
  location: [{ required: true, message: 'Vui lòng nhập vị trí' }],
  port: [{ required: true, type: 'number', message: 'Vui lòng nhập port' }],
  protocol: [{ required: true, message: 'Vui lòng chọn protocol' }],
  username: [{ required: true, message: 'Vui lòng nhập username' }],
  password: [{ required: true, message: 'Vui lòng nhập password' }],
  ping_ms: [{ required: true, type: 'number', message: 'Vui lòng nhập ping' }]
}

const closeModal = () => {
  formRef.value?.restoreValidation()
  Object.assign(formValue, {
    name: '',
    host: '',
    location: '',
    port: 51820,
    protocol: 'wireguard',
    username: '',
    password: '',
    ping_ms: 0,
    is_active: true
  })
  showModal.value = false
  emits('close')
}

const submit = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      
      // TODO: Call API to create/update VPN server
      let result;
      if (viewMode.value === ViewMode.CREATE) {
        result = await store.create(formValue)
      } else {
        result = await store.update(props.server?.id as string, formValue)
      }

      if (result.success) {
        message.success(result.message)
      } else {
        message.error(result.message)
      }

      store.fetchAll()
      closeModal();
    }
  })
}

onBeforeMount(() => {
  store.fetchAll()
})
</script>
