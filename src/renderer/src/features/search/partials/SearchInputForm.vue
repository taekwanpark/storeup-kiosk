<template>
  <div class="mx-13 flex items-center gap-x-5">
    <div class="relative w-full">
      <input
        id="search-input"
        data-kioskboard-type="keyboard"
        data-kioskboard-placement="bottom"
        data-kioskboard-specialcharacters="false"
        type="text"
        placeholder="내용을 검색해주세요."
        class="v-keyboard w-full h-22 pl-10 pr-22 rounded-full text-k8 text-grey_charcoal_28 placeholder:text-grey_bluey tracking-[-0.48px] bg-white_ff border border-dark_29 focus:outline-none"
      />
      <div class="absolute inset-y-0 right-6 my-auto w-fit h-fit">
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
  <div class="simple-keyboard"></div>
</template>

<script setup lang="ts">
// type
import { EtcIconType } from '@renderer/components/icon/types'
// vue
import SvgIcon from '@renderer/components/icon/SvgIcon.vue'
</script>

<style scoped>
#search-input {
  box-shadow: 0 3px 30px 0 rgba(66, 70, 77, 0.18);
}
#search-submit-button {
  box-shadow: 0 3px 30px 0 rgba(66, 70, 77, 0.25);
}

.simple-keyboard {
  max-width: 850px;
}
</style>
