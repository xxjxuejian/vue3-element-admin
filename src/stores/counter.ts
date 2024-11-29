import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => {
    return count.value * 2
  })
  // function函数 → actions
  function increment() {
    count.value++
  }

  return { count, double, increment }
})
