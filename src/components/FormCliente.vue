<template>
    <v-container>
        <v-row>
            <v-col>
                <h3>Obtener informacion de financiamiento</h3>
                <form id="formCliente" @submit.prevent="mandarForm">
                    <v-text-field
                        v-model="nombre"
                        label="Nombre"
                        name="nombre"
                        @change="reiniciarForm"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="correo"
                        label="Correo"
                        name="correo"
                        type="email"
                        required
                    ></v-text-field>

                    <input type="hidden" name="idAutomovil" v-model="idRecibido">

                    <v-btn type="submit" color="success" class="mt-4">
                        Buscar
                    </v-btn>

                </form>
            </v-col>
        </v-row>

        <v-card
            class="mt-3"
            color="success"
            outlined
            dark
            max-width="400"
            v-if="mandado"
        >
            <v-card-title>Correo enviado
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
                Recibiras mas informacion sobre los metodos de pago
            </v-card-text>

        </v-card>

    </v-container>
</template>

<script lang="ts">
/* eslint-disable */
import axios from 'axios'
import Vue from 'vue';

export default Vue.extend({
    name: 'FormCliente',
    props: {
        auto: {
            type: Object,
        },
        id: {
            type: Number
        }
    },
    created: function() {
        console.log("id del auto: ", this.id)
    },
    data: function() {
        return {
            nombre: '',
            correo: '',
            idRecibido: this.id,
            mandado: false,
            urlApi: 'https://cryptic-brook-62567.herokuapp.com',
        }
    },
    methods: {
        mandarForm: function () {
            const form: any =  document.getElementById('formCliente') as any
            console.log("Form enviado: ", form)
            const url = `${this.urlApi}/clientes.json`
            axios.post(url, new FormData(form)).then(res => console.log("respuesta: ", res)).catch(err => console.log(err))
            this.mandado = true
            this.nombre = ''
            this.correo = ''
        },
        reiniciarForm: function() {
            this.mandado = false
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