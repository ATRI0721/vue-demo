import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/LoginRegister.vue'),
  },
  {
    path: '/register',
    name:'register',
    component: () => import( '../views/LoginRegister.vue'),
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import( '../views/ProductView.vue'),
    props: true
  },
  {
    path: '/user',
    name: 'user',
    component: () => import( '../views/UserView.vue'),
  },
  {
    path: '/user/cart',
    name: 'cart',
    component: () => import( '../views/CartView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
