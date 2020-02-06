<template>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <!-- Vista Administrar -->
        <v-flex xs12 sm6>
          <v-card>
            <v-img>
              <i class="fas fa-laptop iconoGrande"></i>
            </v-img>
            <v-card-title class="justify-center">
              <h2>Vista Administrador</h2>
            </v-card-title>
            <v-card-text>

            </v-card-text>
            <v-card-actions>
              <v-btn @click="mostrarVistaAdministrador()" block color = "blue" class="white--text">Ir a vista</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <!-- Vista General -->
        <v-flex xs12 sm6>
          <v-card>
            <v-img>
             <i class="fas fa-tv fa-2x iconoGrande"></i>
            </v-img>
            <v-card-title class="justify-center">
              <h2>Vista General</h2>
            </v-card-title>
            <v-card-text>

            </v-card-text>
            <v-card-actions>
              <v-btn block color="indigo" @click="mostrarVistaGeneral()" class="white--text">Ir a vista</v-btn>
            </v-card-actions>
            <!-- class="justify-center" -->
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
  name:'inicio',
  methods:{
    mostrarVistaAdministrador(){
      this.$router.push("/vistaAdministrador");
      this.$emit('ocultarSide',false);
    },
    mostrarVistaGeneral(){
      this.$router.push("/vistaGeneral");
      this.$emit('ocultarSide',false);
    }
  }
  
}
</script>

<style>
  .iconoGrande{
      font-size: 200px;
      color: #607D8B;
  }
  .alerta{
    background: #FF7474 !important;
    transition: background 0.8s linear 0.4s;
  }
  
</style>

