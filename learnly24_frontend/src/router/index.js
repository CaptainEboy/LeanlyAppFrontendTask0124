import { createRouter, createWebHistory } from 'vue-router'
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import HomeView from '../views/HomeView.vue'
import LoginPage from '@/components/pages/LoginPage.vue';
import RegisterPage from '@/components/pages/RegisterPage.vue';
import DashboardPage from '@/components/pages/DashboardPage.vue';

// axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.interceptors.request.use(function (config) {
//   config.headers['X-Binarybox-Api-Key'] = process.env.VUE_APP_API_KEY;
//   return config;
// });

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: LoginPage
    // },
    { path: '/', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/dashboard', component: DashboardPage },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
