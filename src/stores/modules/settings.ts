// 这个文件是系统设置的文件，给用户设置系统的主题等设置的

import defaultSettings from '@/settings'
import { ThemeEnum } from '@/enums/ThemeEnum'

type SettingsValue = boolean | string

export const useSettingsStore = defineStore('setting', () => {
  // 基本设置
  const settingsVisible = ref(false)
  // 标签
  const tagsView = useStorage<boolean>('tagsView', defaultSettings.tagsView)
  // 侧边栏 Logo
  const sidebarLogo = useStorage<boolean>('sidebarLogo', defaultSettings.sidebarLogo)
  // 固定头部
  const fixedHeader = useStorage<boolean>('fixedHeader', defaultSettings.fixedHeader)
  // 布局
  const layout = useStorage<string>('layout', defaultSettings.layout)
  // 水印
  const watermarkEnabled = useStorage<boolean>('watermarkEnabled', defaultSettings.watermarkEnabled)

  // 主题
  const themeColor = useStorage<string>('themeColor', defaultSettings.themeColor)
  const theme = useStorage<string>('theme', defaultSettings.theme)

  // 监听主题变化（监听不到系统的主题变化，只能监听手动更改的主题变化）
  watch(
    [theme, themeColor],
    ([newTheme, newThemeColor]) => {
      console.log('主题变化', [newTheme, newThemeColor])
      // toggleDarkMode(newTheme === ThemeEnum.DARK)
      // const colors = generateThemeColors(newThemeColor)
      // applyTheme(colors)
    },
    { immediate: true },
  )
})
