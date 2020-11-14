
<template>
  <v-app
    :style=color_fondo>
    <v-app-bar app v-if="logged" clipped-left src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <v-toolbar-title class="display-1 font-weight-bold" >i-NVESTER</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-btn fab small ml-10 color="white" @click="cerrarSesionDialog"> 
        <v-icon >mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      app
      clipped
      v-if="drawer"
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      v-model="drawer"
    >
      <v-list-item two-line class=" 'px-0'">
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Nombre</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item @click="acciones(item)" v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title >{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-card-text class="title">¿Esta seguro que desa cerrar sesion?</v-card-text>
                </v-col>
              </v-row>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="green" text @click="confirmarCierreSesion()">Confirmar</v-btn>
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
import { mapState, mapMutations} from 'vuex'
export default {
  name: "App",

  data() {
    return {
      drawer: null,
      dialog:false,
      items: [
        { title: "Inicio", icon: "mdi-home-variant" },
        { title: "Acciones", icon: "mdi-scale-balance" },
        { title: "Movimientos", icon: "mdi-currency-eur" },
        { title: "Herramientas", icon: "mdi-wrench" }
      ]
    };
  },
  methods: {
    acciones(item){
      if(item.title == "Acciones"){
        this.$router.push('/MisAcciones')
      }else if(item.title == "Movimientos"){
      this.$router.push('/MisMovimientos')
      }else if(item.title == "Inicio")
      this.$router.push('/home')
    },
    cerrarSesionDialog(){
      this.dialog=true

    },
    confirmarCierreSesion(){
      this.deslogearse()
      this.drawer=false
      this.dialog=false
      this.$router.push('/')
      
    },
    ...mapMutations(['deslogearse'])
  },
  computed: {

    color_fondo(){
      if(!this.logged){
        return "background: rgb(2,0,36);background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);"
      }
      else{
        return "background-color: #0D47A1;"
      }
    },
    ...mapState(['logged'])
  }
};
</script>
