<template>
  <!-- layout -->
  <div
    :class="isMain ? 'bg-dark_24' : 'bg-white_ff'"
    class="relative w-full min-w-[67.5rem] h-full min-h-screen overflow-hidden z-[99]"
  >
    <!-- ---------------- header ---------------- -->
    <header
      class="fixed top-0 inset-x-0 z-10 h-[13.5rem] min-w-[67.5rem]"
      :class="isMain ? 'bg-dark_24' : 'bg-white_ff'"
    >
      <h1
        :class="isMain ? 'pt-[4.795rem]' : 'abb-bar-title flex items-center justify-center'"
        class="h-full mx-[3.25rem]"
      >
        <template v-if="isMain"><SvgIcon :icon="EtcIconType.Logo" /></template>
        <template v-else> {{ appBarTitle }} </template>
      </h1>
      <!-- language select form -->
      <div class="absolute right-[3.25rem] top-20">
        <LanguageButton :is-main="isMain" />
      </div>
    </header>
    <!-- ---------------- contents ---------------- -->
    <main class="relative mt-[13.5rem]" :class="isMain ? '' : 'mb-[12.75rem]'">
      <!-- content -->
      <slot name="contents" />
    </main>
    <!-- main navigation -->
    <template v-if="isMain">
      <nav class="">
        <ul
          class="mt-24 mx-auto w-fit grid grid-cols-3 gap-x-24 gap-y-[4.5rem] items-center justify-center"
        >
          <template v-for="item in mainMavigation" :key="item.routeName">
            <li class="min-w-fit" @click="routerPush(item)">
              <div class="flex flex-col">
                <div
                  class="main-nav-item-shadow p-[2.125rem] bg-grey_charcoal_28 rounded-[3.75rem]"
                >
                  <div class="">
                    <SvgIcon :icon="item.icon" />
                  </div>
                </div>
                <div class="mt-6 text-center">
                  <span class="main-nav-label">{{ item.label }}</span>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </nav>
    </template>
    <!-- bottom navigation -->
    <template v-else>
      <nav class="fixed inset-x-0 bottom-0 z-10 h-[12.75rem] min-w-[67.5rem] bg-grey_charcoal_28">
        <ul class="grid grid-cols-7 h-full">
          <!-- TODO code reformat && rearrange -->
          <template v-for="item in bottomMavigation" :key="item.routeName">
            <li
              class="pt-[2.5662rem] transition-colors duration-300"
              :class="
                route.path.split('/').slice(0, 2).join('/') === item.routePath
                  ? 'bg-[#4e5564] selected-tab-shadow'
                  : ''
              "
              @click="routerPush(item)"
            >
              <div class="flex flex-col items-center">
                <div class="w-20 h-20">
                  <Transition
                    enter-active-class="transition ease-in duration-150"
                    enter-from-class="transform opacity-50"
                    enter-to-class="transform opacity-100"
                    leave-active-class="transition ease-in duration-100"
                    leave-from-class="transform opacity-100"
                    leave-to-class="transform opacity-50"
                  >
                    <SvgIcon
                      :icon="item.icon"
                      :is-selected="route.path.split('/').slice(0, 2).join('/') === item.routePath"
                    />
                  </Transition>
                </div>
                <div class="mt-3">
                  <span
                    class="bottom-nav-label"
                    :class="
                      route.path.split('/').slice(0, 2).join('/') === item.routePath
                        ? 'bottom-nav-label-selected'
                        : ''
                    "
                  >
                    {{ item.label }}
                  </span>
                </div>
              </div>
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
import {
  EtcIconType,
  MainNavigationIconType,
  NavigationIconType
} from '@renderer/components/icon/types'
// vue
import SvgIcon from '@renderer/components/icon/SvgIcon.vue'
import LanguageButton from '@renderer/components/buttons/language-button/LanguageButton.vue'
// lib
import { heightAdjustHandler } from '@renderer/libs/useHeightAdjustHandler'
import { RouteRecordName, useRoute, useRouter } from 'vue-router'

interface LayoutProps {
  isMain?: boolean
}
withDefaults(defineProps<LayoutProps>(), {
  isMain: false
})

