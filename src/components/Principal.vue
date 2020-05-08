<template>
  <div class="hello">
    <h1>Agencia Orenday</h1>

    <div v-for="auto in autos" :key="auto.id" class="auto">
        <p>{{ auto.modelo }}</p>
        <p> {{ auto.fabricante }} </p>
        <p>{{ auto.anio }}</p>
        <p> {{ auto.precio }} </p>
        <p> {{ auto.kilometraje }} </p>
        <img src="@/assets/honda.jpg" >
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue';

export default Vue.extend({
  name: 'Principal',
  data: function() {
    return {
      autos: [
        {modelo: 'Civic', fabricante: 'Honda', anio: 2000, precio: 50000, kilometraje: 450000},
        {modelo: 'Civic2', fabricante: 'Honda2', anio: 2005, precio: 70000, kilometraje: 350000},
        {modelo: 'Civic3', fabricante: 'Honda3', anio: 2010, precio: 120000, kilometraje: 250000},
        {modelo: 'Civic4', fabricante: 'Honda4', anio: 2015, precio: 150000, kilometraje: 150000}
      ]
    }
  },
  created() {
    // const autos = axios.get('http://localhost:3000/cars.json', {
    //   headers: { 'Content-Type': 'application/json' }
    // }).then(res => {
    //   this.autos = res.data
    //   console.log("res", res)
    // }).catch(error => console.log("error", error))
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auto {
  width: 300px;
  border: 2px dotted red;
}
</style>
