// import { createApp } from 'vue';
// import App from './App.vue';
// import axios from 'axios'; /
// import 'bootstrap/dist/css/bootstrap.css';/
// import { createRouter, createWebHistory } from 'vue-router';/
// import LoginPage from '@/components/pages/LoginPage.vue'; /
// import RegisterPage from '@/components/pages/RegisterPage.vue'; /
// import DashboardPage from '@/components/pages/DashboardPage.vue'; /
  
// axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.interceptors.request.use(function (config) {
//   config.headers['X-Binarybox-Api-Key'] = process.env.VUE_APP_API_KEY;
//   return config;
// });
  
  
// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     { path: '/', component: LoginPage },
//     { path: '/register', component: RegisterPage },
//     { path: '/dashboard', component: DashboardPage },
//   ],
// });
  
// createApp(App).use(router).mount('#app');

// import './assets/main.css'

// import 'dotenv/config'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//Add config before creating app
// require('dotenv').config();

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
