<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/LogoPrincipal.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4" cols="12">
        <h1 class="display-2 font-weight-bold mb-3">
          Bienvenido a YourBestCar
        </h1>
      </v-col>

      <v-col cols="12">
        <v-row justify="center" mb-5>
          <p class="font-weight-bold font-italic">
            *Todos los campos son obligatorios.
          </p>
        </v-row>
        <v-row justify="center">
          <form>
            <v-row>
              <v-text-field
                name="nombre"
                v-model="nombre"
                label="Nombre"
                id="nombre"
                type="nombre"
                required
                dark
                prepend-icon="mdi-account-circle"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                name="Edad"
                v-model="edad"
                label="Edad"
                id="edad"
                type="edad"
                required
                dark
                prepend-icon="mdi-account-circle"
              ></v-text-field>
            </v-row>
            <v-row xs12 sm6>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                name="email-sin"
                label="Correo electrónico"
                id="email-sin"
                type="email"
                required
                dark
                prepend-icon="mdi-account-circle"
              ></v-text-field>
            </v-row>
            <v-row xs12 sm6>
              <v-text-field
                v-model="password"
                name="password"
                label="Contraseña"
                id="password-sin"
                type="password"
                required
                dark
                prepend-icon="mdi-fingerprint"
              ></v-text-field>
            </v-row>
            <v-row xs12 sm6>
              <v-text-field
                v-model="password1"
                :rules="[
                  (v) => !!v || 'La contraseña es necesaria.',
                  (v) => v == this.password || 'Tiene que ser iguales',
                ]"
                name="password1"
                label="Repetir Contraseña"
                id="password-sin2"
                type="password"
                required
                dark
                prepend-icon="mdi-fingerprint"
              ></v-text-field>
            </v-row>
            <v-alert
              :value="visibleAlerta"
              justify-center
              type="error"
              height="40"
              dense
              >Ese Email ya ha sido registrado.</v-alert
            >

            <v-row>
              <v-col xs12 sm6>
                <v-btn @click="confirmaRegistro" color="white" light
                  >Confirmar</v-btn
                >
              </v-col>
              <v-col xs12 sm6>
                <router-link to="/Login" tag="button">
                  <v-btn type="submit" color="white" light
                    >¿Ya tienes cuenta? Inicia sesión</v-btn
                  >
                </router-link>
              </v-col>
            </v-row>
          </form>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require("axios");
export default {
  name: "Login",

  data: () => ({
    nombre: "",
    edad: "",
    email: "",
    visibleAlerta: false,
    password: "",
    password1: "",
    emailRules: [
      (v) => !!v || "El e-mail es necesario.",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    confirmaRegistro() {
      if (this.nombre != "" && this.edad != "") {
        const params = {
          nombre: this.nombre,
          edad: this.edad,
          email: this.email,
          pass: this.password,
        };
        axios
          .post("http://localhost:3000/registro", params)
          .then((response) => {
            if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
              console.log(response);
              this.visibleAlerta = true;
            } else {
              this.$router.push("Login");
            }
          });
      }
    },
  },
};
</script>