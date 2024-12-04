<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <!-- 传递的icon是el-icon-xxx开头的element-plus图标 -->
  <el-icon v-if="icon && icon.startsWith('el-icon')" class="sub-el-icon">
    <!--
      <el-icon><location /></el-icon> 图标的使用格式
    渲染动态组件或元素的“元组件 -->
    <component :is="icon.replace('el-icon-', '')" />
  </el-icon>

  <!-- 传递的icon是iconify图标,使用svg-icon组件 -->
  <SvgIcon v-else-if="icon" :icon-class="icon"></SvgIcon>

  <!-- 没有传递icon,给一个默认的icon -->
  <SvgIcon v-else icon-class="menu"></SvgIcon>
  <span v-if="title">{{ title }}</span>
</template>

<style scoped lang="scss">
.sub-el-icon {
  width: 14px !important;
  margin-right: 0 !important;
  color: currentcolor;
}

// .hideSidebar {
//   .el-sub-menu,
//   .el-menu-item {
//     .svg-icon,
//     .sub-el-icon {
//       margin-left: 20px;
//     }
//   }
// }
</style>
