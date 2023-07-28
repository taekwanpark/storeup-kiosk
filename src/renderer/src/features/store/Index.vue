<template>
  <div class="relative">
    <!-- chip buttons -->
    <div class="fixed mt-8 mx-13 z-50">
      <ul class="flex gap-x-6">
        <template v-for="(item, index) in shopChipIcons" :key="index">
          <li @click="selectChip(index)">
            <ChipButton
              :text="item.text"
              :chip-type="item.chipType"
              :color="item.color"
              :is-selected="currentChip === index"
            />
          </li>
        </template>
      </ul>
    </div>
    <KioskMap ref="kioskMapRef" :initial-position="initialPosition" />
    <!-- bottom container -->
    <div class="fixed inset-x-0 bottom-[12.75rem] z-50">
      <!-- map controller -->
      <KioskMapBottomController
        :zoom-in="kioskMapRef?.zoomIn"
        :zoom-out="kioskMapRef?.zoomOut"
        :move-to-default="kioskMapRef?.moveToDefault"
      />
      <!-- card list -->
      <div
        id="card-container-shadow"
        class="w-full min-w-[67.5rem] bg-white_ff rounded-t-[3.125rem]"
      >
        <ul class="mx-8 flex flex-col gap-y-[2.25rem] max-h-[40rem] overflow-auto">
          <template v-for="(store, index) in stores" :key="index">
            <li
              :class="[index === stores.length - 1 ? 'mb-13' : '', index === 0 ? 'mt-13' : '']"
              class="px-5"
            >
              <MapCardItem
                :store-name="store.storeName"
                :store-status="store.storeStatus"
                :category="store.category"
                :thumbnail="store.thumbnail"
                :address="store.address"
                :distance="store.distance"
                :contact="store.contact"
                :opening-hours="store.openingHours"
              />
            </li>
            <hr v-if="index !== stores.length - 1" class="border-[#e5e5e5]" />
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue'
// type
import { MapChipType } from '@renderer/components/icon/types'
import type { MapChipProps } from '@renderer/components/buttons/chip-button/ChipButton.vue'
import { storeStatusType } from '@renderer/components/list-item/types'
// vue
import ChipButton from '@renderer/components/buttons/chip-button/ChipButton.vue'
import MapCardItem from '@renderer/components/list-item/MapCardItem.vue'
import KioskMap from '@renderer/components/map/KioskMap.vue'
import KioskMapBottomController from '@renderer/components/map/KioskMapBottomController.vue'

export type KioskMapRef = InstanceType<typeof KioskMap> | undefined
const kioskMapRef: Ref<KioskMapRef> = ref(undefined)
const initialPosition: Ref<{ lat: number; lng: number }> = ref({ lat: 35.147707, lng: 129.058673 })

const stores = [
  {
    storeName: '철이네 생선 가게',
    storeStatus: storeStatusType('Close'),
    category: '과일가게',
    thumbnail: 'example1.jpg',
    address: '전북 부안군 부안읍 번영로 149',
    distance: 580,
    contact: '0507-1339-1343',
    openingHours: '월~토 09:00-18:00 매주 일요일 정기휴무'
  }
  // {
  //   storeName: '철이네 생선 가게',
  //   storeStatus: storeStatusType('Close'),
  //   category: '과일가게',
  //   thumbnail: 'example1.jpg',
  //   address: '전북 부안군 부안읍 번영로 149',
  //   distance: 5800,
  //   contact: '0507-1339-1343',
  //   openingHours: '월~토 09:00-18:00 매주 일요일 정기휴무'
  // },
  // {
  //   storeName: '철이네 생선 가게',
  //   storeStatus: storeStatusType('Close'),
  //   category: '과일가게',
  //   thumbnail: 'example1.jpg',
  //   address: '전북 부안군 부안읍 번영로 149',
  //   distance: 5800,
  //   contact: '0507-1339-1343',
  //   openingHours: '월~토 09:00-18:00 매주 일요일 정기휴무'
  // }
]
/*
|----------------------------------------------------------------------------------------------------
| Select Chip
|----------------------------------------------------------------------------------------------------
*/
const currentChip: Ref<string> = ref('whole')
function selectChip(index: string): void {
  currentChip.value = index
}
/*
|----------------------------------------------------------------------------------------------------
| Shop Chip Icon List
|----------------------------------------------------------------------------------------------------
*/
type ShopChipIconRecord = Record<string, MapChipProps>
const shopChipIcons: ShopChipIconRecord = {
  whole: {
    text: '전체',
    chipType: MapChipType.Whole,
    color: 'bg-blue_bright'
  },
  youth: {
    text: '젊음의 거리',
    chipType: MapChipType.YouthStreet,
    color: 'bg-[#00853d]'
  },
  red: {
    text: '레드 거리',
    chipType: MapChipType.RedStreet,
    color: 'bg-[#d30000]'
  },
  sentimental: {
    text: '감성거리',
    chipType: MapChipType.SentimentalStreet,
    color: 'bg-[#ff7600]'
  },
  market: {
    text: '부안 상설 시장',
    chipType: MapChipType.BuanMarket,
    color: 'bg-[#006eac]'
  }
}
</script>

<style scoped>
#card-container-shadow {
  box-shadow: 0 -5px 30px 0 rgba(97, 112, 126, 0.31);
}
</style>
