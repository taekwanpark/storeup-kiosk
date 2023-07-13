<template>
  <div class="relative">
    <!-- chip buttons -->
    <div class="absolute mt-8 mx-13">
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
    <!--  -->
    <div class="bg-gray-200 w-full">a</div>
  </div>
  <!-- card list -->
  <div
    id="card-container-shadow"
    class="fixed inset-x-0 bottom-[12.75rem] w-full min-w-[67.5rem] bg-white_ff rounded-t-[3.125rem]"
  >
    <ul class="mx-8 mt-13 flex flex-col gap-y-[2.25rem] max-h-[38rem] overflow-auto">
      <template v-for="(store, index) in stores" :key="index">
        <li :class="index === stores.length - 1 ? 'pb-13' : ''" class="px-5">
          <MapCardItem
            :store-name="store.storeName"
            :store-status="store.storeStatus"
            :category="store.category"
            :thumbnail="store.thumbnail"
            :address="store.address"
            :distance="store.distance"
            :contact="store.contact"
            :opening-hours="store.openingHours"
            :fee="store.fee"
          />
        </li>
        <hr v-if="index !== stores.length - 1" class="border-[#e5e5e5]" />
      </template>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue'
// type
import { MapChipType } from '@renderer/components/icon/types'
import type { MapChipProps } from '@renderer/components/buttons/chip-button/ChipButton.vue'
// vue
import ChipButton from '@renderer/components/buttons/chip-button/ChipButton.vue'
import MapCardItem from '@renderer/components/list-item/partials/MapCardItem.vue'
import { storeStatusType } from '@renderer/components/list-item/types'

const stores = [
  {
    storeName: '철이네 생선 가게',
    storeStatus: storeStatusType('Close'),
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
    storeStatus: storeStatusType('Close'),
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
    storeStatus: storeStatusType('Close'),
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
