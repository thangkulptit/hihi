<template>
  <div class="m-flex">
    <n-button
      type="primary"
      @click="create"
    >
      Thêm
      <template #icon>
        <MIcon
          size="16"
          name="AddShoppingCartOutlined"
        />
      </template>
    </n-button>
  </div>

  <n-spin :show="store.isLoading">
    <n-table
      class="m-mt-md"
      :bordered="true"
      :single-line="false"
    >
      <thead>
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Host</th>
          <th>Location</th>
          <th>Port</th>
          <th>Protocol</th>
          <th>Username</th>
          <th>Password</th>
          <th>ping_ms</th>
          <th>Status</th>
          <th>Created at</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(server, index) in store.servers"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ server.name }}</td>
          <td>{{ server.host }}</td>
          <td>{{ server.location }}</td>
          <td>{{ server.port }}</td>
          <td>{{ server.protocol }}</td>
          <td>{{ server.username }}</td>
          <td>{{ server.password }}</td>
          <td>{{ server.ping_ms }}</td>
          <td align="center">
            <n-badge
              dot
              :type="server.is_active ? 'success' : 'error'"
            />
          </td>
          <td>{{ formatDate(server.createdAt) }}</td>
          <td>
            <n-button
              quaternary
              circle
              type="info"
              @click="info(server)"
            >
              <template #icon>
                <MIcon
                  size="16"
                  name="AnnouncementOutlined"
                />
              </template>
            </n-button>

            <n-button
              quaternary
              circle
              type="primary"
              @click="edit(server)"
            >
              <template #icon>
                <MIcon
                  size="16"
                  name="EditOutlined"
                />
              </template>
            </n-button>

            <n-popconfirm
              @positive-click="remove(server)"
            >
              <template #trigger>
                <n-button
                  quaternary
                  circle
                  type="error"
                >
                  <template #icon>
                    <MIcon
                      size="16"
                      name="DeleteOutlineRound"
                    />
                  </template>
                </n-button>
              </template>
              Bạn có chắc chắn muốn remove id {{ server.id }}
            </n-popconfirm>
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-spin>

  <ServerFormModal
    v-if="visibleServerForm"
    v-model:visible-modal="visibleServerForm"
    :server="serverEditing"
    :mode="viewMode"
  />
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, defineAsyncComponent } from 'vue'
import { useVpnServerStore } from '../../stores/vpn-server';
import { ViewMode } from '@/cores/contants/enum';
import { formatDate } from '@/cores/utils';
import { useMessage } from 'naive-ui';
import { VpnServer } from '../../types/vpn-server';

const ServerFormModal = defineAsyncComponent(() =>
  import('./ServerFormModal.vue')
);

const store = useVpnServerStore();
const message = useMessage();

const viewMode = ref(ViewMode.VIEW);
const visibleServerForm = ref(false);
const serverEditing = ref<VpnServer | null>(null);

onBeforeMount(async () => {
  store.fetchAll();
})

const edit = (shop: VpnServer) => {
  viewMode.value = ViewMode.EDIT
  serverEditing.value = shop
  visibleServerForm.value = true
}

const info = (shop: VpnServer) => {
  viewMode.value = ViewMode.VIEW
  serverEditing.value = shop
  visibleServerForm.value = true
}

const create = () => {
  viewMode.value = ViewMode.CREATE
  serverEditing.value = null
  visibleServerForm.value = true
}

const remove = async (shop: VpnServer) => {
  const result = await store.remove(shop.id);
  if (result.success) {
    message.warning('Xoá thành công shop id: ' + shop.id)
    store.fetchAll()
  } else {
    message.error('Xoá thất bại shop id: ' + shop.id)
  }
}
</script>