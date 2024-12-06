<script setup>
// isActive控制侧边栏的收缩和展开
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['toggleClick'])

function toggleClick() {
  emits('toggleClick')
}
</script>

<template>
  <div @click="toggleClick" class="px-[15px] flex justify-center items-center color-[var(--el-text-color-regular)]">
    <svg-icon icon-class="collapse" :class="{ hamburger: true, 'is-active': isActive }" />
  </div>
</template>

<style scoped>
.hamburger {
  vertical-align: middle;
  cursor: pointer;
  transform: scaleX(-1);
}
.hamburger.is-active {
  transform: scaleX(1);
}
</style>
