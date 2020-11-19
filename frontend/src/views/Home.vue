<template>
  <v-container>
    <!--tABLA GENERAL-->
    <v-row>
      <v-col xs12>
        <v-card mb-5>
          <v-card-title>
            Todos Los Vehiculos
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchGeneral"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="elementos"
            :search="searchGeneral"
            item-key="name"
            multi-sort
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon color="pink" small @click="likeItem(item)"> mdi-heart </v-icon>
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
  </v-container>
</template>

<script>
const axios = require("axios");
import { mapState } from "vuex";
export default {
  data: () => ({
    dialog: false,
    searchGeneral: "",
    headers: [
      {
        text: "Modelo",
        align: "start",
        sortable: false,
        value: "model",
      },
      { text: "Marca", value: "marca" },
      { text: "Año", value: "year" },
      { text: "CV", value: "cv" },
      { text: "Puertas", value: "puertas" },
      { text: "Traccion", value: "traccion" },
      { text: "Cambio", value: "transmision" },
      { text: "Tamaño", value: "tamaño" },
      { text: "Precio", value: "precio" },
      { text: "Consumo ExtraUrbano", value: "consumo_extraurbano" },
      { text: "Consumo Urbano", value: "consumo_urbano" },
      { text: "Actions", value: "actions" },
    ],
    idCambiado: "",
    elementos: [],
  }),
  mounted: function () {
    this.obtenerAllCars();
  },
  computed: {
    ...mapState(["emailUsuario"]),
  },

  methods: {
    obtenerAllCars() {
      console.log("entra");
      axios.post("http://localhost:3000/allCars").then((response) => {
        if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
          console.log(response);
        } else {
          for (var i of Object.keys(response.data.cars)) {
            this.elementos.push(response.data.cars[i]);
          }
          console.log(response.data);
        }
      });
    },
    likeItem(item) {
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
          console.log("error")
        } else {
          this.dialog = false
        }
      });
    },
  },
};
</script>
