<template>
  <div class="relative">
    <div class="fixed top-[13.5rem] inset-x-0 min-w-[67.5rem]">
      <div class="relative flex h-32 bg-white_f5">
        <div class="w-full">
          <input
            id="ongoing"
            v-model="eventStatusTab"
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
            v-model="eventStatusTab"
            class="hidden"
            type="radio"
            name="event"
            :value="getEventStatusType('Ended')"
          />
          <label for="ended" class="event-tab-text w-full h-full flex justify-center items-center">
            종료된 이벤트
          </label>
        </div>
        <div
          class="w-1/2 absolute bottom-0 h-1 z-10 bg-[#ff4e00] transition-all duration-200"
          :class="eventStatusTab === getEventStatusType('Ongoing') ? 'left-0' : 'left-1/2'"
        />
      </div>
    </div>
    <div class="mt-32 mb-[12.75rem]">
      <template v-if="eventStatusTab === getEventStatusType('Ongoing')">
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
      <template v-if="eventStatusTab === getEventStatusType('Ended')">
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
    <!-- pagination -->
    <div class="fixed bottom-[12.75rem] inset-x-0 h-[8.25rem]">
      <Pagination />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, provide, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// type
import type { EventStatusTypeKeys } from '@renderer/components/list-item/types'
// lib
import { getEventStatusType, getListItemType } from '@renderer/components/list-item/types'
import { TabItemKey, TabItem } from '@renderer/components/list-item/types'
import { heightAdjustHandler } from '@renderer/libs/useHeightAdjustHandler'

// vue
import ListItem from '@renderer/components/list-item/partials/ListItem.vue'
import Pagination from '@renderer/components/Pagination.vue'
const router = useRouter()

/*
|----------------------------------------------------------------------------------------------------
| Select Tab
|----------------------------------------------------------------------------------------------------
*/
const eventStatusTab: Ref<EventStatusTypeKeys> = ref(getEventStatusType('Ongoing'))

/*
|----------------------------------------------------------------------------------------------------
| Tab Item
|----------------------------------------------------------------------------------------------------
*/

const tabItem: TabItem = (id) => {
  router.push({ name: 'event-detail', params: { id: id } })
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
onMounted(() => {
  heightAdjustHandler({
    selector: 'event-tab-text',
    fontSize: 2,
    lineHeight: 2,
    height: 2.375
  })
})
</script>

<style scoped>
.event-tab-text {
  @apply text-k8 leading-none tracking-[-0.48px] font-medium text-grey_brown;
}

input[type='radio']:checked + label {
  @apply text-dark_24;
}
</style>
