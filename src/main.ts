import { createApp } from 'vue'
import { createPinia } from 'pinia'
// if you just want to import css
import 'tdesign-vue-next/es/style/index.css'
import './assets/base.css'
import persistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { usePageThemeStore } from './stores/pageTheme'

const pinia = createPinia()
pinia.use(persistedstate)
const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app')

// 初始化主题（在App挂载后执行，确保Pinia已加载）
const initThemeAfterMount = () => {
  const pageThemeStore = usePageThemeStore()
  // 同步Pinia状态到html属性
  document.documentElement.setAttribute('theme-mode', pageThemeStore.pageTheme)

  // 监听系统偏好变化（仅在用户未手动设置时生效）
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme-mode')) {
      // 无手动设置时跟随系统
      const newMode = e.matches ? 'dark' : ''
      pageThemeStore.pageTheme = newMode
      document.documentElement.setAttribute('theme-mode', newMode)
    }
  })
}

// 执行初始化
initThemeAfterMount()
