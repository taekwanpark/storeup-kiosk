<template>
  <div class="relative">
    <!-- chip buttons -->
    <div class="fixed mt-8 mx-13">
      <ul class="flex gap-x-6">
        <template v-for="(item, index) in shopChipIcons" :key="index">
          <li @click="selectChip(index)">
            <ChipButton
              :text="item.text"
              :chip-type="item.chipType"
              :color="item.color"
              :is-selected="currentChip === index"
            />
          </li>
        </template>
      </ul>
    </div>
    <div class="relative">
      <!-- map -->
      <div id="kakao-map" class="w-full"></div>
    </div>
    <!-- bottom container -->
    <div class="fixed inset-x-0 bottom-[12.75rem] z-50">
      <div class="relative">
        <div class="absolute bottom-6 left-2 flex flex-col">
          <button @click="zoomIn">
            <SvgIcon :icon="MapIconType.PlusShadow" />
          </button>
          <button @click="zoomOut">
            <SvgIcon :icon="MapIconType.MinusShadow" />
          </button>
        </div>
        <div class="absolute bottom-6 right-2">
          <button @click="moveToDefault">
            <SvgIcon :icon="MapIconType.CurrentPointerShadow" />
          </button>
        </div>
      </div>

      <!-- card list -->
      <div
        id="card-container-shadow"
        class="w-full min-w-[67.5rem] bg-white_ff rounded-t-[3.125rem]"
      >
        <ul class="mx-8 flex flex-col gap-y-[2.25rem] max-h-[40rem] overflow-auto">
          <template v-for="(store, index) in stores" :key="index">
            <li
              :class="[index === stores.length - 1 ? 'mb-13' : '', index === 0 ? 'mt-13' : '']"
              class="px-5"
            >
              <MapCardItem
                :store-name="store.storeName"
                :store-status="store.storeStatus"
                :category="store.category"
                :thumbnail="store.thumbnail"
                :address="store.address"
                :distance="store.distance"
                :contact="store.contact"
                :opening-hours="store.openingHours"
              />
            </li>
            <hr v-if="index !== stores.length - 1" class="border-[#e5e5e5]" />
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Ref, nextTick, onMounted, ref } from 'vue'
// type
import { MapChipType, MapIconType } from '@renderer/components/icon/types'
import type { MapChipProps } from '@renderer/components/buttons/chip-button/ChipButton.vue'
import { storeStatusType } from '@renderer/components/list-item/types'
// vue
import ChipButton from '@renderer/components/buttons/chip-button/ChipButton.vue'
import MapCardItem from '@renderer/components/list-item/partials/MapCardItem.vue'
// vue
import SvgIcon from '@renderer/components/icon/SvgIcon.vue'

const stores = [
  {
    storeName: '철이네 생선 가게',
    storeStatus: storeStatusType('Close'),
    category: '과일가게',
    thumbnail: 'example1.jpg',
    address: '전북 부안군 부안읍 번영로 149',
    distance: 580,
    contact: '0507-1339-1343',
    openingHours: '월~토 09:00-18:00 매주 일요일 정기휴무'
  }
  // {
  //   storeName: '철이네 생선 가게',
  //   storeStatus: storeStatusType('Close'),
  //   category: '과일가게',
  //   thumbnail: 'example1.jpg',
  //   address: '전북 부안군 부안읍 번영로 149',
  //   distance: 5800,
  //   contact: '0507-1339-1343',
  //   openingHours: '월~토 09:00-18:00 매주 일요일 정기휴무'
  // },
  // {
  //   storeName: '철이네 생선 가게',
  //   storeStatus: storeStatusType('Close'),
  //   category: '과일가게',
  //   thumbnail: 'example1.jpg',
  //   address: '전북 부안군 부안읍 번영로 149',
  //   distance: 5800,
  //   contact: '0507-1339-1343',
  //   openingHours: '월~토 09:00-18:00 매주 일요일 정기휴무'
  // }
]
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
let map
let defaultPosition
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
    defaultPosition = new kakao.maps.LatLng(35.147707, 129.058673)

    const options = {
      center: defaultPosition,
      level: 1
    }

    map = new kakao.maps.Map(container, options)

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
  map.panTo(defaultPosition)
}

/*
|----------------------------------------------------------------------------------------------------
| kakao map Zoom In
|----------------------------------------------------------------------------------------------------
*/
function zoomIn(): void {
  // 현재 지도의 레벨을 얻어옵니다
  const level = map.getLevel()

  // 지도를 1레벨 내립니다 (지도가 확대됩니다)
  map.setLevel(level - 1, { animate: true })

  // 지도 레벨을 표시합니다
  displayLevel()
}

/*
|----------------------------------------------------------------------------------------------------
| kakao map Zoom Out
|----------------------------------------------------------------------------------------------------
*/
function zoomOut(): void {
  // 현재 지도의 레벨을 얻어옵니다
  const level = map.getLevel()

  // 지도를 1레벨 올립니다 (지도가 축소됩니다)
  map.setLevel(level + 1, { animate: true })

  // 지도 레벨을 표시합니다
  displayLevel()
}

/*
|----------------------------------------------------------------------------------------------------
| kakao map display Level
|----------------------------------------------------------------------------------------------------
*/
function displayLevel(): void {
  const levelEl = document.getElementById('maplevel')
  if (levelEl !== null) levelEl.innerHTML = '현재 지도 레벨은 ' + map.getLevel() + ' 레벨 입니다.'
}
/*
|----------------------------------------------------------------------------------------------------
| get current position
|----------------------------------------------------------------------------------------------------
*/

// function getCurrentPosition(): void {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       currentPosition.value.fromLat = position.coords.latitude
//       currentPosition.value.fromLon = position.coords.longitude
//       const moveLatLon = new kakao.maps.LatLng(35.147707, 129.058673)

//       const marker = new kakao.maps.Marker({
//         position: moveLatLon
//       })
//       marker.setMap(map)
//       map.setCenter(moveLatLon)

//       console.log(
//         `Latitude: ${currentPosition.value.fromLat}, Longitude: ${currentPosition.value.fromLon}`
//       )
//     },
//     (error) => {
//       console.error(`Error retrieving geolocation: ${error.message}`)
//     }
//   )
// }
/*
|----------------------------------------------------------------------------------------------------
| Select Chip
|----------------------------------------------------------------------------------------------------
*/
const currentChip: Ref<string> = ref('whole')
function selectChip(index: string): void {
  currentChip.value = index
}
/*
|----------------------------------------------------------------------------------------------------
| Shop Chip Icon List
|----------------------------------------------------------------------------------------------------
*/
type ShopChipIconRecord = Record<string, MapChipProps>
const shopChipIcons: ShopChipIconRecord = {
  whole: {
    text: '전체',
    chipType: MapChipType.Whole,
    color: 'bg-blue_bright'
  },
  youth: {
    text: '젊음의 거리',
    chipType: MapChipType.YouthStreet,
    color: 'bg-[#00853d]'
  },
  red: {
    text: '레드 거리',
    chipType: MapChipType.RedStreet,
    color: 'bg-[#d30000]'
  },
  sentimental: {
    text: '감성거리',
    chipType: MapChipType.SentimentalStreet,
    color: 'bg-[#ff7600]'
  },
  market: {
    text: '부안 상설 시장',
    chipType: MapChipType.BuanMarket,
    color: 'bg-[#006eac]'
  }
}
</script>

<style scoped>
#card-container-shadow {
  box-shadow: 0 -5px 30px 0 rgba(97, 112, 126, 0.31);
}
</style>
