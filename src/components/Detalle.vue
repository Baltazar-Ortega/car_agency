<template>

  <v-container>
    <v-row>
        <v-col>
            <v-img :src="auto.imagen"  />
        </v-col>
      <v-col >
         <v-card  class="mx-auto mb-4" cols="6">
            <v-card-title class="display-1 mb-3">{{ auto.modelo }}</v-card-title>
            <v-card-subtitle>{{ auto.fabricante }} </v-card-subtitle>
            <v-card-text>
                <p>Año: {{ auto.anio }}</p>
                <p>Kilometraje: {{ auto.kilometraje }} </p>
                <p class="title mb-0">Precio: <span class="red--text">$ {{ auto.precio }}</span> </p>
            </v-card-text>
        </v-card>     
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from 'vue';

export default Vue.extend({
  name: 'Detalle',
  props: {
      id: {
          type: Number
      }
  },
  data: function() {
    return {
        auto: {},
        idRecibido: parseInt(this.$route.params.id)
    }
  },
  created: function() {
      const carros: {id:Number, modelo: String, fabricante: String, anio: Number, precio: Number, kilometraje: Number, imagen: String}[] = [
        {id: 1, modelo: 'vocho', fabricante: 'Volkswagen', anio: 2002, precio: 250000, kilometraje: 450000, imagen: '/assets/vocho.jpg'},
        {id: 2, modelo: 'civic', fabricante: 'honda', anio: 2000, precio: 50000, kilometraje: 450000, imagen: '/assets/civic.jpg'},
        {id: 3, modelo: 'sentra', fabricante: 'Nissan', anio: 2005, precio: 70000, kilometraje: 350000, imagen: '/assets/sentra.jpg'},
        {id: 4, modelo: 'aveo', fabricante: 'Chevrolet', anio: 2008, precio: 85000, kilometraje: 450000, imagen: '/assets/aveo.jpg'},
        {id: 5, modelo: 'wrangler', fabricante: 'Jeep', anio: 2010, precio: 120000, kilometraje: 250000, imagen: '/assets/wrangler.jpg'},
        {id: 6, modelo: 'f40', fabricante: 'Ferrari', anio: 2015, precio: 150000, kilometraje: 150000, imagen: '/assets/f40.jpg'},
        {id: 7, modelo: 'a4', fabricante: 'Audi', anio: 2017, precio: 220000, kilometraje: 15000, imagen: '/assets/a4.jpg'},
        {id: 8, modelo: 'huracan', fabricante: 'Lamborghini', anio: 2019, precio: 270500, kilometraje: 1000, imagen: '/assets/huracan.jpg'}
      ]
      console.log("id recibido: ", this.idRecibido)
      this.auto = carros.filter(auto => auto.id === this.idRecibido)[0]
  },
  methods: {
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-slider__track-background.primary.lighten-3 {
  background-color: black !important;
}
</style>