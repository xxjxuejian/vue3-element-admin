<script setup>
import { usePermissionStore } from '@/stores'
const permissionStore = usePermissionStore()
console.log(permissionStore.routes)

const menus = permissionStore.routes.filter((item) => {
  return item.name !== undefined
})
console.log('menus', menus)
</script>

<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <!-- 一级菜单内部还有菜单 -->
    <el-sub-menu index="1">
      <!-- 一级菜单标题 -->
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>

      <!-- 二级子菜单 -->
      <el-sub-menu index="1-2">
        <template #title><span>item four</span></template>

        <!-- 三级菜单 -->
        <el-menu-item index="1-2-1">item one</el-menu-item>
        <el-menu-item index="1-2-1">item one</el-menu-item>
        <el-menu-item index="1-2-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>

    <!-- 一级菜单 -->
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<style scoped></style>
