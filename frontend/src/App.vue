
<template>
  <v-app :style="color_fondo">
    <v-app-bar
      app
      v-if="logged"
      clipped-left
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-toolbar-title class="display-1 font-weight-bold"
        >YourBestCar</v-toolbar-title
      >
      <v-spacer></v-spacer>

      <v-btn fab small ml-10 color="white" @click="cerrarSesionDialog">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-divider></v-divider>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-card-text class="title"
                  >¿Esta seguro que desa cerrar sesion?</v-card-text
                >
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="green" text @click="confirmarCierreSesion()"
              >Confirmar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-content fluid>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",

  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    cerrarSesionDialog() {
      this.dialog = true;
    },
    confirmarCierreSesion() {
      this.deslogearse();
      this.dialog = false;
      this.$router.push("/");
    },
    ...mapMutations(["deslogearse"]),
  },
  computed: {
    color_fondo() {
      if (!this.logged) {
        return "background: rgb(2,0,36);background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);";
      } else {
        return "background-color: #0D47A1;";
      }
    },
    ...mapState(["logged"]),
  },
};
</script>
