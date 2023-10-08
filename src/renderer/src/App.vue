<template>
  <kiosk-layout :is-main="currentRoute.name === 'home'">
    <template #contents>
      <router-view v-slot="{ Component, route }">
        <!-- <transition name="slide"> -->
        <component :is="Component" :key="route.path"/>
        <!-- </transition> -->
      </router-view>
    </template>
  </kiosk-layout>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router'
// vue
import KioskLayout from '@renderer/components/layouts/KioskLayout.vue'

const currentRoute = useRoute()
const router = useRouter()

console.log(currentRoute.path)

// const transitionName = computed(() => currentRoute.meta.transition as string)

router.afterEach((to, from) => {

  console.log(to)

  const toDepth = to.path.split('/').length

  const fromDepth = from.path.split('/').length

  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'

})

</script>

<style>
body {
  overflow-x: hidden;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>
