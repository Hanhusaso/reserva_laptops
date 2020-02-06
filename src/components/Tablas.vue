<template>
    
    <div>
      <div>
        <br><br>
      <v-flex xs12  lg5 mb-3 style="margin: auto">
    <div class="text-xs-center mb-3"></div>
    <v-expansion-panel
      v-model="panel_liberado"
      expand
    >
      <v-expansion-panel-content style="background-color:green"
        v-for="(item, i) in 1"
        :key="i"
      >
        <template v-slot:header>
          <div style="text-align:center">Activos</div>
        </template>
        <v-card>
                 <div>
                        <v-data-table
                          :headers="headers1"
                          :items="activos"
                          :search="search"
                          class="elevation-1"
                         >
                        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
                          <template  v-slot:items="props">
                            <td class="text-xs-center"> {{ props.item.id_laptop }}</td>
                            <td class="text-xs-center" v-if="props.item.alumno">{{ props.item.alumno.nombres | nombreCap }} {{props.item.alumno.a_paterno| aPatCap}}</td>
                             <td class="text-xs-center" v-if="props.item.alumno">{{ props.item.alumno.codigo}}</td>
                            <td class="text-xs-center" >{{ props.item.hora_ingreso }}</td>
                            <td  class="text-xs-center">
                            <Reloj  :horaRecibida="props.item.hora_ingreso"/>
                            </td>
                            <td class="text-xs-center"> 
                              <v-btn style="background:red" fab small dark>
                               <v-icon>fas fa-sign-out-alt</v-icon>
                               </v-btn>
                             <!-- <v-btn><i class="fas fa-sign-out-alt"></i></v-btn> -->
                            
                              </td>                           
                          </template>
                        </v-data-table>
                  
                </div>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
      </v-flex>
  </div> 


    <div>
      <v-flex xs12  lg5 mb-3 style="margin: auto">
    <div class="text-xs-center mb-3"></div>
    <v-expansion-panel
      v-model="panel_liberado1"
      expand
    >
      <v-expansion-panel-content style="background-color:red"
        v-for="(items, i) in 1"
        :key="i"
      >
        <template v-slot:header>
          <div  style="text-align:center">Liberados</div>
        </template>
        <v-card>
                 <div >
                        <v-data-table
                          :headers="headers2"
                          :items="finalizados"
                          :search="search1"
                          :loading="true"                         
                            class="elevation-1"
                        >
                        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
                          <template  v-slot:items="props"  >
                            <td >{{ props.item.id_laptop }}</td>
                            <td class="text-xs-center" v-if="props.item.alumno">{{ props.item.alumno.nombres| nombreCap}} {{props.item.alumno.a_paterno| aPatCap}}</td>
                            <td class="text-xs-center" v-if="props.item.alumno">{{ props.item.alumno.codigo}}</td>
                            <td class="text-xs-center">{{ props.item.fecha }}</td>
                            <!-- <td class="text-xs-center">{{ props.item.hora_ingreso }}</td> -->
                            <td class="text-xs-center">{{ props.item.hora_salida }}</td>
                            
                          </template>
                        </v-data-table>
                        
                </div>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
      </v-flex>                   
  </div>  
  
 



    </div>

  


