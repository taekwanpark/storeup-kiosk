<template>
  <component :is="dynamicComponent" class="flex-none" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
// type
import { MapChipType } from '@renderer/common/chipButton/chipButtonType'
import {
  IconDirectoryType,
  EtcIconType,
  MapIconType,
  CountryIconType,
  NavigationIconType,
  MainNavigationIconType
} from '@renderer/types/iconType'

interface Props {
  icon:
    | EtcIconType
    | MapIconType
    | CountryIconType
    | NavigationIconType
    | MapChipType
    | MainNavigationIconType
}
const props = defineProps<Props>()
const dynamicComponent = computed(() => {
  let directory: IconDirectoryType
  if (EtcIconType[props.icon] !== undefined) {
    directory = IconDirectoryType.Etc
  } else if (NavigationIconType[props.icon] !== undefined) {
    directory = IconDirectoryType.Navigation
  } else if (MapIconType[props.icon] !== undefined) {
    directory = IconDirectoryType.Map
  } else if (CountryIconType[props.icon] !== undefined) {
    directory = IconDirectoryType.Country
  } else if (MapChipType[props.icon] !== undefined) {
    directory = IconDirectoryType.MapChip
  } else {
    directory = IconDirectoryType.MainNavigation
  }
  return defineAsyncComponent(() => import(`@renderer/assets/icon/${directory}/${props.icon}.vue`))
})
</script>

<style scoped></style>
