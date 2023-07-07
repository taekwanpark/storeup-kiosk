import { createApp } from 'vue'
import App from './App.vue'
import '@renderer/assets/css/index.css'
import router from '@renderer/routes/routers'

createApp(App).use(router).mount('#app')
