import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Principal from '@/components/Principal.vue'
import Admin from '@/components/Admin.vue'
import Detalle from '@/components/Detalle.vue'
import AgregarAuto from '@/components/AgregarAuto.vue'
import ConsultasStock from '@/components/ConsultasStock.vue'
import ConsultasClientes from '@/components/ConsultasClientes.vue'
import BuscarAuto from '@/components/BuscarAuto.vue'

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
  },
  {
    path: '/detalle/:id',
    name: 'Detalle',
    component: Detalle
  },
  {
    path: '/agregar',
    name: 'AgregarAuto',
    component: AgregarAuto
  },
  {
    path: '/consultasStock',
    name: 'ConsultasStock',
    component: ConsultasStock
  },
  {
    path: '/consultasClientes',
    name: 'ConsultasClientes',
    component: ConsultasClientes
  },
  {
    path: '/buscarAuto',
    name: 'BuscarAuto',
    component: BuscarAuto
  }
]

const router = new VueRouter({
  routes
})

export default router