</template>
<script>
import io from 'socket.io-client';
import axios from 'axios';
import Reloj from '@/components/Reloj.vue';



  export default {
    components:{  
        Reloj
    },
    data () {
      return {
       hora: new Date().getHours(),
       minuto: new Date().getMinutes(),
       segundo: new Date().getSeconds(),
        
        alumno: [],
        año: new Date().getFullYear(),
        mes: new Date().getMonth()+1,
        dia: new Date().getDate(),
        fecha_2:'',
        tiempo:'',
        search: '',
        search1: '',
        pagination: {},
        pagination1: {},
        selected: [],
        activos: [],
        finalizados: [],
        reserva: [],
        reserva_id: [],
        reservas_activos: [],
        panel_activo:[false],
        panel_liberado:[false],
        panel_activo1:[false],
        panel_liberado1:[false],
        socket: io('localhost:3001'),
        nombres:'',
        
        
        headers2: [
          {
            text: ' PC ',
            align: 'center',
            sortable: false,
            value: 'id_laptop'
          },
          { text: 'USUARIOS',align: 'center', value: 'nombres' },
          { text: 'Código' ,align: 'center',value:'codigo'},
          { text: ' fecha',align: 'center', value: 'fecha' },
          //  { text: 'hora de ingreso',align: 'center', value: 'hora_ingreso' },
          { text: 'Hora de salida' ,align: 'center',value:'hora_salida'}
        
        ], 
        headers1: [
          {
            text: ' PC ',
            align: 'center',
            sortable: false,
            value: 'id_laptop'
          },
          { text: 'USUARIOS',align: 'center', value: 'nombres' },
          
          { text: 'Código' ,align: 'center',value:'codigo'},

          { text: ' hora de entrada',align: 'center', value: 'hora de entrada' },
          
          { text: 'Tiempo de uso' ,align: 'center',value:'tiempo de uso'},

          { text: 'Liberar' ,align: 'center',value:'liberar'}
         
        ]
      }
    },
    created() {
      
      this.fecha_2=this.año+'-'+this.mes+'-'+this.dia;
      this.tiempo=this.hora+':'+this.minuto+':'+this.segundo;

      //console.log(this.finalizados);
      
      
    },

    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
      pages2 () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    methods: {

      mostrar_alumno_activos(fecha){
       
      axios.get("http://localhost/apireserva/v1/reservas/0/0/"+fecha,//poner el dia
      {headers: { 'content-type': 'application/form-data'  }})
      
      .then((response)=>{
        
        this.reservas_activos = response.data;
   
        this.reservas_activos.forEach(reservas_activos => {
         

          this.Separar_Estado(reservas_activos);
        });
         
      })
      .catch(e=>{
        this.errors.push(e);
      });
      },
      
      buscarAlumno(codigo,activos){
       
            axios.get("http://localhost/apireserva/v1/usuarios/"+codigo,
            {headers: { 'content-type': 'application/form-data' }})
            .then(response => {
                this.alumno = response.data;
                this.$set(activos,"alumno",this.alumno[0]);
               

             
                // this.$set(activos,"color",this.color);
             
                
                // eslint-disable-next-line 
                //this.activos.push(alumno.nombres);
                 
                           
            })
            .catch(e => {
                this.errors.push(e);
                
            })
        },
        buscarReserva(id_laptop){
            axios.get("http://localhost/apireserva/v1/reservas/" + id_laptop,
                {headers: {'content-type': 'application/form-data'}})
                .then(response =>{
                 
                    this.reserva = response.data;
                    this.reserva.forEach(reserva=>{

                        this.Separar_Estado(reserva);

                    })
                  
                })
                .catch(e =>{
                    this.errors.push(e);
                });
        },
        buscarPorid(id_reserva){
            axios.get("http://localhost/apireserva/v1/reservas/0/0/0/"+id_reserva,
            {headers: {'content-type': 'application/form-data'}})
            .then(response =>{
                this.reserva_id=response.data;
               
                this.reserva_id.forEach(reserva_id=>{
                  this.Separar_Estado(reserva_id);
                  
                })

                  })    
                .catch(e =>{
                    this.errors.push(e);
                });

        },

        Separar_Estado(e){
          if(e.hora_salida  == null){
              this.activos.push(e);
              this.buscarAlumno(e.codigo,e);
          }
            else{
              this.finalizados.unshift(e);
         
              this.buscarAlumno(e.codigo,e);

              }
           
          },

          ActualizarActivos(e,i){
           
          
            for( var j=0;j<e.length;j++){
                    if(e[j].id==i){
                      // this.indice= e.id.indexOf('245');
                      e.splice(j,1);
                     
                      } 
                      
                 } 
                },
           
            
         


          

        // pintar(e,id){
      
        //   // this.color=e;
        //   // return color
       
        // }

      },

      mounted() {

      this.mostrar_alumno_activos(this.fecha_2);
      

      this.socket.on('AGREGAR_ALUMNO',(data)=>{
      
      
      this.buscarReserva(data.id) ;

        

      });//escuchar el evento

      this.socket.on('CAMBIAR_ALUMNO',(data)=>{
         // this.buscarReserva(data.id);
         data.hora_salida=this.tiempo;
             
         this.buscarPorid(data.reserva.id);
         this.ActualizarActivos(this.activos,data.reserva.id);

        
      })


      },
      filters: {
        subStr: function(string) {
            string = string + ''; //Convertir a string
            return string.charAt(0);
        },
        nombreCap: function(nombres){
            nombres = nombres + '';
            const nombre = nombres.split(' ',1);
            return nombre[0].charAt(0) + nombre[0].slice(1).toLowerCase();
        },
        apellidoCap: function(apellido){
            apellido = apellido + '';
            return apellido.charAt(0) + apellido.slice(1).toLowerCase();
        },
        aPatCap: function(a_pat){
            a_pat = a_pat + '';
            return a_pat.charAt(0) + a_pat.slice(1).toLowerCase();
        }
    }
  }

</script>


<style>


.centrar_texto {
  text-align: center,
}

.pintar_fila{
  background-color:#ED6110;

}


  
</style>