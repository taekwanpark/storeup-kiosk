<template>
  <div class="recommand-item-shadow w-fit px-[2.25rem] py-3 flex items-end rounded-full">
    <span class="recommand-item text-k6 font-medium"> {{ label }} </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// lib
import { heightAdjustHandler } from '@renderer/libs/useHeightAdjustHandler'
// type
import { SearchRecommandItemProps } from '@renderer/features/search/types'

defineProps<SearchRecommandItemProps>()
/*
|----------------------------------------------------------------------------------------------------
| heightAdjustHandler
|----------------------------------------------------------------------------------------------------
*/
onMounted(() => {
  heightAdjustHandler({
    selector: 'recommand-item',
    fontSize: 1.5,
    lineHeight: 2.25,
    height: 1.812
  })
})
</script>

<style scoped>
.recommand-item-shadow {
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.16);
}
</style>
