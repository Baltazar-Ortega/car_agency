import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Principal from '@/components/Principal.vue'
import Admin from '@/components/Admin.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Principal',
    component: Principal
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = new VueRouter({
  routes
})

export default router
