<template>
        <div>
        <i class="far fa-clock"></i>&nbsp;&nbsp;{{this.horas}}:{{this.minutos}}:{{this.segundos}}
        </div>
</template>

<script>
export default {
    name: 'Reloj',
    props:['horaRecibida'],
    data(){
        return{
            pintado : false,
            segundos: '00',
            minutos: '00',
            horas: '00'
        }
    },
    created(){
        var v = this;
        const second = 1000,
        minute = second * 60,
        hour = minute * 60;

        let horaSalida = new Date(Date.parse( new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate() + " " + this.horaRecibida));        
        let horaIngreso = new Date(Date.parse( new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate() + " " + this.horaRecibida));        
        
        horaSalida.setHours(horaSalida.getHours()+24);
        horaSalida = horaSalida.getTime();
        // eslint-disable-next-line

        if (horaSalida > new Date().getTime()) {
            let x = setInterval(function() {
                let now = new Date().getTime();//hora actual
                let distance = now - horaIngreso;
                v.horas = '0' + Math.floor((distance) / (hour));
                
                
                v.minutos = Math.floor((distance % (hour)) / (minute));

                if (v.minutos <10) {
                    v.minutos = '0' + Math.floor((distance % (hour)) / (minute));
                }

                v.segundos = Math.floor((distance % (minute)) / (second));

                if (v.segundos < 10) {
                    v.segundos = '0' + Math.floor((distance % (minute)) / (second));
                }

                if (v.horas>=1 && v.minutos>=34) {
                    this.pintado=true;
                    v.enviardatos(this.pintado);
                    //console.log(this.pintado);
                    // console.log("aeaeaeaeaeaea");
                    //this.$emit('recibir',this.pintado);

                  
                    
                } 
                           
            }, second)   
        }

    },

    methods: {
        enviardatos(pintado){
            this.$emit('recibir',pintado);
            
        }
    }
}
</script>

