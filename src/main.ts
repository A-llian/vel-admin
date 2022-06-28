import { createApp } from 'vue'
import App from './App.vue'

// 路由表
import router from './router/routes'
// 路由权限
import './router'

import store from './store'

// element-Plus
import elIcons from './el-icons'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
// 初始化样式
import 'normalize.css/normalize.css'
import '@/assets/styles/index.scss'



createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .use(elIcons)
  .mount('#app')
