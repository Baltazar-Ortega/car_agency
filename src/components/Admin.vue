<template>
  <div class="about">
    <h1>Administracion</h1>
    <div v-if="valor">
        <AgregarAuto />
    </div>
    <button v-if="btnAgregar" v-on:click="agregarAuto">Agregar Auto</button>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import AgregarAuto from './AgregarAuto.vue'

export default Vue.extend({
  name: 'Admin',
  data: function() {
    return {
      valor: false,
      btnAgregar: true
    }
  },
  methods: {
      agregarAuto: function() {
          this.valor = true;
          this.btnAgregar = false
      }
  },
  components: {
      AgregarAuto
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>