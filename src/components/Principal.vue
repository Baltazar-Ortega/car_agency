<template>
  <div class="hello">
    <h1>Agencia Orenday</h1>

    <div v-for="auto in autos" :key="auto.id" class="auto">
        <p>{{ auto.name }}</p>
        <p> {{ auto.manufacturer }} </p>
        <img :src="auto.picture" >
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
.auto {
  height: 300px;
  width: 300px;
  border: 2px dotted red;
}
</style>
