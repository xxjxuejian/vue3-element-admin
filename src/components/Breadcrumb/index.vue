<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
import router from '@/router'

const currentRoute = useRoute()
// 面包屑数组
const breadcrumbs = ref<Array<RouteLocationMatched>>([])

// 获取面包屑数据，就是根据当前的路由，拿到完整的路径，从根路径开始
function getBreadcrumb() {
  console.log('面包屑', currentRoute)
}

getBreadcrumb()

watch(
  () => currentRoute.path,
  (path) => {
    if (path.startsWith('/redirect/')) {
      return
    }
    getBreadcrumb()
  },
)
</script>

<template>
  <elbreadcrumb>
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path"> </el-breadcrumb-item>
  </elbreadcrumb>
</template>

<style scoped>
/* 覆盖 element-plus 的样式 */
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}
</style>
