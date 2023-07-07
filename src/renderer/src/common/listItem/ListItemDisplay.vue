<template>
  <div class="w-full min-w-[67.5rem] bg-white p-13 flex">
    <!-- ------------------------------------------------------------------------
    thumbnail [only event]  
    ------------------------------------------------------------------------ -->
    <!-- TODO -radius 이상 -->
    <template v-if="listType !== ListType.Search">
      <div class="relative mr-7 w-64 h-36 flex-none rounded-[20px] bg-gray-100 overflow-hidden">
        <div class="w-full h-full">
          <img
            :src="'src/assets/' + thumbnail"
            alt="example1"
            class="object-cover object-center w-full h-full"
          />
        </div>
        <template v-if="listType === ListType.EndedEvent">
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
      :class="listType !== ListType.Search ? 'justify-start' : 'justify-center'"
    >
      <!-- title -->
      <p ref="titleRef" class="list-item-display-title text-left line-clamp-2">
        {{ title }}
      </p>
      <!-- caption -->
      <div class="mt-3">
        <p
          :class="
            listType !== ListType.Search
              ? 'list-item-display-event-caption'
              : 'list-item-display-search-caption'
          "
        >
          {{ caption }}
          <template v-if="listType === ListType.Search">
            <span class="list-item-display-search-caption-accent ml-2.5">{{ captionAccent }}</span>
          </template>
        </p>
      </div>
    </div>

    <!-- ------------------------------------------------------------------------
    icon button
    ------------------------------------------------------------------------ -->
    <div class="ml-15 w-28 -my-10 aspect-square self-center">
      <template v-if="listType !== ListType.Search">
        <SvgIcon :icon="EtcIconType.ArrowDown" />
      </template>
      <template v-else>
        <SvgIcon :icon="EtcIconType.ArrowRight" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue'
// type
import '@typings/renderer.d.ts'
import { EtcIconType } from '@renderer/types/iconType'
import { ListItemProps, ListType } from '@renderer/common/listItem/listItemType'
// vue
import SvgIcon from '@renderer/assets/icon/SvgIcon.vue'
// lib
import { heightAdjustHandler } from '@renderer/libs/useHeightAdjustHandler'

const props = defineProps<ListItemProps>()
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
  console.log('### [ListItem]: mounted ###')
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
    lineHeight: 2.25,
    height: 1.812
  })
  heightAdjustHandler({
    selector: 'list-item-display-search-caption-accent',
    fontSize: 1.5,
    lineHeight: 2.25,
    height: 1.812
  })
  heightAdjustHandler({
    selector: 'list-item-display-event-caption',
    fontSize: 1.375,
    lineHeight: 1.75,
    height: 1.625
  })
})
</script>

<style scoped></style>
