<template>
  <n-modal 
    v-model:show="showModal"
    preset="dialog"
    title="Dialog"
    style="width: 70%;"
    positive-text="Submit"
    negative-text="Cancel"
    @positive-click="emits('submit')"
    @negative-click="emits('update:visiblePopup', false)"
  />
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watch, withDefaults } from 'vue'
import { useShopStore } from '../../stores/shop'
import { ViewMode } from '@/cores/contants/enum';

interface Props {
  visiblePopup?: boolean;
  mode?: ViewMode
}
const props = withDefaults(defineProps<Props>(), {
  visiblePopup: false,
  mode: ViewMode.VIEW
});


const emits = defineEmits(['update:visiblePopup', 'submit', 'close'])

const showModal = ref(props.visiblePopup);

watch(showModal, (newValue) => {
  emits('update:visiblePopup', newValue)
})

onBeforeMount(() => {
  
})


</script>