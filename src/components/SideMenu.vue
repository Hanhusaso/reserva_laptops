<template>

    <v-navigation-drawer v-model="drawer" fixed app clipped  class="drawer-style" id="style-1">
        <v-list class="pa-1">
        <v-list-tile avatar>
            <v-list-tile-avatar>
                <i class="fas fa-user-circle fa-3x"></i>
            </v-list-tile-avatar>

            <v-list-tile-content>
            <v-list-tile-title>{{usuario.nombre}} {{usuario.a_paterno}}</v-list-tile-title>
            <v-list-tile-title class="cargo_usuario"><i class="fas fa-key"></i>&nbsp;&nbsp;{{usuario.cargo}}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        </v-list>

    <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile @click="mostrarInicio()">
            <v-list-tile-action>
            <i class="fas fa-home fa-2x"></i>
            </v-list-tile-action>

            <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="mostrarVistaGeneral()">
            <v-list-tile-action>
            <i class="fas fa-tv fa-2x"></i>
            </v-list-tile-action>

            <v-list-tile-content>
            <v-list-tile-title>Pantalla General</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="mostrarAdministrador()">
            <v-list-tile-action>
            <!-- <v-icon>icono</v-icon> -->
            <i class="fas fa-table fa-2x"></i>
            </v-list-tile-action>

            <v-list-tile-content>
            <v-list-tile-title>Administrador</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapState} from 'vuex';

export default {
    props: {
        drawer: Boolean
    },
    computed: {
      ...mapState(['usuario'])
    },
    methods: {
        mostrarInicio(){
            this.$router.push("/vistaAdministrador");
            this.$emit('ocultarSide',false);
        },
        mostrarVistaGeneral(){
            this.$router.push("/vistaGeneral");
            this.$emit('ocultarSide',false);
        },
        mostrarAdministrador(){
            this.$router.push("/tablas");
            this.$emit('ocultarSide',false);
        }
    }
}
</script>

<style>
    .cargo_usuario{
        font-size: 12px;
        color: #A6A6A6;
    }
</style>

