<template>
  <div class="mx-13 flex items-center gap-x-5">
    <div class="relative w-full">
      <div id="input-container" class="relative w-full" @click="focusInput(true)">
        <div
          id="input-form"
          class="w-full h-22 pl-10 pr-22 flex items-center rounded-full bg-white_ff border border-dark_29 cursor-text"
        >
          <input
            v-model="inputValue"
            type="text"
            :class="
              !isFocused && inputValue === ''
                ? ' text-grey_bluey_a7'
                : ' text-grey_charcoal_28 cursor-blink'
            "
            placeholder="내용을 검색해주세요."
            class="absolute left-[2.5rem] right-[5.5rem] whitespace-nowrap leading-none text-k8 tracking-[-0.48px] focus:outline-none"
          />
        </div>
      </div>

      <div
        class="absolute inset-y-0 right-6 my-auto w-fit h-fit rounded-full cursor-pointer"
        @click="() => clearInput(virtualKeyboardRef)"
      >
        <SvgIcon :icon="EtcIconType.InputDispose" />
      </div>
    </div>
    <div class="flex-none">
      <button
        id="search-submit-button"
        class="w-52 h-22 rounded-full text-white_ff font-medium text-k8 bg-dark_29"
      >
        검색
      </button>
    </div>
  </div>
  <VirtualKeyboard
    v-if="isFocused"
    ref="virtualKeyboardRef"
    input-container="input-container"
    @focus:input="focusInput"
    @update:input="updateInput"
  />
</template>

<script setup lang="ts">
// type
import { EtcIconType } from '@renderer/components/icon/types'
import type { KeyboardRefType } from '@renderer/libs/useKeyboard'
// vue
import SvgIcon from '@renderer/components/icon/SvgIcon.vue'
import VirtualKeyboard from '@renderer/components/virtual-keyboard/VirtualKeyboard.vue'
// lib
import { useKeyboard } from '@renderer/libs/useKeyboard'
import { Ref, ref } from 'vue'

/*
|------------------------------------------------------------------------------------------
| Keyboard Ref
|------------------------------------------------------------------------------------------
*/
const virtualKeyboardRef: Ref<KeyboardRefType> = ref(undefined)

/*
|------------------------------------------------------------------------------------------
| useKeyboard ts
|------------------------------------------------------------------------------------------
*/
const { focusInput, updateInput, clearInput, inputValue, isFocused } = useKeyboard()
</script>

<style scoped>
#input-form {
  box-shadow: 0 3px 30px 0 rgba(66, 70, 77, 0.18);
}
#search-submit-button {
  box-shadow: 0 3px 30px 0 rgba(66, 70, 77, 0.25);
}

.simple-keyboard {
  max-width: 850px;
}
</style>
