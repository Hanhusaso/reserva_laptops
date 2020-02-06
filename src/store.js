import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: JSON.parse(localStorage.getItem("usuario"))
  },
  mutations: {
    actualizarUsuario(state, usuario){
      localStorage.setItem("usuario", JSON.stringify(usuario));
      state.usuario = usuario;
    }
  },
  actions: {
    cerrarSesion({state}){
      localStorage.removeItem("usuario");
      state.usuario = null;
    }
  },
  getters: {

  }
})
