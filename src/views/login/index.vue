<script setup lang="ts">
import { ref, computed } from 'vue'

import loginImage from '@/assets/images/login-image.svg'
import AuthAPI, { type LoginData } from '@/api/auth'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
import router from "@/router";


const toggleTheme = () => {}
const loading = ref(false) //按钮加载状态
const loginFormRef = ref<FormInstance>()
const isDark = ref(false) // 是否暗黑模式
const userStore = useUserStore()
const captchaBase64 = ref() // 验证码图片Base64字符串，绑定到image上，显示验证码
// 表单数据
const loginData = ref<LoginData>({
  username: 'admin',
  password: '123456',
  captchaKey: '', // 后端返回的验证码key
  captchaCode: '', //用户输入的验证码
})

// 验证表单,国际化需要使用computed
const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: 'blur',
        message: '用户名不能为空',
      },
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        message: '密码不能为空',
      },
      {
        min: 6,
        max: 20,
        message: '密码长度不能少于6位,不能大于20位',
        trigger: 'blur',
      },
    ],
    // captchaCode: [
    //   {
    //     required: true,
    //     trigger: 'blur',
    //     message: '请输入验证码',
    //   },
    // ],
  }
})

const handleLoginSubmit = () => {
  // 检查表单校验是否通过
  loginFormRef.value?.validate((valid) => {
    // 表单校验通过
    if (valid) {
      loading.value = true

      userStore
        .login(loginData.value)
        .then((res) => {
          // 登录成功
          // 跳转到首页
          router.push('/')
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}
// 获取验证码
const getCaptcha = () => {
  AuthAPI.getCaptcha().then((res) => {
    // 获取验证码成功
    captchaBase64.value = res.captchaBase64
    loginData.value.captchaKey = res.captchaKey
  })
}
getCaptcha()
</script>

<template>
  <div class="login">
    <!-- 登录页头部，一个主题色切换，一个语言切换 -->
    <div class="login-header" style="background-color: aquamarine">
      <div class="flex-y-center">
        <!-- 切换主题 -->
        <el-switch v-model="isDark" inline-prompt active-icon="Moon" inactive-icon="Sunny" @change="toggleTheme" />
        <!-- 切换语言 -->
        <!-- <lang-select class="ml-2 cursor-pointer" /> -->
      </div>
    </div>

    <div class="login-content">
      <div class="login-img">
        <el-image :src="loginImage" style="width: 210px" />
      </div>

      <div class="login-form">
        <el-form :model="loginData" :rules="loginRules" ref="loginFormRef">
          <!-- 选择不同身份登录的下拉 框 -->
          <div class="form-title"></div>

          <!-- form-item 用户名
           prop="username"表单校验需要的
           -->
          <el-form-item prop="username">
            <div class="input-wrapper">
              <el-icon class="mx-2"><User /></el-icon>
              <el-input v-model="loginData.username" placeholder="用户名" size="large" class="h-[48px]" />
            </div>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="password">
            <div class="input-wrapper">
              <el-icon class="mx-2">
                <Lock />
              </el-icon>
              <el-input
                v-model="loginData.password"
                type="password"
                placeholder="密码"
                size="large"
                show-password
                class="h-[48px]"
              />
            </div>
          </el-form-item>

          <!-- 验证码 -->
          <el-form-item prop="captchaCode">
            <div class="input-wrapper">
              <svg-icon icon-class="captcha" class="mx-2" />
              <el-input
                v-model="loginData.captchaCode"
                auto-complete="off"
                size="large"
                class="flex-1"
                placeholder="验证码"
                @keyup.enter="handleLoginSubmit"
              />

              <el-image :src="captchaBase64" class="captcha-img" @click="getCaptcha" />
            </div>
          </el-form-item>

          <div class="flex-x-between w-full py-1">
            <el-checkbox> 记住我 </el-checkbox>

            <el-link type="primary" href="/forget-password"> 忘记密码 </el-link>
          </div>
          <!-- 登录按钮 -->
          <el-button type="primary" size="large" class="w-full" :loading="loading" @click.prevent="handleLoginSubmit">
            登录
          </el-button>
        </el-form>
      </div>
    </div>

    <div class="login-footer">
      <el-text size="small">
        Copyright © 2021 - 2024 youlai.tech All Rights Reserved.
        <el-link :underline="false" href="http://beian.miit.gov.cn/" target="_blank"> 皖ICP备20006496号-2 </el-link>
      </el-text>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: url('@/assets/images/login-background-light.jpg') no-repeat center right;

  .login-header {
    position: absolute;
    top: 0;
    width: 100%;
    height: 62px;
  }

  // 中间的部分,借助于父元素的弹性盒子居中，而顶部和底部都是定位的
  .login-content {
    display: flex;
    width: 960px;
    height: 500px;
    overflow: hidden;
    border-radius: 5px;
    // box-shadow: var(--el-box-shadow-light);

    @media (width <= 768px) {
    }

    // flex: 3;,flex: 2;
    .login-img {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 3;
      background: linear-gradient(60deg, #165dff, #6aa1ff);

      @media (width <= 768px) {
        display: none;
      }
    }

    .login-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 2;
      padding: 30px;

      .form-title {
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        width: 100%;
      }

      .captcha-img {
        height: 48px;
        cursor: pointer;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
    }
  }

  .login-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
}

:deep(.el-form-item) {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}
</style>
