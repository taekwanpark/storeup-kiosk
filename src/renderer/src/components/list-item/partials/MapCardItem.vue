<template>
  <div class="w-full bg-white_ff flex">
    <!-- ------------------------------------------------------------------------
    information 
    ------------------------------------------------------------------------ -->
    <div class="w-full">
      <!-- header -->
      <div class="flex items-center space-x-3">
        <!-- store name -->
        <div class="flex items-center">
          <span class="card-store-name">{{ storeName }}</span>
          <span class="card-store-category ml-4">{{ category }}</span>
        </div>
      </div>

      <div class="mt-5">
        <div class="flex flex-col gap-y-4">
          <!-- operation hours -->
          <div class="flex space-x-2">
            <SvgIcon :icon="EtcIconType.Clock" />
            <!-- status -->
            <div>
              <span :class="storeStatusStyle[storeStatus].textColor" class="card-status-badge">
                {{ storeStatusStyle[storeStatus].text }}
              </span>
            </div>
            <div>
              <p class="card-information">
                <span class="text-[#9a9a9a]">&#32;&#183;&#32;</span>
                <span>{{ openingHours }}</span>
              </p>
            </div>
          </div>
          <!-- contact -->
          <div class="flex space-x-2">
            <SvgIcon :icon="EtcIconType.Contact" />
            <p class="card-information">{{ contact }}</p>
          </div>
          <!-- fee -->
          <div v-if="fee" class="flex space-x-2">
            <SvgIcon :icon="EtcIconType.Cash" />
            <p class="card-information">{{ fee }}</p>
          </div>

          <!-- map -->
          <div class="flex space-x-2">
            <SvgIcon :icon="EtcIconType.Map" />
            <div class="flex">
              <p class="card-information">
                {{ address }}
              </p>
              <span class="card-distance ml-2.5">{{ convertDistance(distance) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ------------------------------------------------------------------------
    image 
    ------------------------------------------------------------------------ -->
    <div class="w-[15.625rem] h-[11.375rem] ml-[3.75rem] flex-none border">
      <img
        :src="'/src/assets/' + thumbnail"
        alt="example1"
        class="object-cover object-center w-full h-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// type
import { EtcIconType } from '@renderer/components/icon/types'
import { StoreStatusKeys, storeStatusStyle } from '@renderer/components/list-item/types'
// vue
import SvgIcon from '@renderer/components/icon/SvgIcon.vue'
// lib
import { heightAdjustHandler } from '@renderer/libs/useHeightAdjustHandler'
import { convertDistance } from '@renderer/libs/convertDistance'

export interface MapCardItemProps {
  storeName: string
  storeStatus: StoreStatusKeys
  category: string
  thumbnail?: string
  address: string
  distance: number
  contact: string
  openingHours: string
  fee?: string
}

defineProps<MapCardItemProps>()

/*
|----------------------------------------------------------------------------------------------------
| heightAdjustHandler
|----------------------------------------------------------------------------------------------------
*/
onMounted(() => {
  heightAdjustHandler({
    selector: 'card-store-name',
    fontSize: 2.25,
    height: 2.688
  })
  heightAdjustHandler({
    selector: 'card-store-category',
    fontSize: 1.5,
    height: 1.812
  })
  heightAdjustHandler({
    selector: 'card-status-badge',
    fontSize: 1.5,
    height: 1.812
  })
  heightAdjustHandler({
    selector: 'card-information',
    fontSize: 1.5,
    height: 1.812
  })
})
</script>

<style scoped>
/* 
|-------------------------------
| card
|------------------------------- 
*/
.card-status-badge {
  @apply text-k6 leading-[1.2] tracking-[-0.46px] font-medium;
}
.card-store-name {
  @apply text-k9 leading-[1.2] tracking-[-0.68px] text-dark_24 font-bold;
}
.card-store-category {
  @apply text-k6 leading-[1.2] tracking-[-0.46px] text-[#b7b7b7] font-normal;
}
.card-information {
  @apply text-k6 leading-[1.2] tracking-[-0.46px] text-[#000000] font-normal;
}
.card-distance {
  @apply text-k6 leading-[1.2] tracking-[-0.46px] text-blue_bright font-medium;
}
</style>
