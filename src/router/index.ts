import { createWebHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue'
import ComingSoon from '../views/ComingSoon.vue'
import Contact from '../views/Contact.vue'
import About from '../views/About.vue'

import Reservation from '../views/Reservation.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import UserView from '../views/UserView.vue'

import Blog from '../views/Blog.vue'
import Portifolio from '../views/Portifolio.vue'
import Menu from '../views/Menu.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/comingSoon', component: ComingSoon },
  { path: '/contact', component: Contact },
  { path: '/about', component: About },
  { path: '/reservation', component: Reservation },
  { path: '/login', component: Login },
  { path: '/signUp', component: SignUp },
  { path: '/userView', component: UserView },
  { path: '/blog', component: Blog },
  { path: '/portifolio', component: Portifolio },
  { path: '/menu', component: Menu },

]

export default createRouter({
  history: createWebHistory(),
  routes,
})