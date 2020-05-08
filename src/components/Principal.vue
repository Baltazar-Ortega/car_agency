<template>

  <v-container>
    <v-row>
      <v-col cols="6">
        <v-subheader> Precio</v-subheader>

        <v-card-text>
          <v-row>
            <v-col class="px-4">
              <v-range-slider
                v-model="range"
                :max="max"
                :min="min"
                hide-details
                class="align-center"
                color="red darken-4"
                @change="cambioRangoPrecio"
              >
                <template v-slot:prepend>
                  <v-text-field
                    :value="range[0]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="$set(range, 0, $event)"
                  ></v-text-field>
                </template>
                <template v-slot:append>
                  <v-text-field
                    :value="range[1]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="$set(range, 1, $event)"
                  ></v-text-field>
                </template>
              </v-range-slider>
            </v-col>
          </v-row>
        </v-card-text>

      </v-col>



      <v-col cols="6">
        <v-card v-for="auto in autos" :key="auto.id" class="mx-auto mb-4">
          <v-card-title>Modelo: {{ auto.modelo }}</v-card-title>
          <v-card-subtitle>Fabricante: {{ auto.fabricante }} </v-card-subtitle>
            <v-card-text>
              <p>Año: {{ auto.anio }}</p>
              <p>Precio: {{ auto.precio }} </p>
              <p>Kilometraje: {{ auto.kilometraje }} </p>
            </v-card-text>
            
          <v-img
            height="250"
            src="@/assets/honda.jpg"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
        {modelo: 'Civic4', fabricante: 'Honda4', anio: 2015, precio: 150000, kilometraje: 150000},
        {modelo: 'Civic5', fabricante: 'Honda5', anio: 2015, precio: 150000, kilometraje: 15000},
        {modelo: 'Civic6', fabricante: 'Honda6', anio: 2019, precio: 250500, kilometraje: 1000}
      ],
      min: 50000,
      max: 500000,
      slider: 40,
      range: [70000, 250000], // range que puso el usuario
    }
  },
  methods: {
    cambioRangoPrecio: function(event: Event){
      console.log("ocurrió cambio: ", event)
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
.v-slider__track-background.primary.lighten-3 {
  background-color: black !important;
}
</style>
