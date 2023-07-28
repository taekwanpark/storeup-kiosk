<template>
  <div class="relative">
    <div id="kakao-map" class="w-full" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted } from 'vue'

interface KioskMapProps {
  initialPosition: { lat: number; lng: number }
}
const props = defineProps<KioskMapProps>()

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
/*
|----------------------------------------------------------------------------------------------------
| kakao map Script Load
|----------------------------------------------------------------------------------------------------
*/
let map: kakao.maps.Map | null
let defaultPosition: kakao.maps.LatLng | null
function loadKakao(): void {
  if (!window.kakao || !window.kakao.maps) {
    const kakaoMap = document.createElement('script')
    kakaoMap.setAttribute(
      'src',
      'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f55b67d7a842ed5762627813914ffae4'
    )
    document.head.appendChild(kakaoMap)

    kakaoMap.addEventListener('load', () => {
      console.log('### KAKAO ### - Loaded')
      kakao.maps.load(mapInit)
    })
  } else {
    console.log('### KAKAO ### - Already Loaded')
    mapInit()
  }
}

/*
|----------------------------------------------------------------------------------------------------
| kakao map init
|----------------------------------------------------------------------------------------------------
*/
function mapInit(): void {
  const container: HTMLElement | null = document.getElementById('kakao-map')

  if (container !== null) {
    defaultPosition = new kakao.maps.LatLng(props.initialPosition.lat, props.initialPosition.lng)

    const options = {
      center: defaultPosition,
      level: 1
    }

    map = new kakao.maps.Map(container, options)
    console.log(map)
    new kakao.maps.Marker({
      title: '현재 위치',
      map: map,
      position: defaultPosition
    })
  }
}

/*
|----------------------------------------------------------------------------------------------------
| kakao map move to default
|----------------------------------------------------------------------------------------------------
*/
function moveToDefault(): void {
  if (map !== null && defaultPosition !== null) {
    map.panTo(defaultPosition)
  }
}

/*
|----------------------------------------------------------------------------------------------------
| kakao map Zoom In
|----------------------------------------------------------------------------------------------------
*/
function zoomIn(): void {
  if (map !== null) {
    // 현재 지도의 레벨을 얻어옵니다
    const level = map.getLevel()

    // 지도를 1레벨 내립니다 (지도가 확대됩니다)
    map.setLevel(level - 1, { animate: true })
  }
}

/*
|----------------------------------------------------------------------------------------------------
| kakao map Zoom Out
|----------------------------------------------------------------------------------------------------
*/
function zoomOut(): void {
  if (map !== null) {
    // 현재 지도의 레벨을 얻어옵니다
    const level = map.getLevel()

    // 지도를 1레벨 올립니다 (지도가 축소됩니다)
    map.setLevel(level + 1, { animate: true })
  }
}

defineExpose({ moveToDefault, zoomIn, zoomOut })
</script>

<style scoped></style>
