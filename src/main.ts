import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import { registerStore } from './store'

// 路由表
import router from './router/routes'
// 路由权限
import './router'

// element-Plus
import elIcons from './el-icons'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
// 初始化样式
import 'normalize.css/normalize.css'
import '@/assets/styles/index.scss'


const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.use(elIcons)
app.mount('#app')


registerStore()