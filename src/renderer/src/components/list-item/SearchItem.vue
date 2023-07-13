<template>
  <ListItem
    :id="id"
    :is-open="isOpen"
    :list-item-type="listItemType"
    :title="title"
    :caption="caption"
    :caption-accent="captionAccent"
    :thumbnail="thumbnail"
    :query-string="queryString"
  />
  <template v-if="!isOpen">
    <hr class="mx-13 border-[#d0d1d3]" />
  </template>
  <transition
    enter-active-class="transition ease-in duration-300"
    enter-from-class="transform opacity-0 scale-100"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-100"
  >
    <SearchCardItem
      v-if="isOpen"
      :store-name="title"
      :thumbnail="thumbnail"
      :store-status="storeStatus"
      :address="address"
      :fee="fee"
      :contact="contact"
      :opening-hours="openingHours"
    />
  </transition>
</template>

<script setup lang="ts">
// vue
import ListItem, { ListItemProps } from '@renderer/components/list-item/partials/ListItem.vue'
import SearchCardItem, {
  SearchCardItemProps
} from '@renderer/components/list-item/partials/SearchCardItem.vue'

export interface SearchItemProps extends ListItemProps, SearchCardItemProps {}
defineProps<SearchItemProps>()
</script>

<style scoped></style>
