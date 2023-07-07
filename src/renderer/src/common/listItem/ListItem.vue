<template>
  <ListItemDisplay
    :list-type="listType"
    :title="title"
    :query-string="queryString"
    :caption="caption"
    :caption-accent="captionAccent"
    :thumbnail="thumbnail"
  />
  <template v-if="listType === ListType.Search">
    <ListItemCard :card-type="CardType.Search" />
  </template>
</template>

<script setup lang="ts">
// type
import { CardType, ListItemProps, ListType } from '@renderer/common/listItem/listItemType'
// vue
import ListItemDisplay from '@renderer/common/listItem/ListItemDisplay.vue'
import ListItemCard from '@renderer/common/listItem/ListItemCard.vue'

defineProps<ListItemProps>()
</script>

<style scoped></style>
