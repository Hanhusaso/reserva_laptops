<template>
<v-app>
    <v-container fluid fill-height>
        <v-layout justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-4">
                    <v-card-title class="justify-center">
                        <h1>Sistema de Reserva de Laptops</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-alert
                        v-model="alert"
                        dismissible
                        type="warning"
                        transition="scale-transition"
                        >
                        Usuario o contraseña inválido.
                        </v-alert>
                        <v-form @submit="ingresar">
                            <v-text-field name="username" label="Usuario" 
                                        type="text" required :append-icon="'person'" 
                                        v-model="username"
                                        :rules="usernameRules"
                                        >
                            </v-text-field>
                            <v-text-field name="password" label="Contraseña" 
                                        type="password" required :append-icon="'lock'" 
                                        v-model="password" :rules="passwordRules">
                            </v-text-field>
                            <br>
                            <v-btn type="submit" block class="white--text" color="blue" @click="ingresar" >
                                Ingresar
                            </v-btn>
                        </v-form>
                    </v-card-text>
                    <br>      
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</v-app>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios';

export default {
    name: "login",
    data(){
        return{
            alert: false,
            username: "",
            usernameRules: [
                v => !!v || 'Ingrese un nombre de usuario'
            ],
            password: "",
            passwordRules: [
                v => !!v || 'Se requiere la contraseña'
            ]
        }
    },
    created(){
        //console.log(this.$route.path);
        
    },
    computed:{
    },
    methods:{
        ...mapMutations(['actualizarUsuario']),
        ingresar(e){
            e.preventDefault(); //cancela la acción o respuesta por defecto
            if (this.username == "" || this.password == "") {
                this.alert = true;
            }else{
                axios.get("http://localhost/apireserva/v1/empleados/"+this.username+"/"+this.password,
                {headers: { 'content-type': 'application/form-data' }})
                .then(response => {
                    //console.log(response.data.length);

                    if (response.data.length == 0) {
                        this.alert = true;
                    }else{
                        //console.log(response.data);
                        
                        //variable local
                        let usuario = {         
                            cargo: "Administrador",
                            nombre: response.data[0].nombres,
                            a_paterno: response.data[0].a_paterno,
                            username: response.data[0].usuario
                        }
                        //guarda en variable global-->store.js
                        this.actualizarUsuario(usuario);
                        //redirecciona a inicio    
                        this.$router.push('/');
                    }
                })
                .catch(e => {
                    // eslint-disable-next-line 
                    console.log(e);
                    this.alert = true;    
                })
            }
        }
    }
}
</script>




