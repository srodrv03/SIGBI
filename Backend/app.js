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
app.post("/registro", function(req, res) {
  
    var nombre = req.body.nombre;
    var apellidos= req.body.apellidos;
    var email= req.body.email;
    var pass= req.body.pass;
    var pepe='"hola"'
    session.run('MATCH (user:Usuario {email:'+pepe+'}) RETURN user')
    .then(results => {

      if (results.records=[]) {
          console.log("vacio")
      }
      else {
        console.log("lleno")

      }
    })
    .catch(error => {
      console.log("catch")
      
      console.log(error);
      driver.close()
    })
});


app.listen(port, function() {
  console.log("Example app listening on port " + 3000);
});
