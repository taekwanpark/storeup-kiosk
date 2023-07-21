<template>
  <div class="relative">
    <div id="kakao-map" class="w-full" />
  </div>
</template>

<script setup lang="ts">
import { useMap } from '@renderer/libs/useMap'
import { nextTick, onMounted } from 'vue'

const { loadKakao } = useMap()
/*
|----------------------------------------------------------------------------------------------------
| kakao map
|----------------------------------------------------------------------------------------------------
*/
onMounted(async () => {
  setKakaoHeight()
  await nextTick(() => {
    loadKakao()
  })
})

/*
|----------------------------------------------------------------------------------------------------
| kakao map Container Height
|----------------------------------------------------------------------------------------------------
*/
function setKakaoHeight(): void {
  const marginTop = 13.5
  const marginBottom = 12.75
  const currentScreenHeight = window.innerHeight / 16
  const mapHeight = currentScreenHeight - marginBottom - marginTop
  const mapContainer: HTMLElement | null = document.getElementById('kakao-map')
  if (mapContainer !== null) {
    mapContainer.style.height = `${mapHeight}rem`
  }
}
</script>

<style scoped></style>
