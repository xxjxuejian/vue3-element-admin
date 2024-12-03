<!-- 模板页 一个侧边栏，一个顶部-->
<script setup>
import Sidebar from './components/Sidebar/index.vue'

import variables from '@/styles/variables.module.scss'
</script>

<template>
  <div class="wh-full">
    <Sidebar class="sidebar-container"></Sidebar>
    <!-- <router-view></router-view> -->
  </div>
</template>

<style scoped lang="scss">
.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: $sidebar-width;
  transition: width 0.28s;
  background-color: $menu-background;
}
</style>
