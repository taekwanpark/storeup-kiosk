<template>
  <div class="relative">
    <div class="fixed top-[13.5rem] inset-x-0 min-w-[67.5rem] pt-8.5 bg-white_ff">
      <!-- input conatiner -->
      <SearchInputBox ref="searchInputBoxRef"/>
      <!-- recommandation container -->
      <div v-if="searchInputBoxRef?.isFocused" class="mt-12 mb-4 mx-13">
        <span class="text-k7.5 font-semibold tracking-[-0.53px] text-dark_24">검색 결과 (3건)</span>
      </div>
      <div v-else class="my-12 mx-13">
        <span class="text-k7 font-semibold tracking-[-0.53px] text-dark_24">추천 검색어</span>
        <div class="mt-6 flex gap-6 flex-wrap">
          <template v-for="label in ['주차장', '전기차 충전소', '화장실']" :key="label">
            <RecommendedItems :label="label"/>
          </template>
        </div>
      </div>
    </div>
    <!-- list -->
    <div v-if="searchInputBoxRef?.isFocused" class="pt-[14.25rem]">
      <ul>
        <template v-for="item in list" :key="item.queryString">
          <li>
            <SearchItem :id="item.id"
                        :address="item.caption"
                        :caption="item.caption"
                        :caption-accent="item.captionAccent"
                        :contact="item.contact"
                        :fee="item.fee"
                        :is-open="item.id === currentItemIndex"
                        :list-item-type="getListItemType('Search')"
                        :opening-hours="item.openingHours"
                        :query-string="item.queryString"
                        :store-name="item.title"
                        :store-status="item.storeStatus"
                        :thumbnail="item.thumbnail!"
                        :title="item.title"
            />
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Ref, provide, ref, InjectionKey} from 'vue'
// type
import {
  getListItemType,
  getStoreStatusType,
  TabItemKey
} from '@renderer/components/list-item/types'
// vue
import SearchItem from '@renderer/components/list-item/SearchItem.vue'
import SearchInputBox from '@renderer/features/search/partials/SearchInputBox.vue'
import RecommendedItems from '@renderer/features/search/partials/RecommendedItems.vue'


const searchInputBoxRef: Ref<InstanceType<typeof SearchInputBox> | null> = ref(null)

// ----------------------------------------------------------------------------------------------------------------

const currentItemIndex: Ref<string | null> = ref(null)

function tabItem(id: string) {

  if (id === currentItemIndex.value) {

    currentItemIndex.value = null

  } else {

    currentItemIndex.value = id

  }

}

provide(TabItemKey, tabItem)


const key: InjectionKey<string> = Symbol('test')

provide(TabItemKey, tabItem)

// ----------------------------------------------------------------------------------------------------------------

const list = [
  {
    id: '0',
    title: '마실공영 주차장',
    queryString: '공영',
    caption: '전북 부안군 부안읍 번영로 149',
    captionAccent: '580m',
    thumbnail: 'example1.jpg',
    storeStatus: getStoreStatusType('Open'),
    openingHours: '월~일 • 24시간',
    contact: '0507-1339-1343',
    fee: '최초 1시간 • 2시간 초과시 기본요금 1,500'
  },
  {
    id: '1',
    title: '부안 주차장',
    queryString: '공영',
    caption: '149, Beonyeong-ro, Buan-eup, Buan-gun, Jeollabuk-do, Republic of Korea',
    captionAccent: '580m',
    thumbnail: 'example2.jpg',
    storeStatus: getStoreStatusType('Close'),
    openingHours: '월~일 • 24시간',
    contact: '0507-1339-1343',
    fee: '최초 2시간 • 2시간 초과시 기본요금 2,000'
  },
  {
    id: '2',
    title: '아뮤즈 주차장',
    queryString: '공영',
    caption: '전북 부안군 부안읍 번영로 149',
    captionAccent: '580m',
    thumbnail: 'example2.jpg',
    storeStatus: getStoreStatusType('Holiday'),
    openingHours: '월~일 • 24시간',
    contact: '0507-1339-1343',
    fee: '최초 20시간 • 2시간 초과시 기본요금 20,000'
  }
]
</script>

<style scoped></style>
