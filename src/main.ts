import { createApp } from 'vue'
import { createPinia } from 'pinia'
// if you just want to import css
import 'tdesign-vue-next/es/style/index.css'
import './assets/base.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
