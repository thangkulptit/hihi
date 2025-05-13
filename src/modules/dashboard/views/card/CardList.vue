<template>
  <div class="card-list">
    <n-card title="Danh sách thẻ">
      <!-- Thanh tìm kiếm -->
      <div class="search-wrapper">
        <n-input
          v-model:value="serialSearch"
          placeholder="Nhập serial để tìm kiếm"
          clearable
          :style="{ width: '300px' }"
          @keydown.enter="handleSearch"
        >
          <template #prefix>
            <MIcon
              name="SearchOutlined"
              size="16"
            />
          </template>
        </n-input>

        <n-button
          class="ml-4"
          strong
          secondary
          type="primary"
          :disabled="cardStore.isLoading"
          @click="handleSearch"
        >
          Tìm kiếm
        </n-button>
        
        <n-button
          class="ml-4"
          secondary
          :disabled="cardStore.isLoading"
          @click="handleReset"
        >
          Xoá
        </n-button>
      </div>
      
      <!-- Bảng danh sách thẻ -->
      <n-spin :show="cardStore.isLoading">
        <n-table
          class="m-mt-md"
          :bordered="true"
          :single-line="false"
        >
          <thead>
            <tr>
              <th>Seri</th>
              <th>Pin</th>
              <th>Mệnh giá</th>
              <th>Thực nhận</th>
              <th>Shop</th>
              <th>Message</th>
              <th>Status</th>
              <th>Status Callback</th>
              <th>Status Cronjob</th>
              <th>Bao giờ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(shop, index) in cardStore.cards"
              :key="index"
            >
              <td>{{ shop.seri }}</td>
              <td>{{ shop.pin }}</td>
              <td>{{ shop.amount }}</td>
              <td>{{ shop.realAmount }}</td>
              <td>{{ shop.shopRelation.domain }}</td>
              <td>{{ shop.message }}</td>
              <td>{{ mapStatusCallback(shop.status) }}</td>
              <td>
                <n-text :type="shop.statusCallback ? 'success' : 'warning'">
                  {{ shop.statusCallback ? 'Rồi' : 'Chưa' }}
                </n-text>
              </td>
              <td>
                <n-text :type="shop.useCronjob ? 'warning' : 'info'">
                  {{ shop.useCronjob ? 'Rồi': 'Chưa' }}
                </n-text>
              </td>
              <td>
                <n-text type="info">
                  {{ fromNow(shop.createdAt) }}
                </n-text>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-spin>

      <n-pagination
        :default-page-size="20"
        :default-page="1"
        :on-update:page="pageChange"
        :on-update:page-size="sizeChange"
        :page-count="cardStore.countPage"
        show-size-picker
        :page-sizes="[5, 10, 20, 30, 40]"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import { useCardStore } from '../../stores/card';
import { MapStatus, Status } from '@/cores/contants/enum';
import { fromNow } from '@/cores/utils';

// Khai báo store
const cardStore = useCardStore();

// Trạng thái tìm kiếm
const serialSearch = ref('');

// Xử lý tìm kiếm
const handleSearch = async () => {
  await cardStore.setSearchSerial(serialSearch.value);
};

// Xử lý reset bộ lọc
const handleReset = async () => {
  serialSearch.value = '';
  await cardStore.resetFilters();
};

const mapStatusCallback = (status: Status) => {
  return MapStatus[status] || ''
}

const pageChange = (page: number) => {
  cardStore.setPage(page)
}

const sizeChange = (size: number) => {
  cardStore.setPageSize(size)
}

// Tải dữ liệu khi component được mount
onBeforeMount(async () => {
  await cardStore.fetchCards();
});

// Theo dõi thay đổi của ô tìm kiếm để tự động tìm kiếm khi xóa
watch(serialSearch, (newValue, oldValue) => {
  if (newValue === '' && oldValue !== '') {
    cardStore.setSearchSerial('');
  }
});
</script>

<style scoped>
.card-list {
  width: 100%;
}

.search-wrapper {
  display: flex;
  margin-bottom: 16px;
  align-items: center;
}

.ml-4 {
  margin-left: 16px;
}
</style>