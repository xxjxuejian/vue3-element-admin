<!-- 模板页 一个侧边栏，一个顶部-->
<script setup>
import { usePermissionStore } from '@/stores/modules/permission'
const permissionStore = usePermissionStore()
console.log('permissionStore')
permissionStore.generateRoutes()
</script>

<template>
  <div class="wh-full">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
