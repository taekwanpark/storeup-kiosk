<template>
  <div class="relative">
    <!-- chip buttons -->
    <div class="fixed mt-8 mx-13 z-50">
      <ul class="flex gap-x-6">
        <template v-for="(item, index) in shopChipIcons" :key="index">
          <li @click="selectChip(index)">
            <ChipButton
                :chip-type="item.chipType"
                :color="item.color"
                :is-selected="currentChip === index"
                :text="item.text"
            />
          </li>
        </template>
      </ul>
    </div>
    <!--  -->
    <KioskMap ref="kioskMapRef" :initial-position="initialPosition"/>
    <!-- bottom container -->
    <div class="fixed inset-x-0 bottom-[12.75rem] z-50">
      <!-- map controller -->
      <KioskMapBottomController
          :move-to-default="kioskMapRef?.moveToDefault"
          :zoom-in="kioskMapRef?.zoomIn"
          :zoom-out="kioskMapRef?.zoomOut"
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
                  :address="store.address"
                  :category="store.category"
                  :contact="store.contact"
                  :distance="store.distance"
                  :fee="store.fee"
                  :opening-hours="store.openingHours"
                  :store-name="store.storeName"
                  :store-status="store.storeStatus"
                  :thumbnail="store.thumbnail"
              />
            </li>
            <hr v-if="index !== stores.length - 1" class="border-[#e5e5e5]"/>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {Ref, ref} from 'vue'
// type
import {MapChipType} from '@renderer/components/icon/types'
import type {MapChipProps} from '@renderer/components/buttons/chip-button/ChipButton.vue'
import {getStoreStatusType} from '@renderer/components/list-item/types'
// vue
import ChipButton from '@renderer/components/buttons/chip-button/ChipButton.vue'
import MapCardItem from '@renderer/components/list-item/MapCardItem.vue'
import KioskMap from '@renderer/components/map/KioskMap.vue'
import KioskMapBottomController from '@renderer/components/map/KioskMapBottomController.vue'

export type KioskMapRef = InstanceType<typeof KioskMap> | undefined
const kioskMapRef: Ref<KioskMapRef> = ref(undefined)
const initialPosition: Ref<{ lat: number; lng: number }> = ref({lat: 35.147707, lng: 129.058673})

const stores = [
  {
    storeName: '철이네 생선 가게',
    storeStatus: getStoreStatusType('Close'),
    category: '주차장',
    thumbnail: 'example1.jpg',
    address: '전북 부안군 부안읍 번영로 149',
    distance: 580,
    contact: '0507-1339-1343',
    openingHours: '월~토 09:00-18:00 매주 일요일 정기휴무',
    fee: '최초 2시간 • 2시간초과시 기본요금 2,000'
  },
  {
    storeName: '철이네 생선 가게',
    storeStatus: getStoreStatusType('Close'),
    category: '주차장',
    thumbnail: 'example1.jpg',
    address: '전북 부안군 부안읍 번영로 149',
    distance: 5800,
    contact: '0507-1339-1343',
    openingHours: '월~토 09:00-18:00 매주 일요일 정기휴무',
    fee: '최초 2시간 • 2시간초과시 기본요금 2,000'
  },
  {
    storeName: '철이네 생선 가게',
    storeStatus: getStoreStatusType('Close'),
    category: '주차장',
    thumbnail: 'example1.jpg',
    address: '전북 부안군 부안읍 번영로 149',
    distance: 5800,
    contact: '0507-1339-1343',
    openingHours: '월~토 09:00-18:00 매주 일요일 정기휴무',
    fee: '최초 2시간 • 2시간초과시 기본요금 2,000'
  }
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
  parking: {
    text: '주차장',
    chipType: MapChipType.Parking,
    color: 'bg-[#0025a3]'
  },
  electron: {
    text: '전기차 충전소',
    chipType: MapChipType.ElectronicCharge,
    color: 'bg-[#ff9300]'
  },
  toilet: {
    text: '화장실',
    chipType: MapChipType.Toilet,
    color: 'bg-[#ce0000]'
  },
  shelter: {
    text: '쉼터',
    chipType: MapChipType.Shelter,
    color: 'bg-[#008b45]'
  }
}
</script>

<style scoped>
#card-container-shadow {
  box-shadow: 0 -5px 30px 0 rgba(97, 112, 126, 0.31);
}
</style>
