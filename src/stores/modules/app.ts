import defaultSettings from '@/settings'

// 导入 Element Plus 中英文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { DeviceEnum } from '@/enums/DeviceEnum'

import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { SidebarStatusEnum } from '@/enums/SidebarStatusEnum'
import { useStorage } from '@vueuse/core'
import { store } from '@/stores'

export const useAppStore = defineStore('app', () => {
  // 设备类型
  const device = useStorage('device', DeviceEnum.DESKTOP)
  // 布局大小
  const size = useStorage('size', defaultSettings.size)
  // 语言
  const language = useStorage('language', defaultSettings.language) // defaultSettings.language === 'zh-cn'
  // 根据语言标识读取对应的语言包
  const locale = computed(() => {
    return language.value === 'zh-cn' ? zhCn : en
  })

  // 侧边栏状态
  const sidebarStatus = ref(SidebarStatusEnum.OPENED)
  const sidebar = reactive({
    opened: sidebarStatus.value === SidebarStatusEnum.OPENED,
    withoutAnimation: false,
  })

  // 切换侧边栏
  function toggleSidebar() {
    sidebar.opened = !sidebar.opened
    sidebarStatus.value = sidebar.opened ? SidebarStatusEnum.OPENED : SidebarStatusEnum.CLOSED
  }

  // 关闭侧边栏
  function closeSideBar() {
    sidebar.opened = false
    sidebarStatus.value = SidebarStatusEnum.CLOSED
  }

  // 打开侧边栏
  function openSideBar() {
    sidebar.opened = true
    sidebarStatus.value = SidebarStatusEnum.OPENED
  }

  /**
   * 切换语言
   *
   * @param val
   */
  function changeLanguage(val: string) {
    language.value = val
  }

  return {
    device,
    size,
    language,
    locale,
    sidebarStatus,
    sidebar,
    toggleSidebar,
    closeSideBar,
    openSideBar,
    changeLanguage,
  }
})
/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */

// 上面都只是定义逻辑，需要导出一个方法，用于在组件外部使用 Pinia Store
// 由于此时pinia实例还没有创建，需要手动把这个pinia实例传递给useStore()函数
// 这就要求在之前的文件中有导出的pinia实例，在这里导入，然后 useAppStore(store)传递这个pinia实例
export function useAppStoreHook() {
  return useAppStore(store)
}
