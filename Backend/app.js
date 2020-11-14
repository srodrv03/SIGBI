const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const neo4j = require("neo4j-driver");
const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "1234")
);
const session = driver.session();
app.post("/registro", function (req, res) {
  var nombre = req.body.nombre;
  var edad = parseInt(req.body.edad);
  var email = req.body.email;
  var pass = req.body.pass;
  var pepe = 'prueba'
  session.run('MATCH (user:Usuario {email:"' + email + '"}) RETURN user')
    .then(results => {
      if (results.records.length != 0) {

        res.json({ error: "El usuario ya estaba añadido" })
      }
      else {
        console.log("crea")
        session.run('CREATE (user:Usuario {name: "' + nombre + '" , email: "' + email + '" , pass: "' + pass + '"  , edad: ' + edad + '    })')
          .then(results => {
            res.json({ correcto: "Usuario añadido correctamente" })
          })
      }
    })
    .catch(error => {
      console.log(error);
      driver.close()
    })
});
app.post("/login", function (req, res) {
  var email = req.body.email;
  var pass = req.body.pass;
  session.run('MATCH (user:Usuario {email:"' + email + '"}) RETURN user')
    .then(results => {
      if (results.records.length != 0) {
        session.run('MATCH (user:Usuario {email:"' + email + '" , pass: "' + pass + '" }) RETURN user')
          .then(results => {
            if (results.records.length != 0) {
              res.json({ autorizacion: "Usuario añadido correctamente" })
            } else {
              res.json({ error: "Datos incorrectos" })
            }
          })
      }
      else {
        res.json({ error: "No hay ningun usuario con esa contraseña" })
      }
    })
    .catch(error => {
      console.log(error);
      res.json({ error: err })
      driver.close()
    })
});


app.listen(port, function () {
  console.log("Example app listening on port " + 3000);
});
