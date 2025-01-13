<script lang="ts" setup>
import { type LoginData } from '@/api/auth'
import type { FormInstance } from 'element-plus'
import { ThemeEnum } from '@/enums/ThemeEnum'

import { useSettingsStore, useUserStore, useDictStore } from '@/stores'
const settingsStore = useSettingsStore()

const { t } = useI18n()
const isDark = ref(false)
const toggleTheme = (val: boolean | string | number) => {
  console.log(settingsStore)
  const newTheme = settingsStore.theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK
  settingsStore.changeTheme(newTheme)
}

const loginImage = ref(new URL('../../assets/images/login-image.svg', import.meta.url).href)

const loginFormRef = ref<FormInstance>()
const loginData = ref<LoginData>({
  username: 'admin',
  password: '123456',
  captchaKey: '',
  captchaCode: '',
})

const captchaBase64 = ref(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAoCAYAAAA16j4lAAAEAklEQVR4Xu2Zy2sTQRzHxT/Bm3+AoFcvvuoT6qMKior4QkVFD6IHwZsnUYpgiEpbn1VRtKBVD15810O14sG3HlKsNGkSbTZJk901m+xmf+6Mtu78NmmzMcbMMB/4QrL5zRzy2Xns7CSQCM0kfEEiFlKw4EjBgiMFC44ULDhSsOBIwYIjBQuOFCw4JQUXrBCktSDE01sgojRDWJkP0dQa+DayF0b0Tuf3r7gJl1if42AEe0DfdR3U5e2gLjgJ2flB+lnfeR1ygadgfYrjZlzBCLbtPCjqURhMzHYya9xwTdGGXOtDyM4JVJTcsQfO3VDEvXCBS7AF30f2eUSWSz2ZOv3+WGqBceWlR+JEIW14ZExwWu9gBA4lW0DN3QHTioENpnMDK2AUPkBGvwax1FZ3H/8ULBV/rwZt3UVGnr77BpivI2BrebD1PFjvoqDv6WJqtPWduBsuoIKtYpKus265VvE7rv0vYKH4ezWoC08x8orxDC6h15hRvPAkLuECKpiMSvfozf64hev+K7WeorWNl30L1jZdwSVcQAUPZw4ygnOFV5BUW52RvAbCiXnO6F7i7Ki3OzvoC87+xPtn8Eb+5mtGHpmOybQMeuHXFP3eO0Xnu9/gbqomkOyrOn6hgqPJ1YzgsNLEfHeHTN958yPuhy9sG4yzvZBtCrLTcKk4Ncb557RNrcDS/MQvVHBEWewROV4iylJnjR7GfXFHoScE6mJ2PXaH/GY+68fN/hoszU/8QgUPJuaiUboSdOMpnY5JyGdyzV2T0gK4L9+0bzbK5l9ik+fg4488QsvFOPGEtuGR3yO4mZFHhGLINXdNNLUWl/gGS62XYLKeMiN17QUwe7+AncmBrRpg9g2AtuESU5O/+w53wwVUcCy9mZFXaiNFro3+Hro/DUL3ZkD/5BtlUwlYar0E69uuMvKst0O4hG603DWa04ZHqGBFPVKRYCrWCamJJJtxCYMf0fVGXXKakWf/KOASeo0Z5U6bWoHXVT/xCxWsGz0TTtGhpsNMDXnxUAmNKFld2saOYPKIhMAjWF3WjkuqBkvzE79QweQokjzzjsortckKdc1kBKu527ivkjSiYH3/LXb6Xd8J5osBsLPGrzX45VfPGqwf6MbdVA2W5id+GTuLJocbg4k5jESc0Sk6nt5Bb4rxaOQpmgh0y6skpA2PMK8LdeMxhJVFHrHukKm5f8p5z6YKp9EpODtp+v63hEx3SA2p5RVGMIEcYKS1NvqynxxRklOtoeQqGM4ccm6AR2DbfL4XLYUdy4Bxrhf0vV2gtpz588J/RQc9qiSnXcXoCG7GFR7BErGQggVHChYcKVhwpGDBkYIFRwoWHClYcKRgwZGCBUcKFhwpWHB+AtgFvOlqEysEAAAAAElFTkSuQmCC',
) // 验证码图片Base64字符串
</script>

