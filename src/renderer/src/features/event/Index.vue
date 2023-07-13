<template>
  <div class="relative">
    <div class="fixed top-[13.5rem] inset-x-0 min-w-[67.5rem] z-10">
      <div class="flex h-32 bg-white_f5">
        <div class="w-full">
          <input
            id="ongoing"
            v-model="currentTab"
            class="hidden"
            type="radio"
            name="event"
            :value="getEventStatusType('Ongoing')"
          />
          <label
            for="ongoing"
            class="event-tab-text w-full h-full flex justify-center items-center"
          >
            진행중인 이벤트
          </label>
        </div>
        <div class="w-full">
          <input
            id="ended"
            v-model="currentTab"
            class="hidden"
            type="radio"
            name="event"
            :value="getEventStatusType('Ended')"
          />
          <label for="ended" class="event-tab-text w-full h-full flex justify-center items-center">
            종료된 이벤트
          </label>
        </div>
      </div>
    </div>
    <div class="mt-32 mb-[12.75rem]">
      <template v-if="currentTab === getEventStatusType('Ongoing')">
        <template v-for="item in list" :key="item.id">
          <ListItem
            :id="item.id"
            :title="item.title"
            :caption="item.caption"
            :thumbnail="item.thumbnail"
            :list-item-type="item.listItemType"
          />
          <hr class="mx-13 border-[#c0c2c4]" />
        </template>
      </template>
      <template v-if="currentTab === getEventStatusType('Ended')">
        <template v-for="item in list" :key="item.id">
          <ListItem
            :id="item.id"
            :title="item.title"
            :caption="item.caption"
            :thumbnail="item.thumbnail"
            :list-item-type="item.listItemType"
            :event-status-type="item.eventStatusType"
          />
          <hr class="mx-13 border-[#c0c2c4]" />
        </template>
      </template>
    </div>
  </div>
  <!-- pagination -->
  <div class="fixed bottom-[12.75rem] inset-x-0 h-[8.25rem]">
    <div class="h-full flex justify-center items-center gap-x-[0.688rem]">
      <!-- <Pagination /> -->
      <button
        class="w-9 aspect-square border border-grey_bluey_9b rounded-[0.375rem] flex items-center justify-center"
      >
        <SvgIcon :icon="PaginationIconType.ChevronDoubleLeft" />
      </button>
      <button
        class="w-9 aspect-square border border-grey_bluey_9b rounded-[0.375rem] flex items-center justify-center"
      >
        <SvgIcon :icon="PaginationIconType.ChevronLeft" />
      </button>
      
      <button
        class="w-9 aspect-square border border-grey_bluey_9b rounded-[0.375rem] flex items-center justify-center"
      >
        1
      </button>



      <button
        class="w-9 aspect-square border border-grey_bluey_9b rounded-[0.375rem] flex items-center justify-center"
      >
        <SvgIcon :icon="PaginationIconType.ChevronRight" />
      </button>
      <button
        class="w-9 aspect-square border border-grey_bluey_9b rounded-[0.375rem] flex items-center justify-center"
      >
        <SvgIcon :icon="PaginationIconType.ChevronDoubleRight" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, provide, ref } from 'vue'
// type
import type { EventStatusTypeKeys } from '@renderer/components/list-item/types'
import { PaginationIconType } from '@renderer/components/icon/types'
// lib
import { getEventStatusType, getListItemType } from '@renderer/components/list-item/types'
import { TabItemKey, TabItem } from '@renderer/components/list-item/types'
// vue
import ListItem from '@renderer/components/list-item/partials/ListItem.vue'
import Pagination from '@renderer/components/Pagination.vue'
import SvgIcon from '@renderer/components/icon/SvgIcon.vue'

/*
|----------------------------------------------------------------------------------------------------
| Select Tab
|----------------------------------------------------------------------------------------------------
*/
const currentTab: Ref<EventStatusTypeKeys> = ref(getEventStatusType('Ongoing'))
/*
|----------------------------------------------------------------------------------------------------
| Tab Item
|----------------------------------------------------------------------------------------------------
|
| item id | null -> toggle
|
*/
const currentItemIndex: Ref<string | null> = ref(null)
const tabItem: TabItem = (id) => {
  console.log(id)
}
provide(TabItemKey, tabItem)

const list = [
  {
    id: '0',
    listItemType: getListItemType('Event'),
    title: '부안군 정보화 농업인 연구회를 개최합니다. 2023년 6월 ~',
    caption: '2023.06.03 ~ 2023.06.06',
    thumbnail: 'example1.jpg',
    eventStatusType: getEventStatusType('Ended')
  },
  {
    id: '1',
    listItemType: getListItemType('Event'),
    title: '부안군 정보화 농업인 연구회를 개최합니다. 2023년 6월 ~',
    caption: '2023.06.03 ~ 2023.06.06',
    thumbnail: 'example1.jpg',
    eventStatusType: getEventStatusType('Ended')
  },
  {
    id: '2',
    listItemType: getListItemType('Event'),
    title:
      '부안군 정보화 농업인 연구회를 개최합니다. 2023년 6월 ~ 부안군 정보화 농업인 연구회를 개최합니다. 2023년 6월 ~',
    caption: '2023.06.03 ~ 2023.06.06',
    thumbnail: 'example1.jpg',
    eventStatusType: getEventStatusType('Ended')
  },
  {
    id: '3',
    listItemType: getListItemType('Event'),
    title: '부안군 정보화 농업인 연구회를 개최합니다. 2023년 6월 ~',
    caption: '2023.06.03 ~ 2023.06.06',
    thumbnail: 'example1.jpg',
    eventStatusType: getEventStatusType('Ended')
  },
  {
    id: '3',
    listItemType: getListItemType('Event'),
    title: '부안군 정보화 농업인 연구회를 개최합니다. 2023년 6월 ~',
    caption: '2023.06.03 ~ 2023.06.06',
    thumbnail: 'example1.jpg',
    eventStatusType: getEventStatusType('Ended')
  }
]
</script>

<style scoped>
.event-tab-text {
  @apply text-k8 leading-[1.2] tracking-[-0.48px] font-medium text-grey_brown;
}

input[type='radio']:checked + label {
  @apply text-dark_24;
}
</style>
