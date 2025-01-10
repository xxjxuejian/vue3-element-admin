<script setup>
import login from '@/views/login/index.vue'
import { useAppStore } from './stores'
import { computed } from 'vue'

const appStore = useAppStore()
const locale = computed(() => appStore.locale)
</script>

<template>
  <el-config-provider :locale="locale">
    <!-- <el-watermark
      v-if="watermarkEnabled"
      :font="{ color: fontColor }"
      :content="defaultSettings.watermarkContent"
      :z-index="9999"
      class="wh-full"
    >
      <router-view />
    </el-watermark>

    <router-view v-else /> -->
    <login></login>
  </el-config-provider>
</template>

<style scoped lang="scss">
.app-vue {
  width: 100%;
  height: 100%;
}
</style>
