<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'
import SidebarMenuItemTitle from './SidebarMenuItemTitle.vue'
import { isExternal } from '@/utils'
import path from 'path-browserify'

const props = defineProps({
  /**
   * 当前路由对象
   */
  routeItem: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
  /**
   * 父级完整路径
   */
  basePath: {
    type: String,
    required: true,
  },
})

/**
 * 获取完整路径，适配外部链接
 *
 * @param routePath 路由路径
 * @returns 绝对路径
 */
function resolvePath(routePath: string) {
  // 是外部连接，直接返回链接
  if (isExternal(routePath)) return routePath
  if (isExternal(props.basePath)) return props.basePath

  // 不是外链，拼接以后返回
  // 拼接父路径和当前路径
  return path.join(props.basePath, routePath)
}

const routePath = resolvePath(props.routeItem.path)
</script>

<template>
  <!--
   没有routeItem.children 说明到达了最底层菜单，同时routeItem.meta.hidden  要为false，才能显示
    -->

  <!-- 首先是这个菜单项是可以显示的， -->
  <template v-if="!routeItem.meta?.hidden">
    <!-- 如果是最底层菜单，那么就显示菜单项 -->

    <template v-if="!routeItem.children">
      <RouterLink :to="resolvePath(routeItem.path)">
        <el-menu-item>
          <SidebarMenuItemTitle
            :title="resolvePath(routeItem.path)"
            :icon="routeItem.meta?.icon"
          ></SidebarMenuItemTitle>
        </el-menu-item>
      </RouterLink>
    </template>

    <!-- 如果 还有子级菜单，递归显示-->
    <template v-else>
      <!-- 针对/ 特殊处理，遇到path === '/'的路由，直接显示一层，不继续递归了 -->
      <template v-if="routeItem.path === '/'">
        <el-menu-item>
          <template #title>
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </template>
        </el-menu-item>
      </template>

      <!-- 其它的继续递归 -->
      <template v-else>
        <el-sub-menu :index="routeItem.path">
          <template #title>
            <SidebarMenuItemTitle :title="routeItem.path" :icon="routeItem.meta?.icon"></SidebarMenuItemTitle>
          </template>
          <template v-for="item in routeItem.children" :key="item.path">
            <SidebarMenuItem :route-item="item" :base-path="routeItem.path" />
          </template>
        </el-sub-menu>
      </template>
    </template>
  </template>
</template>

<style scoped></style>
