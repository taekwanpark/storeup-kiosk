<template>
  <div class="w-full min-w-[67.5rem] bg-[#f2f2f2] p-13 flex border">
    <!-- ------------------------------------------------------------------------
    image 
    ------------------------------------------------------------------------ -->
    <div class="w-100 h-68 flex-none border">
      <img
        src="../../assets/example1.jpg"
        alt="example1"
        class="object-cover object-center w-full h-full"
      />
    </div>
    <!-- ------------------------------------------------------------------------
    information 
    ------------------------------------------------------------------------ -->
    <div class="ml-5 w-full">
      <!-- badge -->
      <div
        :class="cardType === CardType.Search ? 'flex items-center space-x-3' : 'space-y-[0.75rem]'"
      >
        <div
          class="w-fit border box-border rounded-lg h-8.25"
          :class="[
            storeStatusStyle[storeStatus].bgColor,
            storeStatusStyle[storeStatus].borderColor
          ]"
        >
          <div :class="storeStatusStyle[storeStatus].textColor" class="flex px-2.5 py-1.5">
            <span class="pt-px border card-status-badge">
              {{ storeStatusStyle[storeStatus].text }}
            </span>
          </div>
        </div>
        <!-- store name -->
        <div class="">
          <span class="card-store-name">마실공영 주차장</span>
        </div>
      </div>
      <div class="mt-5">
        <div class="flex flex-col gap-y-4">
          <!-- operation hours -->
          <div class="flex space-x-2">
            <SvgIcon :icon="EtcIconType.Clock" />
            <p class="card-information">월~일 • 24시간</p>
          </div>

          <!-- contact -->
          <div class="flex space-x-2">
            <SvgIcon :icon="EtcIconType.Contact" />
            <p class="card-information">0507-1339-1343</p>
          </div>

          <!-- map -->
          <div class="flex space-x-2">
            <SvgIcon :icon="EtcIconType.Map" />
            <div class="flex flex-col">
              <p class="card-information">
                149, Beonyeong-ro, Buan-eup, Buan-gun, Jeollabuk-do, Republic of Korea
              </p>
              <a href="#" class="card-information-link" @click.prevent="false"> Map Go to Map </a>
            </div>
          </div>

          <!-- fee -->
          <div id="cssVariable" class="flex space-x-2">
            <SvgIcon :icon="EtcIconType.Cash" />
            <p class="card-information">최초 2시간 • 2시간초과시 기본요금 2,000</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// type
import { EtcIconType } from '@renderer/types/iconType'
import { CardProps, CardType } from '@renderer/common/listItem/listItemType'
import { StoreStatus, storeStatusStyle } from '@renderer/common/listItem/storeStatusType'
// vue
import SvgIcon from '@renderer/assets/icon/SvgIcon.vue'
import { onMounted } from 'vue'
// lib
import { heightAdjustHandler } from '@renderer/libs/useHeightAdjustHandler'

const storeStatus: StoreStatus = StoreStatus.Close

defineProps<CardProps>()

/*
|----------------------------------------------------------------------------------------------------
| heightAdjustHandler
|----------------------------------------------------------------------------------------------------
*/
onMounted(() => {
  heightAdjustHandler({
    selector: 'card-information',
    fontSize: 1.5,
    lineHeight: 2.25,
    height: 1.812
  })

  heightAdjustHandler({
    selector: 'card-store-name',
    fontSize: 2.25,
    lineHeight: 3.25,
    height: 2.688
  })
})
</script>

<style scoped></style>
