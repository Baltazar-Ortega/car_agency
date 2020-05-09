<template>

  <v-container>
    <v-row>
      <v-col xs="12" sm="12" md="5">
        <h1 class="display-1 dark--text">Filtros</h1>
        <div>
          <v-subheader>Precio</v-subheader>
          
            <v-row>
              <v-col class="px-4">
                <v-range-slider
                  v-model="rangoPrecio"
                  :max="maxPrecio"
                  :min="minPrecio"
                  hide-details
                  class="align-center"
                  color="red darken-4"
                  @change="cambioRangos"
                >
                  <template v-slot:prepend>
                    <v-text-field
                      :value="rangoPrecio[0]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(rangoPrecio, 0, $event)"
                    ></v-text-field>
                  </template>
                  <template v-slot:append>
                    <v-text-field
                      :value="rangoPrecio[1]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(rangoPrecio, 1, $event)"
                    ></v-text-field>
                  </template>
                </v-range-slider>
              </v-col>
            </v-row>
         
        </div>

        <div>
          <v-subheader>Año</v-subheader>
          
            <v-row>
              <v-col class="px-4">
                <v-range-slider
                  v-model="rangoAnio"
                  :max="maxAnio"
                  :min="minAnio"
                  hide-details
                  class="align-center"
                  color="red darken-4"
                  @change="cambioRangos"
                >
                  <template v-slot:prepend>
                    <v-text-field
                      :value="rangoAnio[0]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(rangoAnio, 0, $event)"
                    ></v-text-field>
                  </template>
                  <template v-slot:append>
                    <v-text-field
                      :value="rangoAnio[1]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(rangoAnio, 1, $event)"
                    ></v-text-field>
                  </template>
                </v-range-slider>
              </v-col>
            </v-row>
         
        </div>

        <div>
          <v-subheader>Kilometraje</v-subheader>
          
            <v-row>
              <v-col class="px-4">
                <v-range-slider
                  v-model="rangoKm"
                  :max="maxKm"
                  :min="minKm"
                  hide-details
                  class="align-center"
                  color="red darken-4"
                  @change="cambioRangos"
                >
                  <template v-slot:prepend>
                    <v-text-field
                      :value="rangoKm[0]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(rangoKm, 0, $event)"
                    ></v-text-field>
                  </template>
                  <template v-slot:append>
                    <v-text-field
                      :value="rangoKm[1]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(rangoKm, 1, $event)"
                    ></v-text-field>
                  </template>
                </v-range-slider>
              </v-col>
            </v-row>
         
        </div>
        
        <v-select v-model="color" :items="colors" label="Color" name="color" @change="seleccionarColor" class="mt-3"></v-select>

        <v-select v-model="usadoString" :items="usados" label="Usado" name="usado" @change="seleccionarUsado" class="mt-3"></v-select>

        <v-select v-model="transmision" :items="transmisiones" label="Transmision" name="transmision" @change="seleccionarTransmision" class="mt-3"></v-select>

      </v-col>



      <v-col >
        <v-row>

          <router-link :to="{ name: 'Detalle', params: {id: auto.id } }"  v-for="auto in autosFiltrados" :key="auto.id" class="mx-auto mb-4" cols="6">
            <v-card >
              <img :src="auto.imagen" style="width: 290px; height: 210px;" />
              <v-card-title class="display-1">{{ auto.modelo }}</v-card-title>
              <v-card-subtitle>
                <v-chip
                  class="mt-1"
                  color="red"
                  label
                  text-color="white"
                >
                  <v-icon left>mdi-label</v-icon>
                  {{ auto.fabricante }} 
                </v-chip>
              </v-card-subtitle>
                <v-card-text>
                  <p> <strong> Año: </strong> {{ auto.anio }}</p>
                  <p> <strong> Kilometraje: </strong> {{ auto.kilometraje }} </p>
                  <p class="title mb-0">Precio: <span class="red--text">$ {{ auto.precio }}</span> </p>
                </v-card-text>
              </v-card>
          </router-link>

          

        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable */
