<template>
  <v-container>
    <v-dialog v-model="solicitudCodigo" max-width="500" persistent>
      <v-card>
        <v-toolbar color="dark" dark card>
          <v-toolbar-title>
            RESERVAR {{nombre_laptop}}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="subheading">
          Ingresa su código de matricula.......
        </v-card-text>
        <v-card-text>          
        <v-text-field  @keydown.enter="validarReserva"  name="Codigo" label="Escriba su código aquí...."  class="validar"  v-model="Codig" color="dark"></v-text-field>
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
                <v-btn v-on:click="validarReserva" color="dark" >Enviar</v-btn>
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
  import Snackbar from '@/components/Snackbar';

  export default {
    name: 'dialog-reserva',
    props:['solicitudCodigo','nombre_laptop','id_laptop'],
    components: { Snackbar },
    data(){
        return{
            Codig:'', 
            max:8,
            dataSnackBar:{
              estado: false,
              mensaje: '',
              color: ''
            },
            dataReserva:{
              estado: false,
              id_laptop: '',
            }
        }
    },
    created(){
        // $(function(){
        //     $(".validar").keydown(function(event){
        //         //alert(event.keyCode);
        //         if((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode !==190  && event.keyCode !==110 && event.keyCode !==8 && event.keyCode !==9  ){
        //             return false;
        //         }
        //     });
        // });
    },
    methods:{
        reservar(){
            
            axios.post('http://localhost/apireserva/v1/reservas', 
            {
                id_laptop: this.id_laptop,
                codigo: this.Codig
            },
            { headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            }
            })
            .then((response) => {
                
                this.Codig='';
                
                if (response.data.status == 0) {
                  this.dataSnackBar.mensaje = response.data.status_message;
                  this.dataSnackBar.color = "red";
                  this.dataSnackBar.estado = true;
                  
                }else{
                  this.dataSnackBar.mensaje = response.data.status_message;
                  this.dataSnackBar.color = "green";
                  this.dataSnackBar.estado = true;

                  this.dataReserva.id_laptop = this.id_laptop;
                  this.$emit('cambiarEstado',this.dataReserva);
                  this.dataReserva.id_laptop = '';
                }
                
            })
            .catch(function (error) {
                // eslint-disable-next-line
                console.log(error);
            });
            
        },
        cancelar(){
            this.$emit('cambiarEstado',this.dataReserva);
            this.Codig='';
        },
        validarReserva(){
          axios.get('http://localhost/apireserva/v1/reservas/0/' + this.Codig, 
          { headers: {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          }
          })
          .then((response) => {
              
              //console.log(response.data.length);
              if (response.data.length > 0) {
                this.dataSnackBar.mensaje = "Usuario previamente registrado";
                this.dataSnackBar.color = "red";
                this.dataSnackBar.estado = true;
              }else{

                this.reservar();
                //console.log(response);
                
              }
              
              
          })
          .catch(function (error) {
              // eslint-disable-next-line
              console.log(error);
          });
        }
    },
    computed: {
        isDisabled () {
        if (this.Codig.length ==  8) {
            return false;
        } else {
            return true;
        }
        }
    },
    mounted(){
        //console.log(this.solicitudCodigo);
        //this.solicitudCodigo = this.estadoDialog;
    }
  }
</script>

