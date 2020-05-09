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
        <!-- <h1 class="display-1 white--text"> -->
          <router-link to="/" class="mr-2 ml-2"><h1 :class="[$vuetify.breakpoint.mdAndUp ? 'display-1 white--text' : 'd-none']">Agencia de autos</h1></router-link>
        
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

    <v-footer
    color="primary darken-3"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="primary darken-1 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>KFAB Soluciones</strong>
      </v-col>
    </v-row>
  </v-footer>
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
    links: [
        'Home',
        'Sobre nosotros',
        'Unete al equipo',
        'Servicios',
        'Blog',
        'Contacto',
      ],
  }),
});
</script>

<style scoped>
.title {
  color: white;
}
</style>
