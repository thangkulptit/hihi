<template>
  <n-modal
    v-model:show="showModal"
    preset="card"
    :title="`${mode === ViewMode.CREATE ? 'Thêm mới' : mode === ViewMode.EDIT ? 'Sửa': 'Chi tiết'} shop`"
    size="medium"
    :style="{ width: '55%' }"
  >
    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
      label-placement="left"
      label-width="100px"
      require-mark-placement="right-hanging"
    >
      <n-form-item
        label="Domain"
        path="domain"
      >
        <n-input
          v-model:value="formValue.domain"
          :disabled="isViewMode"
          placeholder="Nhập domain: https://store3s.com"
          @keydown.enter.prevent
        />
        <n-button
          v-if="isViewMode"
          quaternary
          circle
          @click="coppied(() => copyToClipboard(formValue.domain || ''))"
        >
          <template #icon>
            <MIcon
              size="16"
              name="ContentCopyFilled"
            />
          </template>
        </n-button>
      </n-form-item>
      
      <n-form-item
        label="Callback URL"
        path="callbackUrl"
      >
        <n-input
          v-model:value="formValue.callback"
          :disabled="isViewMode"
          placeholder="Nhập callback URL"
          @keydown.enter.prevent
        />
        <n-button
          v-if="isViewMode"
          quaternary
          circle
          @click="coppied(() => copyToClipboard(formValue.callback || ''))"
        >
          <template #icon>
            <MIcon
              size="16"
              name="ContentCopyFilled"
            />
          </template>
        </n-button>
      </n-form-item>

      <template v-if="isViewMode">
        <n-form-item
          label="Secret"
          path="secret"
        >
          <n-input
            type="password"
            :value="props.shop?.secret"
            show-password-on="mousedown"
          />
          <n-button
            quaternary
            circle
            @click="coppied(() => copyToClipboard(shop?.secret || ''))"
          >
            <template #icon>
              <MIcon
                size="16"
                name="ContentCopyFilled"
              />
            </template>
          </n-button>
        </n-form-item>

        <n-form-item
          label="Key"
          path="key"
        >
          <n-input
            type="password"
            :value="props.shop?.key"
            show-password-on="mousedown"
          />

          <n-button
            quaternary
            circle
            @click="coppied(() => copyToClipboard(shop?.key || ''))"
          >
            <template #icon>
              <MIcon
                size="16"
                name="ContentCopyFilled"
              />
            </template>
          </n-button>
        </n-form-item>
      </template>
      
      <n-form-item
        label="Active"
        path="isActive"
      >
        <n-checkbox
          v-model:checked="formValue.active"
          :disabled="isViewMode"
        >
          {{ formValue.active ? "Hoạt động" : "Không hoạt động" }}
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
          :loading="loading"
          @click="submit"
        >
          Xác nhận
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, defineEmits, watch, computed } from 'vue'
import { FormRules, useMessage } from 'naive-ui'
import { ViewMode } from '@/cores/contants/enum';
import { useShopStore } from '../../stores/shop';
import { CreateShopPayload, Shop } from '../../types/shop';

interface Props {
  visibleModal?: boolean,
  mode?: ViewMode,
  shop?: Shop | null
}

const props = withDefaults(defineProps<Props>(), {
  mode: ViewMode.VIEW,
  visibleModal: false,
  shop: null
})

const emits = defineEmits(['update:visibleModal', 'close'])

const message = useMessage()
const shopStore = useShopStore();

const showModal = ref(props.visibleModal)
const loading = ref(false)
const formRef = ref(null)

const isViewMode = computed(() => props.mode === ViewMode.VIEW)

const formValue = reactive<CreateShopPayload>({
  domain: props.shop?.domain || '',
  callback: props.shop?.callback || '',
  active: props.shop?.active !== undefined ? props.shop?.active : true
})

watch(showModal, (value) => {
  emits('update:visibleModal', value)
})

const rules = {
  domain: [
    { required: true, message: 'Vui lòng nhập domain', trigger: 'blur' },
    { 
      validator: (rule: FormRules, value: string) => {
        const domainRegex = /^https?:\/\/[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+(?:\/[\w-.~:/?#[\]@!$&'()*+,;=]*)?$/;
        return domainRegex.test(value) || value.includes('localhost')
      },
      message: 'Domain không hợp lệ',
      trigger: 'blur'
    }
  ],
  callback: [
    { required: true, message: 'Vui lòng nhập callback URL', trigger: 'blur' },
    { 
      validator: (rule: FormRules, value: string) => {
        try {
          new URL(value)
          return true
        } catch {
          return false
        }
      },
      message: 'Callback URL không hợp lệ',
      trigger: 'blur'
    }
  ]
}

const coppied = (cb) => {
  cb();

  message.info('Coppied.')
}

const closeModal = () => {
  formRef.value?.restoreValidation()
  Object.assign(formValue, {
    domain: '',
    callback: '',
    active: true
  })
  showModal.value = false
  emits('close')
}

const submit = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true
      
      let result;
      if (props.mode === ViewMode.EDIT && props.shop) {
        result = await shopStore.update(props.shop?.id, formValue)
      } else {
        result = await shopStore.create(formValue)
      }
      if (result.success) {
        message.success(result.message)
        shopStore.fetchAll()
        closeModal()
      } else {
        message.error(result.message)
      }

      loading.value = false
    }
  })
}
</script>