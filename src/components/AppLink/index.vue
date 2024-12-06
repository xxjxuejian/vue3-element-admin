<!-- 动态决定使用a 还是router-link 的动态组件 -->
<script setup>
import { isExternal } from '@/utils'
import { computed } from 'vue'
const props = defineProps({
  to: {
    type: String,
    default: '',
  },
})

//如果是外部链接，就使用a ,不是外部链接，使用router-link
// 在实际渲染出来以后,都是超链接,只不过有的是完整的外部链接,有的是 href='#/xxx/xx',加上锚点的链接
const linkType = computed(() => {
  return isExternal(props.to) ? 'a' : 'router-link'
})

// 如果是router-link 需要的属性是to，
// 如果是a 需要的属性是href,target
const linkProps = computed(() => {
  return isExternal(props.to) ? { href: props.to, target: '_blank', rel: 'noopener noreferrer' } : { to: props.to }
})
</script>

<template>
  <component :is="linkType" v-bind="linkProps">
    <!-- 放了插槽里面才能放其它的元素/组件 -->
    <slot />
  </component>
</template>

<style scoped></style>
