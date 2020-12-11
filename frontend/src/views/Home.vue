<template>
  <v-container>
    <v-row v-if="muestra">
      <v-col xs12>
        <v-alert prominent :type="tipo">
          <v-row align="center">
            <v-col class="grow">
              Seleccione al menos 5 elementos de la siguiente tabla
            </v-col>
            <v-col class="shrink">
              <v-btn :disabled="deshabilitado" @click="obtenerRecomendacion()"
                >Obtener recomendación</v-btn
              >
            </v-col>
          </v-row>
        </v-alert>
        <v-card mb-5>
          <v-card-title>
            Vehiculos que te pueden interesar...
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchEdad"
              append-icon="mdi-magnify"
              label="Introduca el modelo..."
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="elementosEdad"
            :search="searchEdad"
            item-key="name"
            multi-sort
            class="elevation-1"
          >
          //eslint-disable-next-line
            <template v-slot:item.actions="{ item }">
              <v-icon color="pink" small @click="likeItemEDAD(item)">
                mdi-heart
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <!--tABLA GENERAL-->
    <v-row v-if="muestra">
      <v-col xs12>
        <v-card mb-5>
          <v-card-title>
            Todos Los Vehiculos
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchGeneral"
              append-icon="mdi-magnify"
              label="Introduca el modelo..."
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="elementos"
            :search="searchGeneral"
            item-key="Modelo"
            multi-sort
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon color="pink" small @click="likeItem(item)">
                mdi-heart
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    
  <!-- TABLA DE ROCMENDACION-->
     <v-row v-if="!muestra">
      <v-col xs12>
        <v-card mb-5>
          <v-card-title>
            Tu recomendacion...
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchRecomendacion"
              append-icon="mdi-magnify"
              label="Introduca el modelo..."
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="elementosRecomendacion"
            :search="searchRecomendacion"
            item-key="Modelo"
            multi-sort
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon color="pink" small @click="likeItem(item)">
                mdi-heart
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">¿Añadir a tus gustos?</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="green" text @click="confirmar()">Confirmar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-btn
            fab
            fixed
            bottom
            left
            color="white"
            @click="atras()"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
  </v-container>
</template>

<script>
const axios = require("axios");
import { mapState } from "vuex";
export default {
  data: () => ({
    dialog: false,
    searchGeneral: "",
    searchEdad: "",
    searchRecomendacion:"",
    tipo: "error",
    deshabilitado: false,
    muestra: true,
    contador: 0,
    headers: [
      {
        text: "Modelo",
        align: "start",
        sortable: false,
        value: "model",
      },
      { text: "Marca", filterable: false, value: "marca" },
      { text: "Año", filterable: false, value: "year" },
      { text: "CV", filterable: false, value: "cv" },
      { text: "Puertas", filterable: false, value: "puertas" },
      { text: "Traccion", filterable: false, value: "traccion" },
      { text: "Cambio", filterable: false, value: "transmision" },
      { text: "Tamaño", filterable: false, value: "tamano" },
      { text: "Precio", filterable: false, value: "precio" },
      {
        text: "Consumo ExtraUrbano",
        filterable: false,
        value: "consumo_extraurbano",
      },
      { text: "Consumo Urbano", filterable: false, value: "consumo_urbano" },
      { text: "Actions", filterable: false, value: "actions" },
    ],
    idCambiado: "",
    elementos: [],
    elementosEdad: [],
    elementosRecomendacion: [],
  }),
  mounted: function () {
    this.obtenerAllCars();
  },
  computed: {
    ...mapState(["emailUsuario"]),
  },

  methods: {
    recomienda() {},
    obtenerEdadCars() {
      const data = {
        email: this.emailUsuario,
      };
      axios.post("http://localhost:3000/edad", data).then((response) => {
        if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
          console.log(response);
        } else {
          for (var i of Object.keys(response.data.cars)) {
            this.elementosEdad.push(response.data.cars[i]);
          }
          console.log(response.data);
        }
      });
    },
    obtenerRecomendacion() {
      const data = {
        email: this.emailUsuario,
      };
      
      this.muestra=false;
      axios.post("http://localhost:3000/recomendacion", data).then((response) => {
        if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
          console.log(response);
        } else {
          for (var i of Object.keys(response.data.cars)) {
            this.elementosRecomendacion.push(response.data.cars[i]);
          }
          console.log(response.data);
        }
      });
    },

    obtenerAllCars() {
      this.contador = 0;
      
        axios.post("http://localhost:3000/allCars").then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response);
          } else {
            for (var i of Object.keys(response.data.cars)) {
              this.elementos.push(response.data.cars[i]);
            }
            console.log(response.data);
          }
          this.obtenerEdadCars();
        });
    },

    likeItem(item) {
      this.idCambiado = item.id;
      this.dialog = true;
    },
    atras(){
      this.muestra=true;
    },

    likeItemEDAD(item) {
      this.contador += 1;
      this.idCambiado = item.id;
      this.dialog = true;
    },

    confirmar() {
      const data = {
        email: this.emailUsuario,
        id: this.idCambiado,
      };
      
      axios.post("http://localhost:3000/like", data).then((response) => {
        if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
          console.log("error");
        } else {
          this.dialog = false;
          if (this.contador == 5) {
            this.tipo = "success";
            this.deshabilitado = false;
          }
        }
      });
    },
  },
};
</script>
