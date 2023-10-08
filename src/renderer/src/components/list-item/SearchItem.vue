<template>
  <ListItem
      :id="id"
      :caption="caption"
      :caption-accent="captionAccent"
      :is-open="isOpen"
      :list-item-type="listItemType"
      :query-string="queryString"
      :thumbnail="thumbnail"
      :title="title"
  />
  <template v-if="!isOpen">
    <hr class="mx-13 border-[#d0d1d3]"/>
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
        :address="address"
        :contact="contact"
        :fee="fee"
        :opening-hours="openingHours"
        :store-name="title"
        :store-status="storeStatus"
        :thumbnail="thumbnail"
    />
  </transition>
</template>

<script lang="ts" setup>
// vue
import ListItem, {ListItemProps} from '@renderer/components/list-item/ListItem.vue'
import SearchCardItem, {
  SearchCardItemProps
} from '@renderer/components/list-item/partials/SearchCardItem.vue'

export interface SearchItemProps extends ListItemProps, SearchCardItemProps {
}

defineProps<SearchItemProps>()

</script>

<style scoped></style>
