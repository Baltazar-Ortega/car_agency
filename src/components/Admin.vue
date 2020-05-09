<template>
  <v-container>
    <h1 class="display-1 mt-3 mb-5">Administracion</h1>

    <v-row>
      <router-link to="/consultasStock" >
        <v-btn class="ma-2 mb-5" outlined color="indigo">Consultas de Stock</v-btn>
      </router-link>
    </v-row>

    <v-row>
      <router-link to="/consultasClientes" >
        <v-btn class="ma-2 mb-5" outlined color="indigo">Consultas de Clientes</v-btn>
      </router-link>
    </v-row>

    <v-row>
      <router-link to="/agregar" >
        <v-btn class="ma-2 mb-5" outlined color="success">Agregar Auto</v-btn>
      </router-link>
    </v-row>

    <v-row>
      <router-link to="/buscarAuto"  > 
        <v-btn class="ma-2 mb-5" outlined color="orange">Buscar auto</v-btn>
      </router-link>
    </v-row>
    
  </v-container>
</template>

<script lang="ts">

import Vue from 'vue';

export default Vue.extend({
  name: 'Admin',
  data: function() {
    return {
    }
  },
  methods: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>