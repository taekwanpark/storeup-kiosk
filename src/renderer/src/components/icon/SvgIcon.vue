<template>
  <component :is="dynamicComponent" class="flex-none" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
// type
import {
  IconDirectoryType,
  EtcIconType,
  MapIconType,
  CountryIconType,
  MapChipType,
  NavigationIconType,
  MainNavigationIconType,
  PaginationIconType
} from '@renderer/components/icon/types'

interface Props {
  icon:
    | EtcIconType
    | MapIconType
    | CountryIconType
    | NavigationIconType
    | MapChipType
    | MainNavigationIconType
    | PaginationIconType
  isSelected?: boolean
}
const props = defineProps<Props>()
const dynamicComponent = computed(() => {
  let directory: IconDirectoryType
  let icon = props.icon as string
  if (EtcIconType[props.icon] !== undefined) {
    directory = IconDirectoryType.Etc
  } else if (NavigationIconType[props.icon] !== undefined) {
    if (props.isSelected) {
      if (props.icon === 'Home') {
        icon += 'Dark'
      } else {
        icon += 'Light'
      }
    } else {
      icon += 'Dark'
    }
    directory = IconDirectoryType.Navigation
  } else if (MapIconType[props.icon] !== undefined) {
    directory = IconDirectoryType.Map
  } else if (CountryIconType[props.icon] !== undefined) {
    directory = IconDirectoryType.Country
  } else if (MapChipType[props.icon] !== undefined) {
    if (props.isSelected) {
      icon += 'White'
    } else {
      icon += 'Color'
    }
    directory = IconDirectoryType.MapChip
  } else if (MainNavigationIconType[props.icon] !== undefined) {
    directory = IconDirectoryType.MainNavigation
  } else if (PaginationIconType[props.icon] !== undefined) {
    directory = IconDirectoryType.Pagination
  }

  return defineAsyncComponent(() => import(`../../assets/icon/${directory}/${icon}.vue`))
})
</script>

<style scoped></style>
