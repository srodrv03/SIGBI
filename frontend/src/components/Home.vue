<template>
    <v-container background-color="blue lighten-1">
      <v-alert type="error">
        <v-row>
          <v-col>
            El precio por accion de
            <span class="font-weight-black">REPSOL</span> ha llegado a minimo semanal.
          </v-col>
          <v-col class="shrink">
            <v-btn @click="obtenerEmpresasGeneral">Comprar ahora</v-btn>
          </v-col>
        </v-row>
      </v-alert>
      <v-row dense>
        <v-col cols="12">
          <v-btn class="title" block>Portada</v-btn>
          
        </v-col>
        <v-col>
          <v-btn block>Nacional</v-btn>
        </v-col>
        <v-col>
          <v-btn block>Europa</v-btn>
        </v-col>
        <v-col>
          <v-btn block>America</v-btn>
        </v-col>
      </v-row>
      <!--tABLA GENERAL-->
      <v-row>
        <v-col xs12>
          <v-card mb-5>
            <v-card-title>
              Empresas
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
              :headers="headersGeneral"
              :items="elementosGeneral"
              :search="searchGeneral"
              item-key="name"
              multi-sort
              class="elevation-1"
            >
              <template v-slot:item.venderbut="{ item }">
                <v-btn color="green lighten-1" small v-model="item.venderbut">Vender</v-btn>
              </template>
              <template v-slot:item.comprarbut="{ item }">
                <v-btn color="red" small v-model="item.comprarbut">Comprar</v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>

      <!--TABLA DE TUS EMPRESAS-->
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              Tus Empresas
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="elementos"
              :search="search"
              item-key="name"
              multi-sort
              class="elevation-1"
            >
              <template v-slot:item.venderbut="{ item }">
                <v-btn color="green lighten-1" small v-model="item.venderbut">Vender</v-btn>
              </template>
              <template v-slot:item.comprarbut="{ item }">
                <v-btn color="red" small v-model="item.comprarbut">Comprar</v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row cols="12">
        <v-card-text>
          <v-sheet color="blue lighten-5">
            <v-sparkline
              class=".font-italic font-weight-light"
              :value="value"
              color="white"
              height="100"
              padding="10"
              smooth="0"
              :gradient="gradient"
              gradient-direction="top"
              :fill="false"
              line-width="0.5"
              stroke-linecap="round"
            >
              <template v-slot:label="item">${{ item.value }}</template>
            </v-sparkline>
          </v-sheet>
        </v-card-text>
      </v-row>

       <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline">Use Google's location service?</v-card-title>

              <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

                <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

    </v-container>
   

</template>

<script>
const axios = require("axios");
export default {
  data: () => ({
    value: [423, 446, 510, 520, 680, 675, 510, 470, 590, 610, 630, 660, 760],
    gradient: ["green", "red"],
    search: "",
    dialog: true,
    searchGeneral: "",
    headersGeneral: [
      {
        text: "Simbolo",
        align: "start",
        sortable: false,
        value: "simbolo"
      },
      { text: "Nombre", value: "nombre" },
      { text: "Comprar", value: "precio" },
      { text: "", value: "comprarbut" }
    ],
    headers: [
      {
        text: "Simbolo",
        align: "start",
        sortable: false,
        value: "symbol"
      },
      { text: "Valoracion", value: "valoracion" },
      { text: "Vender", value: "vender" },
      { text: "", value: "venderbut" },
      { text: "Comprar", value: "comprar" },
      { text: "", value: "comprarbut" }
    ],
    elementosGeneral: [],
    elementos: [
      {
        name: "ENDESA",
        valoracion: "0.27%",
        comprar: 47.3,
        vender: 47.1
      },
      {
        name: "IBERDROLA",
        valoracion: "0.47%",
        comprar: 87.3,
        vender: 17.1
      },
      {
        name: "INDITEX",
        valoracion: "0.29%",
        comprar: 22.3,
        vender: 31.1
      },
      {
        name: "REPSOL",
        valoracion: "0.54%",
        comprar: 98.1,
        vender: 99.1
      },
      {
        name: "BBVA",
        valoracion: "-10.27%",
        comprar: 47.3,
        vender: 47.1
      },
      {
        name: "SANTANDER",
        valoracion: "-0.4%",
        comprar: 51.3,
        vender: 12.1
      },
      {
        name: "ACS",
        valoracion: "0.27%",
        comprar: 47.3,
        vender: 47.1
      }
    ]
  })
};
</script>