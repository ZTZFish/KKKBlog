import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePageThemeStore = defineStore(
  'pageTheme',
  () => {
    // 初始化时优先从本地存储读取，否则默认''（日间）
    const pageTheme = ref(localStorage.getItem('theme-mode') || '')

    // 切换主题的方法（同步更新属性和本地存储）
    const toggleTheme = () => {
      pageTheme.value = pageTheme.value === '' ? 'dark' : ''
      document.documentElement.setAttribute('theme-mode', pageTheme.value)
      localStorage.setItem('theme-mode', pageTheme.value) // 同步到本地存储
    }

    return {
      pageTheme,
      toggleTheme,
    }
  },
  {
    persist: true, // 保持持久化配置（双重保障）
  },
)
