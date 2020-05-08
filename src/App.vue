<template>
  <v-app>
    <v-app-bar
      app
      dark
      height="80"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          src="@/assets/logo.png"
          width="90"
        />
        <v-img
          alt="Logo"
          class="shrink mr-2"
          src="@/assets/logoF.png"
          width="90"
        />
        
          <router-link to="/" class="mr-2 ml-2"><h1 class="display-1 white--text">Agencia de Autos</h1></router-link>
        
      </div>

      <v-spacer></v-spacer>

      <v-btn
        to="/admin"
        text
      >
        <span class="mr-2">Admin</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
// import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',

  // components: {
  //   HelloWorld,
  // },

  data: () => ({
    //
  }),
});
</script>

<style scoped>
.title {
  color: white;
}
</style>
