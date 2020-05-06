<template>
  <div class="hello">
    <h1>Agencia Orenday</h1>
    <ol>
      <li v-for="auto in autos" :key="auto.nombre" >
        {{ auto.name }}
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue';

export default Vue.extend({
  name: 'Principal',
  data: function() {
    return {
      autos: []
    }
  },
  created() {
    const autos = axios.get('http://localhost:3000/cars.json', {
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      this.autos = res.data
      console.log("res", res)
    }).catch(error => console.log("error", error))
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
