import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePageThemeStore = defineStore(
  'pageTheme',
  () => {
    // 初始化默认值为日间模式
    const pageTheme = ref('')

    // 可以添加一个切换主题的方法，方便使用
    const toggleTheme = () => {
      pageTheme.value = pageTheme.value === '' ? 'dark' : ''
      // 同步更新页面的 theme-mode 属性
      document.documentElement.setAttribute('theme-mode', pageTheme.value)
    }

    return {
      pageTheme,
      toggleTheme,
    }
  },
  {
    persist: true, // 开启持久化
  },
)
