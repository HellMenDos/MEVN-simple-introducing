import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Info from '../views/Info.vue'
import Account from '../views/Account.vue'
import Course from '../views/Course.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    meta: {auth: false },
    component: Home
  },
   {
    path: '/info',
    meta: {auth: false },
    component: Info
  },
   {
    path: '/account',
    meta: {auth: false },
    component: Account
  },
  {
    path: '/course/:id',
    meta: {auth: true },
    component: Course
  },
  {
    path: '/profile',
    meta: {auth: true },
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to,from,next)=> {

  var tos = to.matched.some((record)=> record.meta.auth);
  var path = to
  console.log(tos)
  if (tos == true) {
    if (localStorage.getItem('user') != null) {
      next()
    }else {
      location.href = 'http://localhost:8080/'
  }
}else {
  if (localStorage.getItem('user') != null && path.path == '/account') {
    location.href = 'http://localhost:8080/profile'
  }else {
  next()
}
}
})

export default router
