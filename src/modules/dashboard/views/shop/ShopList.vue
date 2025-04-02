<template>
  <div class="m-flex">
    <n-button
      type="primary"
      @click="visibleShopForm = true"
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

  <n-table
    class="m-mt-md"
    :bordered="true"
    :single-line="false"
  >
    <thead>
      <tr>
        <th>STT</th>
        <th>Secret ID</th>
        <th>Key ID</th>
        <th>Domain</th>
        <th>Callback</th>
        <th>Status</th>
        <th>Created at</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>放弃</td>
        <td>反常的</td>
        <td>彻底废除</td>
        <td>...</td>
        <td>Damn it! I can't remember those words.</td>
        <td>Damn it! I can't remember those words.</td>
        <td>Damn it! I can't remember those words.</td>
      </tr>
    </tbody>
  </n-table>

  <ShopFormModal
    v-if="visibleShopForm"
    v-model:visible-popup="visibleShopForm"
    :mode="viewMode"
    @submit="submitForm"
  />
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, defineAsyncComponent } from 'vue'
import { useShopStore } from '../../stores/shop'
import { ViewMode } from '@/cores/contants/enum';
import { Console } from '@/cores/utils/logger';

const ShopFormModal = defineAsyncComponent(() =>
  import('./ShopFormModal.vue')
);

const { shops, fetchAll } = useShopStore();

const viewMode = ref(ViewMode.VIEW);
const visibleShopForm = ref(false);

const submitForm = () => {
  Console.info('Submit')
}

onBeforeMount(() => {
  fetchAll();
})
</script>