<template>
  <div class="login">
    <div class="login-header">
      <div class="flex-y-center gap-x-1">
        <el-switch v-model="isDark" @change="toggleTheme" active-icon="Moon" inactive-icon="Sunny" inline-prompt />
        <lang-select class="ml-2 cursor-pointer" />
      </div>
    </div>

    <!-- 登录页内容 -->
    <div class="login-content">
      <div class="login-img">
        <el-image style="width: 210px" :src="loginImage" />
      </div>

      <div class="login-form">
        <el-form :model="loginData" ref="loginFormRef">
          <div class="form-title">
            <h2>vue3-element-admin</h2>
          </div>

          <!-- 用户名 -->
          <el-form-item prop="username">
            <div class="input-wrapper">
              <el-icon class="mx-2">
                <User />
              </el-icon>
              <el-input
                ref="username"
                v-model="loginData.username"
                name="username"
                size="large"
                class="h-[48px]"
                :placeholder="$t('login.username')"
              />
              <!-- <el-input :placeholder="$t('login.username')" /> -->
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
                name="password"
                size="large"
                class="h-[48px] pr-2"
                type="password"
                show-password
                :placeholder="$t('login.password')"
              />
            </div>
          </el-form-item>

          <!-- 验证码 -->
          <el-form-item prop="captchaCode">
            <div class="input-wrapper">
              <svg-icon icon-class="captcha" class="mx-2" />
              <el-input
                v-model="loginData.captchaCode"
                name="captchaCode"
                size="large"
                class="h-[48px]"
                :placeholder="$t('login.captchaCode')"
              />
              <el-image :src="captchaBase64" class="captcha-img" />
            </div>
          </el-form-item>

          <div class="flex-x-center w-full justify-between py-1">
            <el-checkbox>
              {{ $t('login.rememberMe') }}
            </el-checkbox>

            <el-link type="primary" href="/forget-password">
              {{ $t('login.forgetPassword') }}
            </el-link>
          </div>

          <!-- 登录按钮 -->
          <el-button type="primary" size="large" class="w-full">
            {{ $t('login.login') }}
          </el-button>

          <!-- 分割线 -->
          <el-divider>{{ $t('login.otherLoginMethods') }}</el-divider>

          <!-- 第三方登录 -->
          <div class="third-party-login">
            <svg-icon icon-class="wechat" class="icon" />
            <svg-icon icon-class="qq" class="icon" />
            <svg-icon icon-class="github" class="icon" />
            <svg-icon icon-class="gitee" class="icon" />
          </div>
        </el-form>
      </div>
    </div>

    <!-- 登录页底部 -->
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
  }

  .login-content {
    display: flex;
    width: 960px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: var(--el-box-shadow-light);

    @media (width<=768px) {
      flex-direction: column;
      max-width: 100%;
      height: 100vh;
      padding: 0 30px;
      border-radius: 0;
      box-shadow: none;
    }

    .login-img {
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(60deg, #165dff, #6aa1ff);
      flex: 3;

      // @media (width<=768px) {

      // }
    }

    .login-form {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 400px;
      padding: 30px;

      .form-title {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0 0 20px;
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

      .third-party-login {
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 0 20px;

        .icon {
          cursor: pointer;
        }
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

// 直接放到根元素上,首先选中所有的data-v-xxx属性的元素，在下面找el-input
:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    box-shadow: none;
  }
}

html.dark {
  .login {
    background: url('@/assets/images/login-background-dark.jpg') no-repeat center right;

    .login-content {
      background: transparent;
      box-shadow: var(--el-box-shadow);
    }
  }
}
</style>
