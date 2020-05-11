<template>
    <v-container>
      <h1 class="display-1 mt-3 mb-5">Consultas Stock</h1>

      <v-row>
        <v-col>
          <v-btn color="success" class="mt-4 white--text" large @click="mostrarModelos" >
            Modelo
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="orange" class="mt-4 white--text" large @click="mostrarFabricantes">
            Fabricante
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="onModelo" class="mt-5">
        <v-col>
          <v-select v-model="modeloSeleccionado" :items="modelos" label="Modelos" name="modelo" @change="obtenerAutosPorModelo"></v-select>
        </v-col>
      </v-row>

      <v-row v-if="onFabricante" class="mt-5">
        <v-col>
          <v-select v-model="fabricanteSeleccionado" :items="fabricantes" label="Fabricantes" name="fabricante" @change="obtenerAutosPorFabricante"></v-select>
        </v-col>
      </v-row>

      <v-row v-if="autosObtenidos">
        <v-col>

           <v-list subheader>
          <v-subheader v-if="autosObtenidos && onModelo" class="display-1">Hay  <strong class="ml-2 mr-2 red--text">{{ cantidadModelo }} </strong>   {{ modeloSeleccionado }} a la venta</v-subheader>
          <v-subheader v-if="autosObtenidos && onFabricante" class="display-1">Hay  <strong class="ml-2 mr-2 red--text">{{ cantidadFabricante }} </strong>   {{ fabricanteSeleccionado }} a la venta</v-subheader>

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
            <v-list-item-content class="justify-center">
              <strong >Fabricante  </strong> {{ auto.fabricante }}
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
                <v-btn class="mr-1 mb-5" outlined color="orange">Editar</v-btn>
              </router-link>
            </v-list-item-content>
            <v-list-item-content color="red">
              <v-btn class="ml-1 mb-5" outlined color="red" @click="eliminarAuto(auto)">Eliminar</v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        </v-col>
      </v-row>

    </v-container>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue';

const vm = Vue.extend({
  name: 'ConsultasStock',
  data: function() {
    return {
      onModelo: false,
      modelos: [] as any,
      modeloSeleccionado: '',
      cantidadModelo: 0,

      onFabricante: false,
      fabricantes: [] as any,
      fabricanteSeleccionado: '',
      cantidadFabricante: 0,
      
      autosObtenidos: false,
      autos: [] as any,
      // config
      urlApi: 'https://cryptic-brook-62567.herokuapp.com'
    }
  },
  methods: {
      mostrarModelos: function(){
        this.onModelo = true
        this.onFabricante = false
        if (this.autos.length !== 0) {
          this.autos = []
          this.autosObtenidos = false
        }
        const url = `${this.urlApi}/modeloSinRepetir.json`
        axios.get(url, {
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          console.log("Respuesta de modelos sin repetir: ", res.data)
          const respuesta: any[] = res.data
          const modelos = respuesta.map(item => item.modelo)
          this.modelos = modelos
          
        }).catch(err => console.log(err))
      },
      mostrarFabricantes: function(){
        this.onFabricante = true
        this.onModelo = false
        if (this.autos.length !== 0) {
          this.autos = []
          this.autosObtenidos = false
        }
        const url = `${this.urlApi}/fabricanteSinRepetir.json`
        axios.get(url, {
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          console.log("Respuesta de fabricantes sin repetir: ", res.data)
          const respuesta: any[] = res.data
          const fabricantes = respuesta.map(item => item.fabricante)
          this.fabricantes = fabricantes
          
        }).catch(err => console.log(err))
      },
      obtenerAutosPorModelo: function() {
        const url = `${this.urlApi}/modelo/${this.modeloSeleccionado}.json`
        axios.get(url, {
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          this.autos = res.data
          this.cantidadModelo = this.autos.length
          this.autosObtenidos = true
          console.log(this.autos)
        }).catch(error => console.log("error", error))
      },
      obtenerAutosPorFabricante: function() {
        const url = `${this.urlApi}/fabricante/${this.fabricanteSeleccionado}.json`
        axios.get(url, {
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          this.autos = res.data
          this.cantidadFabricante = this.autos.length
          this.autosObtenidos = true
          console.log(this.autos)
        }).catch(error => console.log("error", error))
      },
      eliminarAuto: function(auto: any) {
        console.log(auto.id)
        if (confirm("¿Esta seguro de eliminar el auto?")){
          const url = `${this.urlApi}/automovils/${auto.id}.json`
          axios.delete(url).then(res => {
            console.log(res)
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