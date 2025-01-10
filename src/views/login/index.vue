<script lang="ts" setup>
const isDark = ref(false)
const toggleTheme = (val: boolean | string | number) => {
  console.log(val)
}
</script>

<template>
  <div class="login">
    <div class="login-header">
      <div class="flex-y-center gap-x-1">
        <el-switch v-model="isDark" @change="toggleTheme" active-icon="Moon" inactive-icon="Sunny" inline-prompt />
        <lang-select class="ml-2 cursor-pointer" />
      </div>
    </div>
    <div class="login-content"></div>
    <div class="login-footer"></div>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  background: url('@/assets/images/login-background-light.jpg') no-repeat center right;

  .login-header {
    display: flex;
    justify-content: right;
    position: absolute;
    top: 0;
    width: 100%;
    padding: 15px;
    background-color: antiquewhite;
  }
}
</style>
