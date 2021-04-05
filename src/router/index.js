import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/escuelas',
    name: 'Escuelas',
    component: () => import('../views/Escuelas.vue')
  },
  {
    path: '/examenes',
    name: 'Examenes',
    component: () => import('../views/Examenes.vue')
  },
  {
    path: '/alumnos',
    name: 'Alumnos',
    component: () => import('../views/Alumnos.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginAlumnos.vue')
  },
  {
    path: '/loginAdmin',
    name: 'loginAdmin',
    component: () => import('../views/LoginAdmin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
