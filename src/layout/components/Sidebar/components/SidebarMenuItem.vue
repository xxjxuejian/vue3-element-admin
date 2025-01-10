<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'
import SidebarMenuItemTitle from './SidebarMenuItemTitle.vue'
import AppLink from '@/components/AppLink/index.vue'
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

// const routePath = resolvePath(props.routeItem.path)
</script>

<template>
  <!--
   没有routeItem.children 说明到达了最底层菜单，同时routeItem.meta.hidden  要为false，才能显示
    -->

  <!-- 首先是针对根路径做处理 /  -->
  <template v-if="routeItem.path === '/'">
    <RouterLink to="/">
      <el-menu-item>
        <SidebarMenuItemTitle :title="routeItem.meta?.title" icon="el-icon-HomeFilled"> </SidebarMenuItemTitle>
      </el-menu-item>
    </RouterLink>
  </template>

  <!-- 不是根路径再接着处理 -->
  <template v-else>
    <!-- 如果meta信息中是hidden,则不显示，只显示hidden为false的菜单项 -->
    <template v-if="!routeItem.meta?.hidden">
      <!-- 判断是不是最底层菜单，是底层菜单就直接显示，那么就显示菜单项 -->
      <template v-if="!routeItem.children">
        <!-- 如果是外部链接，不能使用 router-link，是使用a 链接，
        这里要使用一个动态组件 AppLink
        -->
        <AppLink :to="resolvePath(routeItem.path)">
          <el-menu-item>
            <SidebarMenuItemTitle :title="routeItem.meta?.title" :icon="routeItem.meta?.icon"></SidebarMenuItemTitle>
          </el-menu-item>
        </AppLink>
      </template>

      <!-- 不是底层菜单，还有子级菜单，有children属性，需要el-sub-menu -->
      <template v-else>
        <el-sub-menu :index="routeItem.path">
          <template #title>
            <SidebarMenuItemTitle :title="routeItem.meta?.title" :icon="routeItem.meta?.icon"></SidebarMenuItemTitle>
          </template>
          <template v-for="item in routeItem.children" :key="item.path">
            <SidebarMenuItem :route-item="item" :base-path="resolvePath(routeItem.path)" />
          </template>
        </el-sub-menu>
      </template>
    </template>
  </template>
</template>

<style lang="scss">
.hideSidebar {
  .submenu-title-noDropdown {
    position: relative;
    padding: 0 !important;

    .el-tooltip {
      padding: 0 !important;

      .sub-el-icon {
        margin-left: 19px;
      }
    }

    & > span {
      display: inline-block;
      width: 0;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
  }

  .el-sub-menu {
    overflow: hidden;

    & > .el-sub-menu__title {
      padding: 0 !important;

      .sub-el-icon {
        margin-left: 19px;
      }

      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
  }

  .el-menu--collapse {
    width: $sidebar-width-collapsed;

    .el-sub-menu {
      & > .el-sub-menu__title > span {
        display: inline-block;
        width: 0;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }
    }
  }
}

.el-menu-item:hover {
  background-color: $menu-hover;
}
</style>
