<template>
  <div class="m-flex m-p-xs">
    <n-timeline>
      <n-timeline-item content="Hôm nay" />
      <n-timeline-item
        v-for="(item, index) in statisticStore.today"
        :key="index"
        type="success"
        :title="item.domain"
        :content="`Số card: ${formatCurrency(item.amount)}`"
        :time="`Thực nhận: ${formatCurrency(item.realAmount)}`"
      />
    
      <n-timeline-item
        type="Info"
        :content="`Tổng card: ${formatCurrency(statisticStore.totalAmountToday.amount)}`"
      />
      <n-timeline-item
        type="warning"
        :content="`Tổng nhận: ${formatCurrency(statisticStore.totalAmountToday.realAmount)}`"
      />
    </n-timeline>

    <n-timeline>
      <n-timeline-item content="Tháng này" />
      <n-timeline-item
        v-for="(item, index) in statisticStore.month"
        :key="index"
        type="success"
        :title="item.domain"
        :content="`Số card: ${formatCurrency(item.amount)}`"
        :time="`Thực nhận: ${formatCurrency(item.realAmount)}`"
      />
    
      <n-timeline-item
        type="Info"
        :content="`Tổng card: ${formatCurrency(statisticStore.totalAmountMonth.amount)}`"
      />
      <n-timeline-item
        type="warning"
        :content="`Tổng nhận: ${formatCurrency(statisticStore.totalAmountMonth.realAmount)}`"
      />
    </n-timeline>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useStatisticStore } from '../../stores/statistic';
import { formatCurrency } from '@/cores/utils';

const statisticStore = useStatisticStore();

onBeforeMount(() => {
  statisticStore.fetchAll();
})
</script>