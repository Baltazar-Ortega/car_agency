<template>

  <v-container>
    <v-row>
        <v-col>
            <v-img :src="auto.imagen" style="width: 600px;" />
        </v-col>
        <v-col >
          <v-card  class="mx-auto mb-4" cols="6">
              <v-card-title class="display-1 mb-3">{{ auto.modelo }}</v-card-title>
              <v-card-subtitle>
                <v-chip
                  
                  color="red"
                  label
                  text-color="white"
                >
                  <v-icon left>mdi-label</v-icon>
                  {{ auto.fabricante }} 
                </v-chip>
                <v-chip
                  class="ml-2"
                  color="blue"
                  label
                  text-color="white"
                >
                  <v-icon left>mdi-label</v-icon>
                  {{ usadoPalabra }}
                </v-chip>
              </v-card-subtitle>
              
              <v-card-text>
                  <p class="title mb-3">Precio: <span class="red--text">$ {{ auto.precio }}</span> </p>
                  <p> <strong> Año: </strong> {{ auto.anio }}</p>
                  <p><strong> Kilometraje: </strong> {{ auto.kilometraje }} </p>
                  <p><strong> Color: </strong> {{ auto.color }}</p>
                  <p><strong> Tipo: </strong> {{auto.tipo}}</p>
                  <p><strong> Transmision: </strong> {{auto.transmision}}</p>
                  <p><strong> </strong>  </p>
                  <p><strong> Propietarios: </strong> {{auto.propietarios}}</p>
              </v-card-text>
          </v-card>     
         </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable */
import axios from 'axios'
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
        auto: {} as any,
        idRecibido: parseInt(this.$route.params.id)
    }
  },
  created: function() {
    const autos = axios.get(`https://cryptic-brook-62567.herokuapp.com/automovils/${this.idRecibido}.json`, {
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      console.log("res: ", res)
      this.auto = res.data
    }).catch(error => console.log("error", error))
      console.log("id recibido: ", this.idRecibido)
  },
  computed: {
    usadoPalabra: function(){
      if (this.auto.usado == 1) {
        return 'Usado'
      } else {
        return 'Nuevo'
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