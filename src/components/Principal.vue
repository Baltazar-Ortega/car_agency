<template>

  <v-container>
    <v-row>
      <v-col xs="12" sm="12" md="5">
        <v-subheader>Precio</v-subheader>
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



      <v-col >
        <v-row>
          <v-card v-for="auto in autosFiltrados" :key="auto.id" class="mx-auto mb-4" cols="6">
          <v-img :src="auto.imagen"  />
          <v-card-title>Modelo: {{ auto.modelo }}</v-card-title>
          <v-card-subtitle>Fabricante: {{ auto.fabricante }} </v-card-subtitle>
            <v-card-text>
              <p>Año: {{ auto.anio }}</p>
              <p>Precio: {{ auto.precio }} </p>
              <p>Kilometraje: {{ auto.kilometraje }} </p>
            </v-card-text>
          </v-card>
        </v-row>
        
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
      autos: new Array<any>(),
      autosFiltrados: new Array<any>(),
      min: 50000,
      max: 300000,
      slider: 40,
      range: [50000, 300000], // range que puso el usuario
    }
  },
  created: function() {
    // const autos = axios.get('http://localhost:3000/cars.json', {
    //   headers: { 'Content-Type': 'application/json' }
    // }).then(res => {
    //   this.autos = res.data
    //   console.log("res", res)
    // }).catch(error => console.log("error", error))
    const carros: any = [
        {modelo: 'civic', fabricante: 'honda', anio: 2000, precio: 50000, kilometraje: 450000, imagen: '/assets/civic.jpg'},
        {modelo: 'sentra', fabricante: 'Nissan', anio: 2005, precio: 70000, kilometraje: 350000, imagen: '/assets/sentra.jpg'},
        {modelo: 'aveo', fabricante: 'Chevrolet', anio: 2008, precio: 85000, kilometraje: 450000, imagen: '/assets/aveo.jpg'},
        {modelo: 'wrangler', fabricante: 'Jeep', anio: 2010, precio: 120000, kilometraje: 250000, imagen: '/assets/wrangler.jpg'},
        {modelo: 'f40', fabricante: 'Ferrari', anio: 2015, precio: 150000, kilometraje: 150000, imagen: '/assets/f40.jpg'},
        {modelo: 'a4', fabricante: 'Audi', anio: 2015, precio: 220000, kilometraje: 15000, imagen: '/assets/a4.jpg'},
        {modelo: 'huracan', fabricante: 'Lamborghini', anio: 2019, precio: 270500, kilometraje: 1000, imagen: '/assets/huracan.jpg'}
      ]
    this.autos = carros
    this.autosFiltrados = carros
  },
  methods: {
    cambioRangoPrecio: function(event: Event){
      console.log("Entra a evento")
      // console.log("ocurrió cambio: ", event) // object
      //console.log(this.range)
      const autosFiltradosPrecio = this.autos.filter(auto => this.range[0] <= auto.precio && auto.precio <= this.range[1] )
      // console.log("autoFiltradosPrecio: ", autosFiltradosPrecio[0]['modelo'])
      // console.log("autoFiltradosPrecio: ", typeof(autosFiltradosPrecio[0])) object
      
      console.log("Anteriores autos", this.autosFiltrados)
      this.autosFiltrados = Object.values(autosFiltradosPrecio)
      console.log("Nuevos autos: ", this.autosFiltrados)
      
      //console.log("Original: ", this.autos[4])
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-slider__track-background.primary.lighten-3 {
  background-color: black !important;
}
</style>
