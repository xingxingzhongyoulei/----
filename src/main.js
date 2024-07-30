import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/css/main.css'
// 导入element-plus的css样式
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')
