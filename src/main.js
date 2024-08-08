import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/css/main.css'
// 导入element-plus的css样式
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
// 引入mock
import '@/utils/mock/index'
// 引入element-plus的图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn
})
app.use(createPinia())
app.use(router)
app.mount('#app')
