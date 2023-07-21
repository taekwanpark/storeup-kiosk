<template>
  <div class="w-full min-w-[67.5rem] bg-[#f2f2f2] p-13 flex">
    <!-- ------------------------------------------------------------------------
    image 
    ------------------------------------------------------------------------ -->
    <div class="w-100 h-68 flex-none border">
      <img
        :src="'/src/assets/' + thumbnail"
        alt="example1"
        class="object-cover object-center w-full h-full"
      />
    </div>
    <!-- ------------------------------------------------------------------------
    information 
    ------------------------------------------------------------------------ -->
    <div class="ml-5 w-full">
      <!-- header -->
      <div class="flex items-center space-x-3">
        <!-- store name -->
        <div class="">
          <span class="card-store-name">{{ storeName }}</span>
        </div>
      </div>

      <div class="mt-5">
        <div class="flex flex-col gap-y-4">
          <!-- operation hours -->
          <div class="flex space-x-2">
            <SvgIcon :icon="EtcIconType.Clock" />
            <!-- status -->
            <div class="mt-pt">
              <span :class="storeStatusStyle[storeStatus].textColor" class="card-status-badge">
                {{ storeStatusStyle[storeStatus].text }}
              </span>
            </div>
            <p class="card-information">{{ openingHours }}</p>
          </div>

          <!-- contact -->
          <div class="flex space-x-2">
            <SvgIcon :icon="EtcIconType.Contact" />
            <p class="card-information">{{ contact }}</p>
          </div>

          <!-- fee -->
          <div id="cssVariable" class="flex space-x-2">
            <SvgIcon :icon="EtcIconType.Cash" />
            <p class="card-information">{{ fee }}</p>
          </div>

          <!-- map -->
          <div class="flex space-x-2">
            <SvgIcon :icon="EtcIconType.Map" />
            <div class="flex flex-col">
              <p class="card-information">
                {{ address }}
              </p>
              <a href="#" class="card-information-link mt-0.5" @click.prevent="false">
                Go to Map
              </a>
            </div>
          </div>
        </div>
      </div>
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

export interface SearchCardItemProps {
  storeName: string
  storeStatus: StoreStatusKeys
  thumbnail?: string
  address: string
  contact: string
  fee: string
  openingHours: string
}

defineProps<SearchCardItemProps>()

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
.card-information {
  @apply text-k6 leading-[1.2] tracking-[-0.46px] text-[#000000] font-normal;
}
.card-information-link {
  @apply text-k6 leading-[1.2] tracking-[-0.46px] font-normal text-azure underline underline-offset-4;
}
</style>
