<template>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="laptop in laptops" :key="laptop.id">
          <v-card class="tarjeta" :class="{'alerta':laptop.alerta}" height="100%"> 
              <v-card-title class="titulo">
                  <v-container class="align-center">
                      <h3 class="headline mb-0"><i class="fas fa-laptop icono"></i>&nbsp;&nbsp;{{laptop.nombre}}</h3>
                      <BuscarAlumno class="fuente" v-if="laptop.estado=='Ocupado'" :id_laptop="laptop.id" @enviarReserva="recibirReserva($event,laptop)"/>
                      <br>
                      <v-chip class="fuente" v-if="laptop.estado=='Disponible'" color="green" text-color="white">
                        <i class="fas fa-user"></i>&nbsp;&nbsp;{{laptop.estado}}
                      </v-chip>
                      <v-chip class="fuente" v-else color="orange" text-color="white">
                        <i class="fas fa-user-alt-slash"></i>&nbsp;&nbsp;{{laptop.estado}}
                      </v-chip>
                      <div v-if="laptop.estado=='Ocupado' && laptop.reserva">
                        <Cronometro class="fuente" :horaRecibida="laptop.reserva.hora_ingreso"  @alertaTiempo="alertaTiempo($event,laptop)"/>
                      </div>
                  </v-container>
              </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
    
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
import Cronometro from '@/components/Cronometro';
import BuscarAlumno from '@/components/BuscarAlumno';

export default {
    name: 'vistaGeneral',
    components: {
      Cronometro,BuscarAlumno
    },
    data(){
      return{
        laptops: [],
        estadoAlerta: false,
        estadoDialog: false,
        estadoLiberar:false,
        nombre_laptop: '',
        id_laptop: '',
        reserva: '',
        socket: io('localhost:3001')
      }
    },
    methods:{
      mostrarLaptops(){
        axios.get("http://localhost/apireserva/v1/laptops",
        {headers: { 'content-type': 'application/form-data' }})
        .then(response => {
            this.laptops = response.data;
            // eslint-disable-next-line 
            this.asignarAlerta();
            //console.log(this.laptops);

        })
        .catch(e => {
            this.errors.push(e);    
        })
      },
      recibirReserva(e,laptop){
        this.laptops.forEach(element => {
          if (element.id == laptop.id) {
            this.$set(element,'reserva',e);
          }
        });
      },
      mostrarModal(nombre_laptop,id_laptop){
        this.estadoDialog = true;
        this.nombre_laptop = nombre_laptop;
        this.id_laptop = id_laptop;
      },
      mostrarLiberar(nombre_laptop,reserva){
        this.estadoLiberar = true;
        this.nombre_laptop = nombre_laptop;
        this.reserva = reserva;
      },
      laptopDisponible(estado){
        if (estado == "Ocupado") {
          return false;
        }else{
          return true;
        }
      },
      alertaTiempo(e,laptop){
        this.laptops.forEach(element => {
          //Pone atributo alerta a todas las laptops
          
          if (element.id == laptop.id) {
            element.alerta = e;
            //console.log(this.laptops);
            
          }
        });
      },
      asignarAlerta(){
        this.laptops.forEach(laptop =>{
          this.$set(laptop,'alerta',false);
        });
      }
  },
  mounted(){
    
    this.mostrarLaptops();
    
    //console.log(this.laptops);
    
    this.socket.on('MENSAJE_RESERVA', (data) =>{
       this.laptops.map(function(laptop) {
         if (laptop.id == data.id_laptop) {
           laptop.estado = "Ocupado";
         }  
       });      
    });

    this.socket.on('MENSAJE_LIBERAR', (data) =>{
      this.laptops.map(function(laptop) {
        if (laptop.id == data.id_laptop) {
          laptop.estado = "Disponible";
          laptop.reserva = ""; 
          laptop.alerta = false;
        }  
      });
    });
  }
}
</script>

<style>
  .icono{
    font-size: 20px;
    color: #000;
  }

  .titulo{
    padding: 0;
  }

  .tarjeta{
    max-width: 195px;
    width: 165px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fuente{
    font-size: 0.75em;
  }


</style>