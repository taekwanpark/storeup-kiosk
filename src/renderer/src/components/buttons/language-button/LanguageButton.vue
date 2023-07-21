<template>
  <div id="language-button" class="flex items-center">
    <div class="relative">
      <button
        class="rounded-[1.6875rem] border border-grey_bluey_9b backdrop-blur-lg"
        @click="onClickButton"
      >
        <div class="pr-4 pl-2 py-2 flex items-center">
          <!-- icon -->
          <div class="mr-2">
            <SvgIcon :icon="CountryIconType.Korea" />
          </div>
          <!-- text -->
          <span
            :class="isMain ? 'text-white_ff' : 'text-dark_29'"
            class="language-option w-[3.188rem] text-k5 tracking-[-0.38px] font-normal"
          >
            한국어
          </span>
          <!-- chevron -->
          <span class="ml-4 text-white">^</span>
        </div>
      </button>
      <!-- select options -->
      <template v-if="isButtonOpen">
        <div
          class="absolute top-[3.938rem] w-full bg-white_ff border border-[#7e7e7e] rounded-[1.3125rem]"
        >
          <ul class="my-[1.25rem]">
            <li class="w-full h-16 pr-4 pl-2 py-2 flex items-center">
              <div class="mr-2">
                <SvgIcon :icon="CountryIconType.Korea" />
              </div>
              <span
                class="language-option w-[3.188rem] text-k5 tracking-[-0.38px] text-dark_24 font-normal"
              >
                한국어
              </span>
            </li>
            <li class="w-full h-16 pr-4 pl-2 py-2 flex items-center">
              <div class="mr-2">
                <SvgIcon :icon="CountryIconType.UnitedState" />
              </div>
              <span
                class="language-option w-[3.188rem] text-k5 tracking-[-0.38px] text-dark_24 font-normal"
              >
                한국어
              </span>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue'
// type
import { CountryIconType } from '@renderer/components/icon/types'
// vue
import SvgIcon from '@renderer/components/icon/SvgIcon.vue'

defineProps({
  isMain: Boolean
})
/*
|----------------------------------------------------------------------------------------------------
| language button
|----------------------------------------------------------------------------------------------------
*/
const isButtonOpen: Ref<boolean> = ref(false)
function onClickButton(): void {
  isButtonOpen.value = !isButtonOpen.value
}

/*
|----------------------------------------------------------------------------------------------------
| dismiss language button
|----------------------------------------------------------------------------------------------------
*/
onMounted(() => {
  document.addEventListener('click', function (e: Event) {
    const buttonElement = document.getElementById('language-button')
    if (e.target !== null && buttonElement !== null) {
      const childNode = e.target as Node
      const isChildElement: boolean = buttonElement.contains(childNode)
      if (!isChildElement) {
        isButtonOpen.value = false
      }
    }
  })
})
</script>

<style scoped></style>
