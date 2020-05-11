<template>
    <v-container>
      <h1 class="display-1 mt-3 mb-5">Consultas sobre las solicitudes de financiacion</h1>

      <v-row>

        <v-col>
          <v-btn class="ma-2 mb-5" outlined color="indigo" @click="obtenerRecientes">
            Mas recientes
          </v-btn>
        </v-col>
        <v-col>
          <v-btn class="ma-2 mb-5" outlined color="indigo" @click="obtenerMasSolicitado">
            Auto más popular
          </v-btn>
        </v-col>

      </v-row>


      <v-row v-if="verMasSolicitado">
        <v-col>
            <v-img :src="autoMasSolicitado.imagen" style="width: 600px;" />
        </v-col>
        <v-col>
          
          <v-card  class="mx-auto mb-4" cols="6">
              <v-card-title class="display-1 mb-3">{{ autoMasSolicitado.modelo }}</v-card-title>
              <v-card-subtitle>
                <v-chip
                  
                  color="red"
                  label
                  text-color="white"
                >
                  <v-icon left>mdi-label</v-icon>
                  {{ autoMasSolicitado.fabricante }} 
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
                  <p class="title mb-3">Precio: <span class="red--text">$ {{ autoMasSolicitado.precio }}</span> </p>
                  <p> <strong> Año: </strong> {{ autoMasSolicitado.anio }}</p>
                  <p><strong> Kilometraje: </strong> {{ autoMasSolicitado.kilometraje }} </p>
                  <p><strong> Color: </strong> {{ autoMasSolicitado.color }}</p>
                  <p><strong> Tipo: </strong> {{autoMasSolicitado.tipo}}</p>
                  <p><strong> Transmision: </strong> {{autoMasSolicitado.transmision}}</p>
                  <p><strong> </strong>  </p>
                  <p><strong> Propietarios: </strong> {{autoMasSolicitado.propietarios}}</p>
              </v-card-text>

          </v-card>   

        </v-col>
      </v-row>

      <v-row v-if="verMasRecientes">
        <v-list subheader>
          <v-subheader>Clientes mas recientes</v-subheader>

              <v-list-item
                v-for="(cliente, index) in masRecientes"
                :key="cliente.id"
              >

                <v-list-item-content>
                  <strong> Nombre: </strong> {{ cliente.nombre }}
                </v-list-item-content>
                <v-list-item-content class="correo">
                  <strong> Correo: </strong> {{ cliente.correo }}
                </v-list-item-content>
                <v-list-item-content>
                  <strong> Auto:</strong> {{ masRecientesAutos[index] }}
                </v-list-item-content>
              
              </v-list-item>
            
          
        </v-list>
      </v-row>

    </v-container>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue';

const vm = Vue.extend({
  name: 'ConsultasClientes',
  data: function() {
    return {
      masRecientes: [] as any,
      verMasRecientes: false,

      autoMasSolicitado: {} as any,
      verMasSolicitado: false,

      masRecientesAutos: [] as any,
      // Config
      urlApi: 'https://cryptic-brook-62567.herokuapp.com'
    }
  },
  methods: {
      obtenerRecientes: function() {
        axios.get(`${this.urlApi}/clientes.json`, {
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          const clientes = res.data
          const clientesMasRecientes = clientes.slice(0, 5)
          this.masRecientes = clientesMasRecientes
          this.verMasSolicitado = false
          this.verMasRecientes = true
          console.log("Mas recientes: ", this.masRecientes)

          const masRecientesAutos: any[] = [];
          this.masRecientes.forEach((cliente: any) => {
            axios.get(`${this.urlApi}/automovils/${cliente.idAutomovil}.json`, {
              headers: { 'Content-Type': 'application/json' }
            }).then(res => masRecientesAutos.push(res.data.modelo)  ).catch(err => console.log(err)) 
            
          })
          this.masRecientesAutos = masRecientesAutos
          console.log("mas recientes autos: ", masRecientesAutos)

        }).catch(err => console.log(err))
      },
      obtenerMasSolicitado: function() {

        axios.get(`${this.urlApi}/masSolicitado.json`, {
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          const respuesta = res.data[0]
          const idAuto = respuesta.idAutomovil

          axios.get(`${this.urlApi}/automovils/${idAuto}.json`, {
            headers: { 'Content-Type': 'application/json' }
          }).then(res => {
            
            this.autoMasSolicitado = res.data
            this.verMasRecientes = false
            this.verMasSolicitado = true
            console.log("Auto mas popular: ", this.autoMasSolicitado)
          }).catch(error => console.log("error", error))

        }).catch(err => console.log(err))
      }
  },
  computed: {
    usadoPalabra: function(){
      if (this.autoMasSolicitado.usado == 1) {
        return 'Usado'
      } else {
        return 'Nuevo'
      }
    }
  }
});
export default vm;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.correo {
  width: 800px;
}
</style>