import axios from 'axios'
import Vue from 'vue';

export default Vue.extend({
  name: 'Principal',
  data: function() {
    return {
      autos: new Array<any>(),
      autosFiltrados: new Array<any>(),
      slider: 40,
      minPrecio: 50000,
      maxPrecio: 300000,
      rangoPrecio: [50000, 300000], // range que puso el usuario
      minAnio: 2000,
      maxAnio: 2021,
      rangoAnio: [2000, 2021],
      minKm: 0,
      maxKm: 500000,
      rangoKm: [0, 500000],
      color: '' as String,
      colors: [
            'Rojo',
            'Negro',
            'Gris',
            'Blanco',
            'Otro',
      ],
      usadoString: '',
      usados: ['Usado', 'Nuevo'],
      usado: 0,
      transmision: '' as String,
      transmisiones: [
            'Estandar',
            'Automatico'
      ],
      // config
      apiUrl: 'https://cryptic-brook-62567.herokuapp.com'
    }
  },
  created: function() {
    const autos = axios.get(`${this.apiUrl}/automovils.json`, {
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      this.autos = res.data
      this.autosFiltrados = res.data
    }).catch(error => console.log("error", error))
  },
  methods: {
    cambioRangos: function(){
      let autosFiltrados = this.autos.filter(
        auto => this.rangoPrecio[0] <= auto.precio && 
        auto.precio <= this.rangoPrecio[1] &&
        this.rangoAnio[0] <= auto.anio && 
        auto.anio <= this.rangoAnio[1] && 
        this.rangoKm[0] <= auto.kilometraje && 
        auto.kilometraje <= this.rangoKm[1])
      this.autosFiltrados = Object.values(autosFiltrados)
    },
    seleccionarColor: function(color: String) {

      // this.color = color
      const autos = axios.get(`${this.apiUrl}/color/${color}.json`, {
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {

          const autosRes: any[] = res.data 
          // Deben cumplir con el usado/nuevo
          let autos;

          if(this.usadoString){
            autos = autosRes.filter(auto => auto.usado == this.usado)
            if(this.transmision) {
              autos = autos.filter(auto => auto.transmision == this.transmision)
            }
          } else {
            autos = autosRes
          }
          

          this.autos = autos
          this.autosFiltrados = autos
          // console.log("res", res.data)
          this.cambioRangos()
        }).catch(error => console.log("error", error))
    },
    seleccionarUsado: function(usado: String) {
      this.usado = this.usadoNumero

      const url = `${this.apiUrl}/usado/${this.usado}.json`
      const autos = axios.get(url, {
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {

          const autosRes: any[] = res.data
          let autos;
          if(this.color) {
            autos = autosRes.filter(auto => auto.color == this.color)
            if(this.transmision) {
              autos = autos.filter(auto => auto.transmision == this.transmision)
            }
          } else {
            autos = autosRes
          }
          
          this.autos = autos
          this.autosFiltrados = autos
          // console.log("res", res.data)
          this.cambioRangos()
        }).catch(error => console.log("error", error))
      
    },
    seleccionarTransmision: function(transmision: String) {
      const autos = axios.get(`${this.apiUrl}/transmision/${transmision}.json`, {
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {

          const autosRes: any[] = res.data 
          // Deben cumplir con el usado/nuevo
          let autos;

          if(this.usadoString){
            autos = autosRes.filter(auto => auto.usado == this.usado)
            if (this.color) {
              autos = autos.filter(auto => auto.color == this.color)
            }
          } else {
            autos = autosRes
          }
          

          this.autos = autos
          this.autosFiltrados = autos
          // console.log("res", res.data)
          this.cambioRangos()
        }).catch(error => console.log("error", error))
    }
  },
  computed: {
    usadoNumero: function() {
      if (this.usadoString == 'Usado') {
              return 1
          } else {
              return 0
          }
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
