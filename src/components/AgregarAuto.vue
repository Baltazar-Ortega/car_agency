<template>
  <div class="formulario">
    <form id="formAgregar" @submit.prevent="agregar" enctype="multipart/form-data">
        <label for="name">Nombre: </label>
        <input type="text" />
        <label for="manufacturer">Fabricante: </label>
        <input type="text" />
        <input type="submit" value="Enviar" />
    </form>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue';

export default Vue.extend({
  name: 'AgregarAuto',
  data: function() {
    return {
    }
  },
  methods: {
      agregar: function() {
          const form = <HTMLFormElement> document.getElementById('formAgregar')
          axios.post('http://localhost:3000/cars', new FormData(form)).then(res => {
              console.log("res", res)
          }).catch(err => {
              console.log("error", err)
          })
          alert("Enviado")
      },
      
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>