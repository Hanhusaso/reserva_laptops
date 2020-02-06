<template>
    <v-chip color="#607D8B" text-color="white">
        <v-avatar class="indigo">{{alumno.nombres | subStr}}</v-avatar>
        {{alumno.nombres | nombreCap}} {{alumno.a_paterno | apellidoCap}}
    </v-chip>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            alumno: [],
            reserva: []
        }
    },
    props:['id_laptop'],
    created(){
        this.buscarReserva(this.id_laptop);
    },
    methods:{
        buscarAlumno(codigo){
            axios.get("http://localhost/apireserva/v1/usuarios/"+codigo,
            {headers: { 'content-type': 'application/form-data' }})
            .then(response => {
                this.alumno = response.data[0];
                // eslint-disable-next-line 
                //console.log(this.alumno);              
            })
            .catch(e => {
                this.errors.push(e);
                
            })
        },
        buscarReserva(id_laptop){
            axios.get("http://localhost/apireserva/v1/reservas/" + id_laptop,
                {headers: {'content-type': 'application/form-data'}})
                .then(response =>{
                    this.reserva = response.data[0];
                    // eslint-disable-next-line 
                    //console.log(this.reserva);
                    this.$emit('enviarReserva',this.reserva);
                    this.buscarAlumno(this.reserva.codigo);
                })
                .catch(e =>{
                    this.errors.push(e);
                });
        }
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
        }
    }
}
</script>

