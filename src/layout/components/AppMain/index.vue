<script setup></script>

<template>
  <section class="app-main">
    <div>哈哈哈</div>
    <!-- <RouterView></RouterView> -->
    <!-- <router-view>
      <template #default="{ Component, route }">
        <transition enter-active-class="animate__animated animate__fadeIn" mode="out-in">
          <keep-alive :include="cachedViews">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </template>
    </router-view> -->
  </section>
</template>

<style scoped>
.app-main {
  position: relative;
  overflow-y: auto;
  background-color: var(--el-bg-color-page);
}
</style>
