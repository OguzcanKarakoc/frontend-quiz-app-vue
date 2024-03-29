import { createApp } from 'vue'
import './index.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/routers/router'

const pinia = createPinia();
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')

