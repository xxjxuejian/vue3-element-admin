<script setup lang="ts">
import path from 'path-browserify'
import SidebarMenuItem from './SidebarMenuItem.vue'
import { useRoute } from 'vue-router'
import { isExternal } from '@/utils'
import { useAppStore } from '@/stores'
import variables from '@/styles/variables.module.scss'

const currentRoute = useRoute()
const appStore = useAppStore()

console.log('currentRoute', currentRoute)
const props = defineProps({
  menuList: {
    type: Array<any>,
    required: true,
    default: () => [],
  },
  basePath: {
    type: String,
    required: true,
    example: '/system',
    default: '',
  },
})

// console.log('props.menuList', props.menuList)

// 每次向下层转递路径时，判断是不是一个外部链接，如果是，就直接原封不动的向下传递，
// 如果不是，就拼接父级路径和当前路径，再向下传递
function resolveFullPath(routePath: string) {
  // 如果传递过来的父级路径是外部链接，就直接原封不动的向下传递
  if (isExternal(props.basePath)) return props.basePath
  // 如果父级路径不是外部链接，但是当前路由的路径是外部链接，就直接返回当前路由的路径
  if (isExternal(routePath)) return routePath

  // 如果都不是，就拼接父级路径和当前路径
  console.log(path.resolve(props.basePath, routePath))
  return path.resolve(props.basePath, routePath)
}
resolveFullPath('/system/user')
</script>

<template>
  <el-menu
    :default-active="currentRoute.path"
    class="el-menu-vertical-demo"
    :unique-opened="true"
    :collapse-transition="false"
    :collapse="!appStore.sidebar.opened"
    :background-color="variables['menu-background']"
    :text-color="variables['menu-text']"
    :active-text-color="variables['menu-active-text']"
  >
    <SidebarMenuItem v-for="route in menuList" :key="route.path" :route-item="route" base-path=""> </SidebarMenuItem>
  </el-menu>
</template>

<style scoped></style>
