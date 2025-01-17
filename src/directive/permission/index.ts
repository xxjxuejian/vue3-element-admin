import type { Directive, DirectiveBinding } from 'vue'
import { useUserStore } from '@/stores'

/**
 * 按钮权限
 *  v-hasPerm="'sys:user:edit'"
 */
export const hasPerm: Directive = {
  // 这个指令是绑定在html元素上的,el就是这个元素，检查这个元素有没有给出的权限
  // binding参数就是需要检查的权限，检查el元素有没有bingding值的权限
  mounted(el: HTMLElement, binging: DirectiveBinding) {
    // 1. 先拿到需要检查的权限
    const requiredPerms = binging.value

    // 2. 检查权限值是否合法，他可以是一个字符串，也可以是一个字符串数组
    // 如果是空值，或者既不是字符串，也不是字符串数组，则直接返回
    if (!requiredPerms || (typeof requiredPerms !== 'string' && !Array.isArray(requiredPerms))) {
      throw new Error(
        "需要提供权限标识！例如：v-has-perm=\"'sys:user:add'\" 或 v-has-perm=\"['sys:user:add', 'sys:user:edit']\"",
      )
    }

    // 3. 获取当前登录用户所属角色以及按钮权限列表
    const { roles, perms } = useUserStore().userInfo

    // 4,如果是超级管理员，拥有全部权限，直接返回
    if (roles.includes('ROOT')) return

    // 5.检查权限
    let hasAuth = false
    // 如果requiredPerms是字符串，就要判断perms数组中，有没有requiredPerms值
    if (typeof requiredPerms === 'string') {
      hasAuth = perms.includes(requiredPerms)
    }
    // 如果requiredPerms也是数组，就要requiredPerms数组中的每一个是不是都在perms数组中
    // 如果是一个字符串数组，这代表什么意思呢
    // v-hasPerm=['sys:user:edit','sys:user:add']表示这个按钮需要同时拥有sys:user:edit和sys:user:add权限？？
    else {
      // 只要有一个满足就行
      hasAuth = requiredPerms.some((perm) => perms.includes(perm))
    }

    // 如果没有权限，移除该元素
    // hasAuth值为false,就不显示元素,就是不显示按钮,用他的父元素来移出他
    if (!hasAuth && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  },
}

/**
 * 角色权限指令
 */
export const hasRole: Directive = {
  mounted(el: HTMLElement, binging: DirectiveBinding) {},
}
