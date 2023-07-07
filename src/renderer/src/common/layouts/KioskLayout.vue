<template>
  <!-- layout -->
  <div :class="isMain ? 'bg-dark_24' : 'bg-white_ff'" class="w-full min-w-[67.5rem] min-h-screen">
    <!-- ---------------- header ---------------- -->
    <header>
      <div class="pt-[4.795rem] pb-[4.663rem]">
        <div :class="isMain ? '' : 'text-center'" class="relative">
          <h1 :class="isMain ? 'ml-[3.25rem]' : 'abb-bar-title'" class="">
            <template v-if="isMain"><SvgIcon :icon="EtcIconType.Logo" /></template>
            <template v-else> 검색 </template>
          </h1>
          <!-- language select form -->
          <LanguageButton :is-main="isMain" />
        </div>
      </div>
    </header>
    <!-- ---------------- contents ---------------- -->
    <main class="">
      <!-- content -->
      <slot name="contents" />
    </main>
    <!-- main navigation -->
    <template v-if="isMain">
      <nav class="mt-24">
        <ul
          class="m-auto w-fit grid grid-cols-3 gap-x-24 gap-y-[4.5rem] items-center justify-center"
        >
          <template v-for="(item, index) in mainMavigationLavel" :key="index">
            <li class="min-w-fit">
              <router-link to="/search">
                <div class="flex flex-col">
                  <div class="main-nav-item p-[2.125rem] bg-grey_charcoal_28 rounded-[3.75rem]">
                    <div class="">
                      <SvgIcon :icon="MainNavigationIconType[index]" />
                    </div>
                  </div>
                  <div class="mt-6 text-center">
                    <span class="main-nav-label">{{ item.lable }}</span>
                  </div>
                </div>
              </router-link>
            </li>
          </template>
        </ul>
      </nav>
    </template>
    <!-- bottom navigation -->
    <template v-else>
      <nav class="bg-grey_charcoal_28">
        <ul class="w-full grid grid-cols-7">
          <template v-for="(item, index) in bottomMavigationLavle" :key="index">
            <li class="h-[12.75rem]">
              <RouterLink :to="item.link">
                <div class="w-full px-[0.875rem] pt-[2.5662rem] flex flex-col items-center">
                  <div>
                    <SvgIcon :icon="NavigationIconType[index]" />
                  </div>
                  <div class="mt-3">
                    <span class="bottom-nav-label">{{ item.lable }}</span>
                  </div>
                </div>
              </RouterLink>
            </li>
          </template>
        </ul>
      </nav>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue'
// type
import { EtcIconType, MainNavigationIconType, NavigationIconType } from '@renderer/types/iconType'
// vue
import SvgIcon from '@renderer/assets/icon/SvgIcon.vue'
import LanguageButton from '@renderer/common/LanguageButton.vue'
// lib
import { heightAdjustHandler } from '@renderer/libs/useHeightAdjustHandler'

interface LayoutProps {
  isMain: boolean
}
withDefaults(defineProps<LayoutProps>(), {
  isMain: false
})
/*
|----------------------------------------------------------------------------------------------------
| Main Navigation
|----------------------------------------------------------------------------------------------------
*/
interface NavigationType {
  lable: string
  link: string
  isSelected?: boolean
}
type MainNavigatoinRecord = Record<MainNavigationIconType, NavigationType>
const mainMavigationLavel: MainNavigatoinRecord = {
  [MainNavigationIconType.Magnifying]: { lable: '검색', link: '/search' },
  [MainNavigationIconType.Shop]: { lable: '점포 안내', link: '/search' },
  [MainNavigationIconType.Food]: { lable: '맛집 안내', link: '/search' },
  [MainNavigationIconType.Facility]: { lable: '편의 시설', link: '/search' },
  [MainNavigationIconType.Talk]: { lable: '부안 톡톡', link: '/search' },
  [MainNavigationIconType.Event]: { lable: '이벤트', link: '/search' }
}
/*
|----------------------------------------------------------------------------------------------------
| Bottom Navigation
|----------------------------------------------------------------------------------------------------
*/
const currentTab: Ref<NavigationIconType> = ref(NavigationIconType.MagnifyingDark)
type BottomNavigatoinRecord = Record<NavigationIconType, NavigationType>
const bottomMavigationLavle: BottomNavigatoinRecord = {
  [NavigationIconType.HomeDark]: {
    lable: '홈',
    link: '/',
    isSelected: currentTab.value === NavigationIconType.HomeDark
  },
  [NavigationIconType.MagnifyingDark]: {
    lable: '검색',
    link: '/search',
    isSelected: currentTab.value === NavigationIconType.MagnifyingDark
  },
  [NavigationIconType.ShopDark]: {
    lable: '점포 안내',
    link: '/',
    isSelected: currentTab.value === NavigationIconType.ShopDark
  },
  [NavigationIconType.FoodDark]: {
    lable: '맛집 안내',
    link: '/',
    isSelected: currentTab.value === NavigationIconType.FoodDark
  },
  [NavigationIconType.FacilityDark]: {
    lable: '편의 시설',
    link: '/',
    isSelected: currentTab.value === NavigationIconType.FacilityDark
  },
  [NavigationIconType.TalkDark]: {
    lable: '부안 톡톡',
    link: '/',
    isSelected: currentTab.value === NavigationIconType.TalkDark
  },
  [NavigationIconType.EventDark]: {
    lable: '이벤트',
    link: '/',
    isSelected: currentTab.value === NavigationIconType.EventDark
  }
}
/*
|----------------------------------------------------------------------------------------------------
| heightAdjustHandler
|----------------------------------------------------------------------------------------------------
*/
onMounted(() => {
  heightAdjustHandler({
    selector: 'language-option',
    fontSize: 1.25,
    lineHeight: 1.5625,
    height: 1.5
  })
})
</script>

<style>
.main-nav-item {
  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.34);
}
</style>
