<script setup>
import SidebarLogo from './components/SidebarLogo.vue'
import SidebarMenu from './components/SidebarMenu.vue'
</script>

<template>
  <div>
    <SidebarLogo />
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>

<style scoped></style>
