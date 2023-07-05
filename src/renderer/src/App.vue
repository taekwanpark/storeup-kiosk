<template>
  <!-- layout -->
  <div class="w-full h-full border border-red-500">
    <div>
      <!-- header -->
      <h1
        class="h-[187px] bg-background-dark flex items-end justify-between pl-[50px] pr-[42px] pb-[51px]"
      >
        <div class="w-[217.7px] h-[64.6px]">
          <!-- <SvgIcon :icon="EtcIconType.Logo" /> -->
        </div>
        <div>
          <button
            class="w-[146px] h-[54px] rounded-[27px] border border-border-light p-[7px] flex items-center"
          >
            <!-- <SvgIcon :icon="CountryIconType.Korea" /> -->
            <China />
            <span class="ml-[9px] text-[20px] text-white font-medium">한국어</span>
          </button>
        </div>
      </h1>
      <!-- contents -->
      <div>
        <!-- image -->
        <div class="border h-[824px] bg-gray-50">
          <div>image || video</div>
        </div>
        <!-- main navigation -->
        <div class="h-[909px] pt-[122px] flex justify-center">
          <div class="w-fit grid grid-cols-3 gap-x-20">
            <div class="w-[206px] flex flex-col items-center gap-y-[17px]">
              <div class="border w-full aspect-square bg-button-dark">
                <!-- <SvgIcon :icon="NavigationIconType.MagnifyingDark" /> -->
              </div>
              <p>검색</p>
            </div>
            <div class="w-[206px] flex flex-col items-center gap-y-[17px]">
              <div class="border w-full aspect-square">
                <!-- <SvgIcon :icon="NavigationIconType.ShopDark" /> -->
              </div>
              점포 안내
            </div>
            <div class="w-[206px] flex flex-col items-center gap-y-[17px]">
              <div class="border w-full aspect-square">
                <!-- <SvgIcon :icon="NavigationIconType.FoodDark" /> -->
              </div>
              맛집 안내
            </div>
            <div class="w-[206px] flex flex-col items-center gap-y-[17px]">
              <div class="border w-full aspect-square"></div>
              편의 시설
            </div>
            <div class="w-[206px] flex flex-col items-center gap-y-[17px]">
              <div class="border w-full aspect-square"></div>
              부안 톡톡
            </div>
            <div class="w-[206px] flex flex-col items-center gap-y-[17px]">
              <div class="border w-full aspect-square"></div>
              이벤트
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// // import SvgIcon from '@renderer/components/SvgIcon.vue';
// import { CountryIconType, EtcIconType, NavigationIconType } from '@renderer/assets/icon/iconType';
import China from '@renderer/assets/icon/country/China.vue'

import { ipcRenderer } from 'electron'
import { onMounted } from 'vue'

onMounted(() => {
  ipcRenderer.send('request-location-permission')
})

ipcRenderer.on('location-permission-granted', () => {
  // 위치 권한을 허용한 경우 처리할 로직을 구현합니다.
})

ipcRenderer.on('location-permission-denied', () => {
  // 위치 권한을 거부한 경우 처리할 로직을 구현합니다.
})
</script>

<style></style>
