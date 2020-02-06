<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="laptop in laptops" :key="laptop.id" xs8 sm6 md4 lg3 xl2>
        <v-card
          class="card-yellow"
          :class="[{'alerta': laptop.alerta}, laptop.estado == 'Ocupado' ? 'disabled' : '']"
        >
          <v-card-text>
            <v-container class="align-center">
              <h3 class="headline mb-0">{{laptop.nombre}}</h3>
              <BuscarAlumno
                v-if="laptop.estado=='Ocupado'"
                :id_laptop="laptop.id"
                @enviarReserva="recibirReserva($event,laptop)"
              />
              <v-chip v-if="laptop.estado=='Disponible'" color="green" text-color="white">
                <i class="fas fa-user"></i>
                &nbsp;&nbsp;{{laptop.estado}}
              </v-chip>
              <v-chip v-else color="orange" text-color="white">
                <i class="fas fa-user-alt-slash"></i>
                &nbsp;&nbsp;{{laptop.estado}}
              </v-chip>
              <div v-if="laptop.estado=='Ocupado' && laptop.reserva">
                <Cronometro
                  :horaRecibida="laptop.reserva.hora_ingreso"
                  @alertaTiempo="alertaTiempo($event,laptop)"
                  @tiempoAcabado="tiempoAcabado($event,laptop)"
                />
              </div>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container class="align-center">
              <v-btn
                color="red"
                @click="mostrarLiberar(laptop.nombre,laptop.reserva)"
                :disabled="laptopDisponible(laptop.estado)"
              >Liberar</v-btn>
              <v-btn
                color="blue"
                @click="mostrarModal(laptop.nombre,laptop.id)"
                :disabled="!laptopDisponible(laptop.estado)"
              >Reservar</v-btn>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout></v-layout>

    <DialogReserva
      :solicitudCodigo="estadoDialog"
      :nombre_laptop="nombre_laptop"
      :id_laptop="id_laptop"
      @cambiarEstado="cambiarEstadoReserva"
    />
    <DialogLiberar
      :solicitudCodigo="estadoLiberar"
      :nombre_laptop="nombre_laptop"
      :reserva="reserva"
      @cambiarEstado="cambiarEstadoLiberar"
    />
  </v-container>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";
import Cronometro from "@/components/Cronometro";
import BuscarAlumno from "@/components/BuscarAlumno";
import DialogReserva from "@/components/DialogReserva";
import DialogLiberar from "@/components/DialogLiberar";

import { mapState } from "vuex";

export default {
  name: "vistaAdministrador",
  components: {
    Cronometro,
    BuscarAlumno,
    DialogReserva,
    DialogLiberar
  },

  data() {
    return {
      laptops: [],
      estadoAlerta: false,
      estadoDialog: false,
      estadoLiberar: false,
      nombre_laptop: "",
      id_laptop: "",
      reserva: "",
      dataLiberar: {
        estado: "",
        id_laptop: ""
      },
      socket: io("localhost:3001")
    };
  },
  computed: {
    ...mapState(["usuario"])
  },
  methods: {
    mostrarLaptops() {
      axios
        .get("http://localhost/apireserva/v1/laptops", {
          headers: { "content-type": "application/form-data" }
        })
        .then(response => {
          this.laptops = response.data;
          this.asignarAlerta();
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    recibirReserva(e, laptop) {
      this.laptops.forEach(element => {
        if (element.id == laptop.id) {
          this.$set(element, "reserva", e);
        }
      });
    },
    mostrarModal(nombre_laptop, id_laptop) {
      this.estadoDialog = true;
      this.nombre_laptop = nombre_laptop;
      this.id_laptop = id_laptop;
    },
    mostrarLiberar(nombre_laptop, reserva) {
      this.estadoLiberar = true;
      this.nombre_laptop = nombre_laptop;
      this.reserva = reserva;
    },
    cambiarEstadoReserva(e) {
      if (e.id_laptop == "") {
        this.estadoDialog = e.estado;
      } else {
        this.estadoDialog = e.estado;
        this.estadoAlerta = true;
        this.socket.emit("ENVIAR_RESERVA", e);
        this.laptops.forEach(laptops => {
          if (laptops.id == e.id_laptop) {
            this.socket.emit("ENVIAR_ALUMNO", laptops);
          }
        });
      }
    },
    cambiarEstadoLiberar(e) {
      if (e.id_laptop == "") {
        this.estadoLiberar = e.estado;
      } else {
        this.estadoLiberar = e.estado;
        this.socket.emit("LIBERAR_RESERVA", e);
        this.laptops.forEach(laptops => {
          if (laptops.id == e.id_laptop) {
            this.socket.emit("LIBERAR_ALUMNO", laptops);
          }
        });
      }
    },
    laptopDisponible(estado) {
      if (estado == "Ocupado") {
        return false;
      } else {
        return true;
      }
    },
    alertaTiempo(e, laptop) {
      this.laptops.forEach(element => {
        //Pone atributo alerta a todas las laptops
        if (element.id == laptop.id) {
          element.alerta = e;
        }
      });
    },
    tiempoAcabado(e, laptop) {
      axios
        .put(
          "http://localhost/apireserva/v1/reservas/" +
            laptop.reserva.id +
            "/" +
            laptop.reserva.codigo,
          {},
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(response => {
          (this.dataLiberar.estado = this.laptopDisponible(laptop.estado)),
            (this.dataLiberar.id_laptop = laptop.id);
          if (this.dataLiberar.id_laptop == "") {
            this.estadoLiberar = this.dataLiberar.estado;
          } else {
            this.estadoLiberar = this.dataLiberar.estado;
            this.socket.emit("LIBERAR_RESERVA", this.dataLiberar);
            this.laptops.forEach(laptops => {
              if (laptops.id == this.dataLiberar.id_laptop) {
                this.socket.emit("LIBERAR_ALUMNO", laptops);
              }
            });
          }
        })
        .catch(function(error) {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    asignarAlerta() {
      this.laptops.forEach(laptop => {
        this.$set(laptop, "alerta", false);
      });
    }
  },
  mounted() {
    this.mostrarLaptops();

    this.socket.on("MENSAJE_RESERVA", data => {
      this.laptops.map(function(laptop) {
        if (laptop.id == data.id_laptop) {
          laptop.estado = "Ocupado";
        }
      });
    });

    this.socket.on("MENSAJE_LIBERAR", data => {
      console.log("En MENSAJE_LIBERAR", data);
      this.laptops.map(function(laptop) {
        if (laptop.id == data.id_laptop) {
          laptop.estado = "Disponible";
          laptop.reserva = "";
          laptop.alerta = false;
        }
      });
    });
  }
};
</script>

<style>
.iconoInicio {
  font-size: 110px;
  color: #607d8b;
}
.alerta {
  background: #ff7474 !important;
}

.v-card {
  transition: background-color 0.8s linear 0.4s;
}

.v-card.card-yellow {
  background-color: #ddaa2a;
}

.v-card.disabled {
  background-color: #fff3d5;
}
</style>