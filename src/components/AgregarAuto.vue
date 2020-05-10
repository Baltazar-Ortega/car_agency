<template>
    <v-container>
        <h1 class="headline mt-3 mb-5">Agregar Auto</h1>
        <v-row>
            <v-col xs="12" md="6">
                <form id="formAgregar" @submit.prevent="validarForm" enctype="multipart/form-data">

                
                    <v-text-field
                        v-model="modelo"
                        label="Modelo"
                        name="modelo"
                        @change="reiniciarMensaje"
                    ></v-text-field>

                    <v-text-field
                        v-model="fabricante"
                        label="Fabricante"
                        name="fabricante"
                    ></v-text-field>

                    <v-file-input
                        label="Imagen"
                        filled
                        prepend-icon="mdi-camera"
                        class="mt-5 mb-5"
                        @change="mostrarImagen($event)"
                    ></v-file-input>

                    <v-select v-model="color" :items="colors" label="Color" name="color"></v-select>

                    <v-select v-model="tipo" :items="tipos" label="Tipo" name="tipo"></v-select>

                    <v-select v-model="transmision" :items="transmisiones" label="Transmision" name="transmision"></v-select>

                    <v-text-field
                        v-model="propietarios"
                        label="Propietarios"
                        name="propietarios"
                        type="number"
                    ></v-text-field>

                    <label>¿Usado?</label>
                    <select v-model="usado" label="Usado" name="usado" form="formAgregar">
                        <option value="1">Si</option>
                        <option value="0">No</option>
                    </select>

                    <v-select v-model="anio" :items="anios" label="Año" name="anio"></v-select>

                    <v-text-field
                        v-model="kilometraje"
                        label="kilometraje"
                        anio="kilometraje"
                        type="number"
                        name="kilometraje"
                    ></v-text-field>

                    <v-text-field
                        v-model="precio"
                        label="precio"
                        name="precio"
                        type="number"
                    ></v-text-field>

                    <v-text-field
                        v-model="stock"
                        label="stock"
                        name="stock"
                        type="number"
                    ></v-text-field>

                    

                    <input type="hidden" name="imagen" v-model="pictureUrl">

                    
                    <v-btn type="submit" color="success" class="mt-4" >
                    Enviar
                    </v-btn>
                
                </form>

                <v-card
                    class="mt-3"
                    color="success"
                    dark
                    max-width="400"
                    v-if="agregado"
                >
                    <v-card-title>Operacion realizada con exito
                    </v-card-title>

                    <v-card-text class="headline font-weight-bold">
                        Auto agregado a la base de datos
                    </v-card-text>

                </v-card>

                <v-card
                    class="mt-3"
                    color="red"
                    dark
                    max-width="400"
                    v-if="invalido"
                >
                    <v-card-title>Error
                    </v-card-title>

                    <v-card-text class="headline font-weight-bold">
                        Ingresa todos los campos
                    </v-card-text>

                </v-card>

            </v-col>

            <v-col xs="12" md="4" offset="2">
                <img id="uploadedImage" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue';

const vm = Vue.extend({
  name: 'AgregarAuto',
  data: function() {
    return {
        modelo: '',
        fabricante: '',
        color: 'Rojo',
        colors: [
            'Rojo',
            'Negro',
            'Gris',
            'Blanco',
            'Otro',
        ],
        tipo: 'Automovil',
        tipos: [
            'Automovil',
            'Camioneta'
        ],
        transmision: 'Estandar',
        transmisiones: [
            'Estandar',
            'Automatico'
        ],
        usado: "1",
        anio: 2020,
        anios: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
                2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
        propietarios: 0,
        kilometraje: 10000,
        precio: 0,
        stock: 0,
        pictureUrl: '',
        // Config
        cloudName: 'balti',
        uploadPreset: 'schnauzer',
        urlApi: 'https://cryptic-brook-62567.herokuapp.com',
        imageFile: File,
        invalido: false,
        agregado: false
    }
  },
  created: function ()  {
      console.log("this.usado: ", this.usado)
  },
  methods: {
      agregar: function() {
        const form: any =  document.getElementById('formAgregar') as any
        console.log("Form enviado", form)
        axios.post(`${this.urlApi}/automovils`, new FormData(form)).then(res => console.log(res)).catch(err => console.log(err))

        const uploadedImage: any = document.getElementById('uploadedImage');
        this.agregado = true  
        this.modelo = ''
        this.fabricante = ''
        this.pictureUrl = ''
        this.propietarios = 0
        this.kilometraje = 10000
        this.precio = 0
        this.stock = 0
        this.usado = "1"
        uploadedImage.src = ''
      },
      validarForm: function() {
          this.cloudinary().then(() => {
              console.log('Picture Url: ', this.pictureUrl)
                if (this.modelo != '' && this.fabricante != '' &&
                        this.color != '' && this.tipo != '' &&
                        this.transmision != '' && this.usado != null && 
                        this.anio != null && this.propietarios != null &&
                        this.kilometraje != null && this.precio != null && this.stock != null){
                    // this.usado = this.usadoConvertir
                    console.log('Valor de usado: ', this.usado)
                    console.log('Campos llenos')
                    this.agregar()
                }else{
                    console.log('campos incompletos')
                    this.invalido = true
                }
          })
          
      },
      cloudinary: function() {

          return new Promise((resolve) => {
              const file: any = this.imageFile


                const urlCloud = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
                //console.log("UrlCloud", urlCloud)
                const xhr = new XMLHttpRequest();
                const fd = new FormData();
                xhr.open('POST', urlCloud, true)
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

                xhr.onreadystatechange = (e) => {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        // File uploaded successfully
                        const response = JSON.parse(xhr.responseText);
                        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
                        const url = response.secure_url;
                        console.log('URL obtenida', url)
                        this.pictureUrl = url
                        resolve()
                        } else {
                            console.log("xhr: ", xhr)
                            console.log("xhr status: ", xhr.status)
                        }
                    };  
                    
                    fd.append('upload_preset', this.uploadPreset)
                    fd.append('file', file)
                    xhr.send(fd)

          })

          
      },
      mostrarImagen: function(evt: any) {

          const uploadedImage: any = document.getElementById('uploadedImage');
          uploadedImage.title = "Imagen"

          const file = evt
          this.imageFile = file

          const fr = new FileReader();
          fr.onload = function (e: any) {
            uploadedImage.src = e.target.result;
          }
          fr.readAsDataURL(file);
          
      },
      reiniciarMensaje: function() {
          this.agregado = false
      },
      
  }
});
export default vm;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#uploadedImage {
    width: 100%;
}
</style>