const route = useRoute()
const router = useRouter()
/*
|----------------------------------------------------------------------------------------------------
| Router Push
|----------------------------------------------------------------------------------------------------
*/
function routerPush(item: NavigationType): void {
  router.push({ path: item.routePath })
  setAppBarTitle(item.label)
}
/*
|----------------------------------------------------------------------------------------------------
| App Bar Title
|----------------------------------------------------------------------------------------------------
*/
const appBarTitle: Ref<string> = ref('')
type SetAppBarTitle = (label: string) => void
const setAppBarTitle: SetAppBarTitle = (label) => {
  appBarTitle.value = label
}
/*
|----------------------------------------------------------------------------------------------------
| Navigation Type
|----------------------------------------------------------------------------------------------------
 */
interface NavigationType {
  label: string
  routeName: RouteRecordName
  routePath: string
  icon: NavigationIconType | MainNavigationIconType
}
/*
|-------------------------------------------------------
| Main Navigation
|-------------------------------------------------------
*/
type MainNavigatoinRecord = Record<string, NavigationType>
const mainMavigation: MainNavigatoinRecord = {
  search: {
    label: '검색',
    routeName: 'search',
    routePath: '/search',
    icon: MainNavigationIconType.MainMagnifying
  },
  shop: {
    label: '점포 안내',
    routeName: 'store',
    routePath: '/store',
    icon: MainNavigationIconType.MainStore
  },
  food: {
    label: '맛집 안내',
    routeName: 'food',
    routePath: '/food',
    icon: MainNavigationIconType.MainFood
  },
  facility: {
    label: '편의 시설',
    routeName: 'facility',
    routePath: '/facility',
    icon: MainNavigationIconType.MainFacility
  },
  talk: {
    label: '부안 톡톡',
    routeName: 'talk',
    routePath: '/talk',
    icon: MainNavigationIconType.MainTalk
  },
  event: {
    label: '이벤트',
    routeName: 'event',
    routePath: '/event',
    icon: MainNavigationIconType.MainEvent
  }
}
/*
|-------------------------------------------------------
| Bottom Navigation
|-------------------------------------------------------
*/
type BottomNavigatoinRecord = Record<string, NavigationType>
const bottomMavigation: BottomNavigatoinRecord = {
  home: {
    label: '홈',
    routeName: 'home',
    routePath: '/',
    icon: NavigationIconType.Home
  },
  search: {
    label: '검색',
    routeName: 'search',
    routePath: '/search',
    icon: NavigationIconType.Magnifying
  },
  shop: {
    label: '점포 안내',
    routeName: 'store',
    routePath: '/store',
    icon: NavigationIconType.Store
  },
  food: {
    label: '맛집 안내',
    routeName: 'food',
    routePath: '/food',
    icon: NavigationIconType.Food
  },
  facility: {
    label: '편의 시설',
    routeName: 'facility',
    routePath: '/facility',
    icon: NavigationIconType.Facility
  },
  talk: {
    label: '부안 톡톡',
    routeName: 'talk',
    routePath: '/talk',
    icon: NavigationIconType.Talk
  },
  event: {
    label: '이벤트',
    routeName: '/event',
    routePath: '/event',
    icon: NavigationIconType.Event
  }
}

/*
|----------------------------------------------------------------------------------------------------
| heightAdjustHandler
|----------------------------------------------------------------------------------------------------
*/
onMounted(() => {
  setAppBarTitle(router.currentRoute.value.name as string)
  heightAdjustHandler({
    selector: 'language-option',
    fontSize: 1.25,
    height: 1.5
  })
})
</script>

<style>
/* 
|------------------------------------------------------------------------
| app bar title
|------------------------------------------------------------------------
*/
.abb-bar-title {
  @apply text-k10 leading-none tracking-[-0.6px] font-bold text-dark_24;
}
/* 
|------------------------------------------------------------------------
| navgation
|------------------------------------------------------------------------
*/
.main-nav-label {
  @apply text-k8 leading-[1.2] tracking-[-0.48px] font-normal text-white_ff;
}
.bottom-nav-label {
  @apply text-k5.5 leading-[1.2] tracking-[-0.33px] font-medium text-[#c6ccd8];
}
.bottom-nav-label-selected {
  @apply text-white_ff;
}

.main-nav-item-shadow {
  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.34);
}
.selected-tab-shadow {
  box-shadow: inset 0 3px 15px 0 rgba(16, 30, 60, 0.58);
}
</style>
