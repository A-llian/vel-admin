import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { constantRouterMap } from '@/router/routes'

const permissionStore = defineStore({
  id: 'Permission',
  state: () => {
    return {
      routers: constantRouterMap,
      addRouters: new Array<RouteRecordRaw>(),
      currentRoutes: [],
    }
  },
  getters: {
    
  },
  actions: {
    GenerateRoutes(asyncRouter: any[]) {
      return new Promise(resolve => {
        // const { roles } = data
        let accessedRouters = []
        accessedRouters = filterAsyncRouter(asyncRouter)
        accessedRouters.push({ path: '/:pathMatch(.*)', redirect: '/404', meta: { hidden: true } })
        this.addRouters = accessedRouters
        this.routers = this.routers.concat(accessedRouters)
        resolve(0)
      })
    },
  }
})

function filterAsyncRouter(asyncRouter: any[]): RouteRecordRaw[] {
  const accessedRouters: any[] = []
  asyncRouter.filter((router) => {
    if (router.children) {
      router.children = filterAsyncRouter(router.children)
    }
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = shallowRef(Layout)
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    accessedRouters.push(router)
  })
  return accessedRouters
}

function loadView(view: string) {
  // return () => Promise.resolve(require(`@/views${view}`).default)
  return () => import(`@/views/${view}`)
}

export {
  permissionStore
}