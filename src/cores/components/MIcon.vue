<template>
  <n-icon
    v-if="selectedIcon"
    :size="size"
    :color="color"
  >
    <component :is="selectedIcon" />
  </n-icon>
  <span v-else>Icon not found</span>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { NIcon } from 'naive-ui'

// Chỉ import icon cần thiết
import {
  AddShoppingCartOutlined,
  DeleteOutlineRound,
  EditOutlined,
  AirplayTwotone,
  AnnouncementOutlined,
  ContentCopyFilled,
  FileDownloadOutlined,
  SearchOutlined
} from '@vicons/material'

// Định nghĩa danh sách icon được hỗ trợ
const icons: Record<string, any> = {
  AddShoppingCartOutlined,
  DeleteOutlineRound,
  EditOutlined,
  AirplayTwotone,
  AnnouncementOutlined,
  ContentCopyFilled,
  FileDownloadOutlined,
  SearchOutlined
}

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: "24"
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})

const selectedIcon = computed(() => icons[props.name] || null)

</script>


