<script setup lang="ts">
// @ts-nocheck
import { LanguageEnum } from '@/enums/LanguageEnum'
import { useAppStore } from '@/stores/modules/app'
import { useI18n } from 'vue-i18n'

const appStore = useAppStore()
// locale不是AppStore中locale
const { locale, t } = useI18n()
const langOptions = [
  { label: '中文', value: LanguageEnum.ZH_CN },
  { label: 'English', value: LanguageEnum.EN },
]

// 语言切换图标的大小
const props = defineProps({
  size: {
    type: String,
    required: false,
  },
})

// 切换语言时触发的回调
function handleLanguageChange(lang: string) {
  console.log('lang', lang)
  // 目的是更改locale值,这个值是在AppStore中定义的,根据language的值变化而变化,所以我们需要修改language的值
  locale.value = lang //必须要,不然t('langSelect.message.success')无法实现语言切换
  appStore.changeLanguage(lang)

  ElMessage.success(t('langSelect.message.success'))
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleLanguageChange">
    <!-- 语言切换的那个图标 -->
    <div>
      <svg-icon icon-class="language" :size="size" />
    </div>

    <!-- 当前的语言项不能选中,设置disabled ,要根据App的设置信息来切换 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langOptions"
          :key="item.value"
          :command="item.value"
          :disabled="appStore.language === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped></style>
