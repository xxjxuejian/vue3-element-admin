<script setup>
import Hamburger from '@/components/Hamburger/index.vue'
import { useAppStore } from '@/stores'
import { computed } from 'vue'
const appStore = useAppStore()
console.log('app', appStore.sidebar.opened)

// 侧边栏是否打开
const isSidebarOpened = computed(() => appStore.sidebar.opened)
// 展开/收缩菜单
function toggleSideBar() {
  appStore.toggleSidebar()
  console.log('app', appStore.sidebar.opened)
}
</script>

<template>
  <div class="navbar">
    <div class="navbar__left">
      <Hamburger @toggle-click="toggleSideBar" :isActive="isSidebarOpened"></Hamburger>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  height: $navbar-height;
  // background: var(--el-bg-color);

  &__left {
    display: flex;
    align-items: center;
  }
}
</style>
