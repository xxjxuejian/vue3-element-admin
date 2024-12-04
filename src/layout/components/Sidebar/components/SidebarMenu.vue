<script setup lang="ts">
import { usePermissionStore } from '@/stores'
import { computed } from 'vue'
import SidebarMenuItem from './SidebarMenuItem.vue'

const permissionStore = usePermissionStore()
console.log(permissionStore.routes)




</script>

<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" :unique-opened="true">
    <SidebarMenuItem v-for="item in permissionStore.routes" :key="item.path" :route-item="item" :base-path="item.path">
    </SidebarMenuItem>
  </el-menu>
</template>

<style scoped></style>
