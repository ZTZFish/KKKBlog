import { createApp } from 'vue'
import { createPinia } from 'pinia'
// if you just want to import css
import 'tdesign-vue-next/es/style/index.css'
import './assets/base.css'
import persistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(persistedstate)
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
