<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'

const props = defineProps({
  /**
   * 当前路由对象
   */
  routeItem: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
})
</script>

<template>
  <!-- 只显示路由对象meta.hidden为false的路由 和 /  路径，/路径没有meta属性 -->
  <div v-if="!routeItem.meta?.hidden || !routeItem.meta">
    {{ routeItem.meta?.title }}
  </div>
</template>

<style scoped></style>
