<template>
    <v-container>
        <h1 class="headline mt-2">Agregar Auto</h1>
        <v-row>
            <v-col xs="12" md="6">
                <form id="formAgregar" @submit.prevent="agregar" enctype="multipart/form-data">

                <v-text-field
                    v-model="name"
                    label="name"
                    required
                ></v-text-field>

                 <v-text-field
                    v-model="manufacturer"
                    label="manufacturer"
                    required
                ></v-text-field>

                <v-file-input
                    label="pictureImg"
                    filled
                    prepend-icon="mdi-camera"
                    @change="handlePicture($event)"
                ></v-file-input>

                <input type="hidden" name="picture" v-model="pictureUrl">

                <v-btn color="success">
                    <input type="submit" value="Enviar" />
                </v-btn>
                

                </form>

            </v-col>

            <v-col xs="12" md="3" offset="2">
                <div id="uploadedImage"></div>
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
        name: '',
        manufacturer: '',
        picture: '',
        cloudName: 'balti',
        uploadPreset: 'schnauzer',
        pictureUrl: '',
        agregado: false,
    }
  },
  methods: {
      agregar: function() {
          if (this.validarForm()){
              console.log("Validado en agregar")
                // const form: HTMLFormElement =  document.getElementById('formAgregar') as HTMLFormElement
                // console.log("Form enviado", form)
                // axios.post('http://localhost:3000/cars', new FormData(form)).then(res => console.log(res)).catch(err => console.log(err))
                // this.agregado = true
          } else {
              return
          }
          
      },
      handlePicture: function(evt: any) {

          const uploadedImage = document.getElementById('uploadedImage');

          const file = evt
          
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
                // Create a thumbnail of the uploaded image, with 150px width
                const tokens = url.split('/');
                tokens.splice(-2, 0, 'w_350,c_scale');
                const img = new Image(); // HTML5 Constructor
                img.src = tokens.join('/');
                img.alt = response.public_id;
                (uploadedImage as HTMLElement).appendChild(img);
            } else {
                //console.log("xhr: ", xhr)
                //console.log("xhr status: ", xhr.status)
            }
          };  
          
          fd.append('upload_preset', this.uploadPreset)
          fd.append('file', file)
          xhr.send(fd)
      },
      validarForm: function() {
          if (this.pictureUrl && this.manufacturer && this.name != ''){
              console.log('Campos llenos')
              return true
          }else{
              console.log('campos incompletos')
              return false
          }
      }
      
  }
});
export default vm;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>