<template>
  <v-container class="contenedor">
    <NavBar v-if="navbar" />
    <turing-header v-else />
    <router-view :class="{'container-main':navbar}"></router-view>
  </v-container>
</template>

<script>
import NavBar from "@/components/Navbar";
import TuringHeader from "@/components/TuringHeader";

export default {
  name: "App",
  components: {
    NavBar,
    TuringHeader
  },
  data() {
    return {
      navbar: true
    };
  },
  created() {
    this.vistaNavbar();
  },
  methods: {
    vistaNavbar() {
      if (
        this.$route.path == "/login" ||
        this.$route.path == "/vistaGeneral" ||
        this.$route.path == "/vistaAdministrador"
      ) {
        this.navbar = false;
      } else {
        this.navbar = true;
      }
    }
  },
  beforeUpdate() {
    this.vistaNavbar();
  },
  updated() {
    this.vistaNavbar();
  }
};
</script>

<style>
.contenedor {
  padding: 0px;
  margin: 0;
  max-width: 100%;
}

.container-main {
  margin-top: 60px;
}
</style>


