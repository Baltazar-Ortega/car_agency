<template>
  <div class="formulario">
    <form id="formAgregar" @submit.prevent="agregar" enctype="multipart/form-data">
        <label for="name">Nombre: </label>
        <input type="text" name="name" v-model="name"> <br>
        <label for="manufacturer">Fabricante: </label>
        <input type="text" name="manufacturer" v-model="manufacturer"> <br>


        <input type="file" id="fileElem" accept="image/*" @change="handlePicture($event)"> <br>
        <input type="hidden" name="picture" v-model="pictureUrl">
        <div id="uploadedImage"></div>

        <p>
            {{ pictureUrl }}
        </p>
        
        <input type="submit" value="Enviar" />
    </form>

    <h2 v-if="agregado">Auto agregado</h2>
  </div>
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
        agregado: false
    }
  },
  methods: {
      agregar: function() {
          if (this.validarForm()){
                const form: HTMLFormElement =  document.getElementById('formAgregar') as HTMLFormElement
                console.log("Form enviado", form)
                axios.post('http://localhost:3000/cars', new FormData(form)).then(res => console.log(res)).catch(err => console.log(err))
                this.agregado = true
          } else {
              return
          }
          
      },
      handlePicture: function(evt: any) {


          const uploadedImage = document.getElementById('uploadedImage');
          console.log("UploadedImage", uploadedImage)

          console.log(evt.target.files[0])
          const file = evt.target.files[0]
          const urlCloud = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
          console.log("UrlCloud", urlCloud)
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
                tokens.splice(-2, 0, 'w_150,c_scale');
                const img = new Image(); // HTML5 Constructor
                img.src = tokens.join('/');
                img.alt = response.public_id;
                (uploadedImage as HTMLElement).appendChild(img);
            } else {
                console.log("xhr: ", xhr)
                console.log("xhr status: ", xhr.status)
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