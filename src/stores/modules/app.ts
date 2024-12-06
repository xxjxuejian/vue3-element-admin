import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { SidebarStatusEnum } from '@/enums/SidebarStatusEnum'

export const useAppStore = defineStore('app', () => {
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

  return {
    sidebar,
    toggleSidebar,
    closeSideBar,
    openSideBar,
  }
})
