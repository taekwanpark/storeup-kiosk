<template>
  <div class="w-full min-w-[67.5rem] bg-white p-13 flex">
    <!-- ------------------------------------------------------------------------
    thumbnail [only event]  
    ------------------------------------------------------------------------ -->
    <template v-if="listItemType === ListItemTypes.Event">
      <div class="relative mr-7 w-64 h-36 flex-none rounded-[20px] bg-gray-100 overflow-hidden">
        <!-- thumbnail -->
        <div class="w-full h-full">
          <img
            :src="'src/assets/' + thumbnail"
            alt="example1"
            class="object-cover object-center w-full h-full"
          />
        </div>
        <!-- event ended -->
        <template v-if="eventStatusType === EventStautsTypes.Ended">
          <div
            class="absolute inset-0 w-full h-full bg-black/[0.58] flex items-center justify-center"
          >
            <div
              class="w-30 h-9 bg-black rounded-lg list-item-display-event-image-badge flex items-center justify-center pt-px"
            >
              이벤트 종료
            </div>
          </div>
        </template>
      </div>
    </template>

    <!-- ------------------------------------------------------------------------
    body 
    ------------------------------------------------------------------------ -->
    <div
      class="w-full flex flex-col"
      :class="listItemType === ListItemTypes.Search ? 'justify-start' : 'justify-start'"
    >
      <!-- title -->
      <p ref="titleRef" class="list-item-display-title text-left line-clamp-2">
        {{ title }}
      </p>
      <!-- caption -->
      <div class="mt-3">
        <p
          :class="
            listItemType === ListItemTypes.Event
              ? 'list-item-display-search-caption'
              : 'list-item-display-event-caption'
          "
        >
          {{ caption }}
          <template v-if="listItemType === ListItemTypes.Search">
            <span class="list-item-display-search-caption-accent ml-2.5">{{ captionAccent }}</span>
          </template>
        </p>
      </div>
    </div>

    <!-- ------------------------------------------------------------------------
    icon button
    ------------------------------------------------------------------------ -->
    <div class="ml-15 w-28 -my-10 aspect-square self-center">
      <template v-if="listItemType === ListItemTypes.Event">
        <SvgIcon :icon="EtcIconType.ArrowRight" @click="tabItem(id)" />
      </template>
      <template v-else>
        <SvgIcon
          :icon="isOpen ? EtcIconType.ArrowUp : EtcIconType.ArrowDown"
          @click="tabItem(id)"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue'
// type
import '@typings/renderer.d.ts'
import { EtcIconType } from '@renderer/components/icon/types'
import {
  ListItemTypes,
  ListItemTypeKeys,
  EventStautsTypes,
  EventStatusTypeKeys,
  TabItemKey
} from '@renderer/components/list-item/types'
// vue
import SvgIcon from '@renderer/components/icon/SvgIcon.vue'
// lib
import { heightAdjustHandler } from '@renderer/libs/useHeightAdjustHandler'
import { injectStrict } from '@renderer/libs/useInjectStrict'

export interface ListItemProps {
  isOpen?: boolean
  id: string
  listItemType: ListItemTypeKeys
  eventStatusType?: EventStatusTypeKeys
  title: string
  caption: string
  captionAccent?: string
  thumbnail?: string
  queryString?: string
}
// props
const props = defineProps<ListItemProps>()

/* TODO
|----------------------------------------------------------------------------------------------------
| tab item
|----------------------------------------------------------------------------------------------------
*/
const tabItem = injectStrict(TabItemKey)

/* TODO
|----------------------------------------------------------------------------------------------------
| 날짜입력
|----------------------------------------------------------------------------------------------------
|
| 타이틀은 최대 2줄까지 보여주며, 2줄을 넘어간 경우 …처리한다.
| 타이틀은 최대 2줄까지 보여주며, 2줄을 넘어간 경우 …처리한다.
| 관리자에서 종료로 처리한 경우, 종료된 날짜를 표기하거나 {yyyy.mm.dd}~{종료} 로 표기 한다
|
*/

/* TODO 
|----------------------------------------------------------------------------------------------------
| query string 범위?
|----------------------------------------------------------------------------------------------------
|
| KAKAO
| '부안 마실' -> query string: '마실' / list: '부안'에 위치한 '마실'이 들어간 점포
| '금정구 영화관' -> query string: null / list: '금정구'에 위치한 '영화'가 들어간 점포 
|
*/
const titleRef: Ref<HTMLElement | null> = ref(null)
onMounted(() => {
  if (titleRef.value) {
    if (props.queryString) {
      const regex = new RegExp(props.queryString, 'gi')
      titleRef.value.innerHTML = titleRef.value.innerHTML?.replace(
        regex,
        (match) => `<span class="text-blue_bright underline">${match}</span>`
      )
    }
  }
})

/*  
|----------------------------------------------------------------------------------------------------
| heightAdjustHandler
|----------------------------------------------------------------------------------------------------
*/
onMounted(() => {
  heightAdjustHandler({
    selector: 'list-item-display-title',
    fontSize: 2.25,
    lineHeight: 3.25,
    height: 2.688
  })
  heightAdjustHandler({
    selector: 'list-item-display-search-caption',
    fontSize: 1.5,
    height: 1.812
  })
  heightAdjustHandler({
    selector: 'list-item-display-search-caption-accent',
    fontSize: 1.5,
    height: 1.812
  })
  heightAdjustHandler({
    selector: 'list-item-display-event-caption',
    fontSize: 1.375,
    height: 1.625
  })
})
</script>

<style scoped>
/* 
  |-------------------------------
  | list-item
  |------------------------------- 
  */
.list-item-display-title {
  @apply text-k9 leading-[1.5] tracking-[-0.68px] text-dark_24 font-bold;
}
/* search */
.list-item-display-search-caption {
  @apply text-k6 leading-[1.2] tracking-[-0.46px] text-grey_charcoal_42 font-normal;
}
.list-item-display-search-caption-accent {
  @apply text-k6 leading-[1.2] tracking-[-0.46px] text-blue_bright font-medium;
}
/* event */
.list-item-display-event-caption {
  @apply text-k5.5 leading-[1.2] tracking-[-0.33px] text-grey_charcoal_42 font-normal;
}
.list-item-display-event-image-badge {
  @apply text-k5 leading-[1.2] tracking-[-0.3px] text-white_ff font-normal;
}
</style>
