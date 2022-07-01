import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// import Layout from '@/layout/index.vue'
import login from '@/views/login/index.vue'


export const asyncRoute = [
  {
    path: '/',
    component: 'Layout',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'DASHBOARD',
        // component: () => import('@/views/dashboard/index.vue'),
        component: 'dashboard/index.vue',
        meta: { title: '首页' }
      },
    ]
  },
  {
    path: '/system',
    component: 'Layout',
    meta: { title: '系统管理' },
    children: [
      {
        path: 'user',
        name: 'USER',
        // component: () => import('/system/user/index.vue'),
        component: 'system/user/index.vue',
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: 'ROLE',
        // component: () => import('@/views/system/role/index.vue'),
        component: 'system/role/index.vue',
        meta: { title: '角色管理' }
      }
    ]
  },
  {
    path: '/antv',
    component: 'Layout',
    meta: { title: '图编辑' },
    children: [
      {
        path: 'flow',
        name: 'FLOW',
        // component: () => import('@/views/antv/flow/index.vue'),
        component: 'antv/flow/index.vue',
        meta: { title: '流程图' }
      },
      {
        path: 'er',
        name: 'ER',
        // component: () => import('@/views/antv/er/index.vue'),
        component: 'antv/er/index.vue',
        meta: { title: 'ER图' }
      }
    ]
  },
]

export const constantRouterMap: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'LOGIN',
    component: login,
    meta: { hidden: true }
  },
  // ...asyncRoute
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRouterMap
})



export default router
