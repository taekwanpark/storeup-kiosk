<template>
  <div>
    <div class="fixed top-[13.5rem] inset-x-0 min-w-[67.5rem] bg-white_ff">
      <div class="mx-13 py-10 border-b border-[#c0c2c4]">
        <h3
          id="title-container"
          class="event-post-title text-k9 text-dark_24 font-bold leading-[1.44] tracking-[-0.72px] text-justify"
        >
          [진행중] 부안군 정보화 농업인 연구회를 개최합니다.
        </h3>
        <div class="mt-3">
          <p class="text-grey_charcoal_42 text-k7 leading-none tracking-[-0.42px]">
            2023. 06. 03 ~ 2023.06.06
          </p>
        </div>
      </div>
    </div>
    <!--  -->
    <div id="contents-container" class="mb-[calc(11.094rem+2.5rem)] mx-[7.75rem]">
      <div class="w-full">
        <img :src="'../src/assets/example1.jpg'" alt="example" class="object-cover object-center" />
      </div>
      <div class="mt-12">
        <p class="text-k6.5">
          수 기쁘며, 기관과 유소년에게서 찾아다녀도, 황금시대다. 모래뿐일 인생을 꽃이 사랑의 없는
          할지라도 때에, 아름다우냐? 영락과 두기 꽃 만천하의 청춘의 때까지 끝에 그들의 청춘이
          것이다. 광야에서 천하를 동산에는 되는 열락의 쓸쓸한 약동하다. 스며들어 용감하고 지혜는
          곳으로 수 그들에게 끓는 생명을 것이다. 앞이 그들의 구하지 산야에 낙원을 주는 웅대한 품었기
          하는 사막이다. 사라지지 인생을 하였으며, 힘있다. 때까지 거친 황금시대를 돋고, 것이다.
          기관과 만물은 수 가치를 그들의 황금시대다.
        </p>
      </div>
    </div>
    <!--  -->
    <div class="fixed bottom-[12.75rem] inset-x-0 bg-white_ff">
      <div class="h-[11.094rem] flex items-center justify-center border-t border-t-[#c0c2c4]">
        <div
          class="w-[15.75rem] h-[4.625rem] flex items-center justify-center border border-dark_29"
        >
          <span class="text-k5 leading-[1.2] text-dark_29 font-medium">목록으로</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { heightAdjustHandler } from '@renderer/libs/useHeightAdjustHandler'
import { onMounted } from 'vue'

let title: HTMLHeadingElement | null
let contents: HTMLHeadingElement | null
onMounted(() => {
  title = document.querySelector('#title-container')
  contents = document.querySelector('#contents-container')
  const elementHeight = parseInt(getComputedStyle(title!).height)
  const remHeight = elementHeight / 16 + 2.5 + 7.375
  contents!.style.marginTop = `${remHeight}rem`
})

/*
|----------------------------------------------------------------------------------------------------
| heightAdjustHandler
|----------------------------------------------------------------------------------------------------
*/
onMounted(() => {
  heightAdjustHandler({
    selector: 'event-post-title',
    fontSize: 2.25,
    height: 2.688
  })
})
</script>

<style scoped></style>
