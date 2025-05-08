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

  <n-spin :show="shopStore.isLoading">
    <n-table
      class="m-mt-md"
      :bordered="true"
      :single-line="false"
    >
      <thead>
        <tr>
          <th>STT</th>
          <th>Domain</th>
          <th>Callback</th>
          <th>Status</th>
          <th>Created at</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(shop, index) in shopStore.shops"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ shop.domain }}</td>
          <td>{{ shop.callback }}</td>
          <td align="center">
            <n-badge
              dot
              :type="shop.active ? 'success' : 'error'"
            />
          </td>
          <td>{{ formatDate(shop.createdAt) }}</td>
          <td>
            <n-button
              quaternary
              circle
              type="info"
              @click="info(shop)"
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
              @click="edit(shop)"
            >
              <template #icon>
                <MIcon
                  size="16"
                  name="EditOutlined"
                />
              </template>
            </n-button>

            <n-popconfirm
              @positive-click="remove(shop)"
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
              Bạn có chắc chắn muốn remove shop id {{ shop.id }}
            </n-popconfirm>
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-spin>

  <ShopFormModal
    v-if="visibleShopForm"
    v-model:visible-modal="visibleShopForm"
    :shop="shopEditing"
    :mode="viewMode"
  />
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, defineAsyncComponent } from 'vue'
import { useShopStore } from '../../stores/shop'
import { ViewMode } from '@/cores/contants/enum';
import { formatDate } from '@/cores/utils';
import { Shop } from '../../types/shop';
import { useMessage } from 'naive-ui';

const ShopFormModal = defineAsyncComponent(() =>
  import('./ShopFormModal.vue')
);

const shopStore = useShopStore();
const message = useMessage();

const viewMode = ref(ViewMode.VIEW);
const visibleShopForm = ref(false);
const shopEditing = ref<Shop | null>(null);

onBeforeMount(async () => {
  shopStore.fetchAll();
})

const edit = (shop: Shop) => {
  viewMode.value = ViewMode.EDIT
  shopEditing.value = shop
  visibleShopForm.value = true
}

const info = (shop: Shop) => {
  viewMode.value = ViewMode.VIEW
  shopEditing.value = shop
  visibleShopForm.value = true
}

const create = () => {
  viewMode.value = ViewMode.CREATE
  shopEditing.value = null
  visibleShopForm.value = true
}

const remove = async (shop: Shop) => {
  const result = await shopStore.remove(shop.id);
  if (result.success) {
    message.warning('Xoá thành công shop id: ' + shop.id)
    shopStore.fetchAll()
  } else {
    message.error('Xoá thất bại shop id: ' + shop.id)
  }
}
</script>