<template>
  <div class="logo">
    <transition enter-active-class="animate__animated animate__fadeInLeft">
      <!-- router-link的目的是为了 to="/"
      :key="+collapse" 是///
      -->
      <router-link :key="+collapse" class="wh-full flex-center" to="/">
        <img :src="logo" class="w20px h20px" />
        <span v-if="!collapse" class="title"> vue3-element-admin </span>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo.png'

defineProps({
  collapse: {
    type: Boolean,
    required: true,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $navbar-height;
  background-color: $sidebar-logo-background;

  .title {
    flex-shrink: 0; /* 防止容器在空间不足时缩小 */
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    color: white;
  }
}

.layout-top,
.layout-mix {
  .logo {
    width: $sidebar-width;
  }

  &.hideSidebar {
    .logo {
      width: $sidebar-width-collapsed;
    }
  }
}
</style>
