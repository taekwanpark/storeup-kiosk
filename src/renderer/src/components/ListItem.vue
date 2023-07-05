<template>
  <div class="w-full p-13 flex border">
    <!-- thumbnail -->
    <!-- TODO -radius 이상 -->
    <template v-if="listType !== ListType.Search">
      <div class="relative mr-7 w-64 h-36 flex-none rounded-[20px] bg-gray-100 overflow-hidden">
        <div class="">
          <img :src="thumbnail" alt="example2" class="object-cover" />
        </div>
        <template v-if="listType === ListType.EndedEvent">
          <div
            class="absolute inset-0 w-full h-full bg-black/[0.58] flex items-center justify-center"
          >
            <div
              class="w-30 h-9 bg-black rounded-lg list-item-event-image-badge flex items-center justify-center pt-px"
            >
              이벤트 종료
            </div>
          </div>
        </template>
      </div>
    </template>

    <!-- text -->
    <div
      class="w-full flex flex-col space-y-3 border"
      :class="listType !== ListType.Search ? 'justify-start' : 'justify-center'"
    >
      <p class="list-item-title text-left line-clamp-2 border">
        <span ref="titleRef">{{ title }}</span>
      </p>
      <p
        class="font-normal border"
        :class="
          listType !== ListType.Search ? 'list-item-event-caption' : 'list-item-search-caption'
        "
      >
        <span>{{ caption }}</span>
        <template v-if="listType === ListType.Search">
          <span class="list-item-search-caption-accent ml-2.5">{{ captionAccent }}</span>
        </template>
      </p>
    </div>
    <!-- icon -->
    <div class="ml-15 w-28 aspect-square self-center border">
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
import '@typings/renderer.d.ts'
import { EtcIconType } from '@renderer/types/iconType'
import { ListType } from '@renderer/types/listType'
import SvgIcon from '@renderer/assets/icon/SvgIcon.vue'

// ----------------------------------------------------------------------------------------------------------------------------------

interface Props {
  listType: ListType
  title: string
  caption: string
  captionAccent?: string
  thumbnail?: string
  queryString?: string
}
const props = defineProps<Props>()

// ----------------------------------------------------------------------------------------------------------------------------------
/* TODO
|--------------------------------------------------
| 날짜입력
|--------------------------------------------------
|
| 타이틀은 최대 2줄까지 보여주며, 2줄을 넘어간 경우 …처리한다.
| 타이틀은 최대 2줄까지 보여주며, 2줄을 넘어간 경우 …처리한다.
| 관리자에서 종료로 처리한 경우, 종료된 날짜를 표기하거나 {yyyy.mm.dd}~{종료} 로 표기 한다
|
*/

// ----------------------------------------------------------------------------------------------------------------------------------
/* TODO 
|--------------------------------------------------
| query string 범위?
|--------------------------------------------------
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

// ----------------------------------------------------------------------------------------------------------------------------------

// const positions: DistanceArgsType = {
//   fromLat: 35.15287,
//   fromLon: 129.068248,
//   toLat: 35.148381,
//   toLon: 129.058958
// }
// console.log(getDistance(positions))
// navigator.geolocation.getCurrentPosition((pos) => {
//   console.log(pos)
// })
// console.log(dist) // 출력: 325.4961911409085
</script>

<style scoped></style>
