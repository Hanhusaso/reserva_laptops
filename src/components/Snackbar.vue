<template>
    <v-snackbar
      v-model="data.estado"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
      :color="data.color"
    >
      {{ this.data.mensaje }}
      <v-btn
        color="white"
        flat
        @click="cerrarAlerta"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    props: ['data'],
    data(){
      return{
        y: 'top',
        x: 'center',
        mode: '',
        timeout: 3000,
        text: ''
      }
    },
    methods:{
      cerrarAlerta(){
        this.data.estado=false;
        //console.log(this.data.estadoReserva);       
      }
    }
}
</script>

