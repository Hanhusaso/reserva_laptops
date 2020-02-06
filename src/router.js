import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './components/Inicio.vue'
import VistaGeneral from './components/VistaGeneral.vue'
import VistaAdministrador from './components/VistaAdministrador.vue'
import Login from './components/Login.vue'
import store from '@/store'
import Tablas from './components/Tablas.vue'

Vue.use(Router)

const router = new Router({
  base: '/dist/',
  //mode: 'history',
  //base: process.env.BASE_URL,
  routes: [
     {
       path: '/',
       name: 'inicio',
       component: Inicio,
       meta: {
         autenticacion: true
       }
     },
     {
      path: '/vistaGeneral',
      name: 'vistaGeneral',
      component: VistaGeneral,
      meta: {
        autenticacion: true
      }
    },{
      path: '/vistaAdministrador',
      name: 'vistaAdministrador',
      component: VistaAdministrador,
      meta: {
        autenticacion: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/tablas',
      name: 'tablas',
      component: Tablas,
      meta: {
        autenticacion: true
      }
    }
    ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.autenticacion)) {
    if (store.state.usuario) {
      next();
    }else{
      next({name: 'login'});
    }
  }else{
    next();
  }
})

export default router
