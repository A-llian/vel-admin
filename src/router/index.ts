import router from './routes'
import { asyncRoute } from './routes'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { RouteRecordRaw } from 'vue-router'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.permissionStore.addRouters.length === 0) {
        store.permissionStore.GenerateRoutes(asyncRoute).then(() => { // 根据roles权限生成可访问的路由表
          store.permissionStore.addRouters.forEach((asyncRouter: RouteRecordRaw) => {
            router.addRoute(asyncRouter)
          })
        })
        next({ ...to, replace: true })
      } else {
        next()
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasPermission(store.getters.roles, to.meta.roles)) {
        //   next()//
        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true }})
        // }
      }
      // next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})
