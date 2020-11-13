var vue = new Vue({
  el: "#app",
  data: {
    loginName: null,
    loginPass: null,
    email: null,
    signName: null,
    signPass: null
  },

  methods: {
    sendLogin: function() {
      var datos = {
        username: this.loginName,
        password: this.loginPass
      };
      this.$http.post("/login/", datos).then(
        response => {
          recibido = response.body;
          alert(response.body);
        },
        response => {
          alert("Ha habido un error en el envío");
        }
      );
    },
    sendSignUp: function() {
      alert("Formulario enviado");
      var datos = {
        username: this.sigName,
        password: this.signPass,
        email: this.email
      };
      this.$http.post("/newUser/", datos).then(
        response => {
          recibido = response.body;
          alert(response.body.message);
        },
        response => {
          alert("Ha habido un error en el envío");
        }
      );
    }
  }
});
