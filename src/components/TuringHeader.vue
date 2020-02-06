<template>
  <div class="t-header container-fluid">
    <div class="t-header-size mx-auto">
      <div class="header-grid">
        <div class="container-img">
          <img class="pr-4 pr-sm-4" src="@/assets/unmsm_blanco-min.png" alt="UNMSM" />
        </div>
        <div class="h-100 d-flex align-items-center">
          <div class="text-white border-0 pl-4 py-2 cont-title-header">
            <h1 class="mb-0 text-uppercase">Sistema Turing</h1>
            <p class="mb-0">Autoservicio en el préstamo de laptops y computadoras</p>
          </div>
        </div>

        <div class>
          <div class="container-img d-flex align-items-center justify-content-between">
            <div title="SISBIB" class="h-100">
              <img src="@/assets/bibcentral_blanco-min.png" alt="SISBIB" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TuringHeader"
};
</script>

<style>
.header-grid {
  position: relative;
  height: 100%;
  width: auto;
  display: grid;
  grid-template-columns: 0fr auto 0fr;
}

.t-header {
  height: 12vmin;
  background-color: #232323;
  transition: background-color 0.3s;
}

.t-header-size {
  width: 81%;
  height: 100%;
}

.container-img {
  position: relative;
  height: 12vmin;
  width: fit-content;
}

.container-img img {
  height: 100%;
  width: auto;
  padding: 1.9vmin;
}

.container-img img[alt="SISBIB"] {
  padding: 2.5vmin 1.9vmin;
}

.cont-title-header {
  text-shadow: 3px 0px 3px #000;
  position: relative;
}

.cont-title-header:after {
  content: "";
  position: absolute;
  top: 0;
  left: -2.5px;
  height: 100%;
  width: 5px;
  border-radius: 50px;
  background: #c8a22b;
}

.cont-title-header > h1 {
  font-size: 2.7vmin;
  font-family: Gill Sans MT;
}

.cont-title-header > p {
  font-size: 1.8vmin;
}
</style>