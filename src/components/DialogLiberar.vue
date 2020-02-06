<template>
  <v-container>
    <v-dialog v-model="solicitudCodigo" max-width="500" persistent>
      <v-card>
        <v-toolbar color="dark" dark card>
          <v-toolbar-title>
            LIBERAR {{nombre_laptop}}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="subheading">
          Ingresa su código de matricula.......
        </v-card-text>
          <v-card-text>
        <v-text-field  @keydown.enter="liberar"  name="Codigo" label="Escriba su código aquí...."  class="validar"  v-model="Codig" color="dark"></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-layout>
            <v-flex xs6>
              <v-layout justify-start>
                <v-btn @click="cancelar">Cancelar</v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-layout justify-end>
                <v-btn v-on:click.prevent="liberar" color="dark" :disabled="isDisabled">Liberar</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <Snackbar :data="dataSnackBar"/>
  </v-container>
</template>


<script>
    import axios from 'axios';
    import Snackbar from '@/components/Snackbar'

    export default {
        name: 'dialog-liberar',
        components:{Snackbar},
        props:['solicitudCodigo','nombre_laptop','reserva'],
        data(){
          return{
              Codig:'', 
              max:8,
              dataSnackBar:{
                estado: false,
                mensaje: '',
                color: ''
              },
              dataLiberar:{
                estado: '',
                id_laptop: ''
              }
          }
        },
        created(){
        },
        methods:{
          liberar(){
              if (this.Codig == '') {
                this.dataSnackBar.estado = true;
                this.dataSnackBar.mensaje = "Debe ingresar su código";
                this.dataSnackBar.color = "red";
              }else{
                axios.put('http://localhost/apireserva/v1/reservas/' + this.reserva.id + "/" + this.Codig, 
                {
                },
                { headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                }
                })
                .then((response) => {
                    // eslint-disable-next-line
                    //console.log(response);
                    
                    this.Codig='';
                    if (response.data.status == 0) {
                      this.dataSnackBar.estado = true;
                      this.dataSnackBar.mensaje = response.data.status_message;
                      this.dataSnackBar.color = "red";
                    }else{
                      this.dataSnackBar.estado = true;
                      this.dataSnackBar.mensaje = response.data.status_message;
                      this.dataSnackBar.color = "green";

                      this.dataLiberar.estado = false;
                      this.dataLiberar.id_laptop = this.reserva.id_laptop;
                      this.$emit('cambiarEstado',this.dataLiberar);
                      this.dataLiberar.id_laptop = "";
                      
                    }
                })
                .catch(function (error) {
                    // eslint-disable-next-line
                    console.log(error);
                });
              }
              
          },
          cancelar(){
              this.$emit('cambiarEstado',this.dataLiberar);
              this.Codig='';
          }
        },
        computed: {
          isDisabled () {
            if (this.Codig.length ==  0) {
                return true;
            } else {
                return false;
            }
          }
        }
    }
</script>