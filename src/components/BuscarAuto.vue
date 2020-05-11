<template>
    <v-container>
        <h1 class="display-1 mt-3 mb-5">Buscar Auto</h1>
        <v-text-field
            v-model="modeloABuscar"
            label="Modelo"
            name="modelo"
            type="text"
        ></v-text-field>
        <v-btn color="success" class="mt-4" @click="buscarModelo">
            Buscar
        </v-btn>

        <v-card
                    class="mt-3"
                    color="red"
                    dark
                    max-width="400"
                    v-if="noEncontrado"
                >
                    <v-card-title>Error
                    </v-card-title>

                    <v-card-text class="headline font-weight-bold">
                        No hay un auto con esas caracteristicas
                    </v-card-text>

                </v-card>

        <v-list subheader v-if="autoEncontrado && !eliminado">
          <v-subheader>Autos encontrados</v-subheader>

          <v-list-item
            v-for="auto in autos"
            :key="auto.id"
          >
            <v-list-item-avatar>
              <v-img :src="auto.imagen"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="auto.modelo"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <strong> Fabricante: </strong> {{ auto.fabricante }}
            </v-list-item-content>
            <v-list-item-content>
              <strong> Año:</strong> {{ auto.anio }}
            </v-list-item-content>
            <v-list-item-content>
              <strong> Kilometraje:</strong> {{ auto.kilometraje }}
            </v-list-item-content>
            <v-list-item-content>
              <strong> Usado:</strong> {{ stringUsado(auto.usado) }}
            </v-list-item-content>
            <v-list-item-content>
              <strong> Transmision:</strong> {{ auto.transmision }}
            </v-list-item-content>
            <v-list-item-content color="red">
              <strong> Precio:</strong> {{ auto.precio }}
            </v-list-item-content>
            <v-list-item-content color="red">
              <router-link :to="{ name: 'EditarAuto', params: {id: auto.id} }" >
                <v-btn class="ml-1 mr-1 mb-5" outlined color="orange">Editar</v-btn>
              </router-link>
            </v-list-item-content>
            <v-list-item-content color="red">
              <v-btn class="ml-1 mb-5" outlined color="red" @click="eliminarAuto(auto)">Eliminar</v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-card
                    class="mt-3"
                    color="success"
                    dark
                    max-width="400"
                    v-if="eliminado"
                >
                    <v-card-title>Exito
                    </v-card-title>

                    <v-card-text class="headline font-weight-bold">
                        Auto eliminado
                    </v-card-text>

                </v-card>

    </v-container>
</template>

<script lang="ts">
// import axios from 'axios'
import axios from 'axios'
import Vue from 'vue';

const vm = Vue.extend({
  name: 'BuscarAuto',
  data: function() {
    return {
      modeloABuscar: '',
      autos: {} as any,
      autoEncontrado: false,
      noEncontrado: false,
      eliminado: false,
      urlApi: 'https://cryptic-brook-62567.herokuapp.com'
    }
  },
  methods: {
      buscarModelo: function() {
        console.log("modeloABuscar: ", this.modeloABuscar)
        const url = `${this.urlApi}/modelo/${this.modeloABuscar}.json`
        axios.get(url, {
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          
          this.autos = res.data
          if (this.autos.length >= 1) {
            this.autoEncontrado = true
            this.noEncontrado = false
          } else {
            this.noEncontrado = true
          }
          
          console.log(this.autos)
        }).catch(error => console.log("error", error))
      },
      eliminarAuto: function(auto: any) {
        console.log(auto.id)
        if (confirm("¿Esta seguro de eliminar el auto?")){
          const url = `${this.urlApi}/automovils/${auto.id}.json`
          axios.delete(url).then(res => {
            console.log(res)
            this.eliminado = true

            setTimeout(() => {
              this.$router.push('/')
            }, 2000)

          }).catch(err => console.log(err))
        }else{
          return
        }
      },
      stringUsado(numero: number) {
        if (numero == 1) {
          return 'Si'
        } else {
          return 'No'
        }
      }
  }
});
export default vm;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>