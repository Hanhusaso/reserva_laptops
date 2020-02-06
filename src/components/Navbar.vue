<template>
    <!-- <v-app> -->
        <v-container class="contenedor">
            <v-toolbar fixed app light clipped-left> 
            <v-toolbar-side-icon @click="drawer = !drawer">

            </v-toolbar-side-icon>

            <v-toolbar-title class="">SISTEMA DE RESERVA DE LAPTOPS</v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- <v-btn icon>
            <v-icon>search</v-icon>
            </v-btn>

            <v-btn icon>
            <v-icon>refresh</v-icon>
            </v-btn>

            <v-btn icon>
            <v-icon>more_vert</v-icon>
            </v-btn> -->

            <v-toolbar-items class="hidden-sm-and-down">
                
                <v-btn flat><i class="fas fa-user-circle fa-2x"></i>&nbsp;&nbsp;{{usuario.cargo}}</v-btn>
            </v-toolbar-items>
            <v-btn outline color="red" @click="salir()">Cerrar Sesión</v-btn>
        </v-toolbar>
        <SideMenu :drawer="drawer" @ocultarSide="ocultarSide"/>
        </v-container>
        

    <!-- </v-app> -->
    
    
    
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SideMenu from '@/components/SideMenu.vue' 
export default {
    data() {
        return{
            drawer: false
        }
    },
    components:{
        SideMenu
    },
    name: 'navbar',
    computed:{
        ...mapState(['usuario'])
    },
    methods:{
        ...mapActions(['cerrarSesion']),
        salir(){
            this.cerrarSesion();
            this.$router.push('/login');
        },
        ocultarSide(e){
            this.drawer = e;
        }
    }
}
</script>

