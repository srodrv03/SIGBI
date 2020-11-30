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
  neo4j.auth.basic("neo4j", "1234"), { disableLosslessIntegers: true }
);
const session = driver.session();

var Car = module.exports = function Car(_node) {
  this._node = _node;
}




app.post("/allCars", function (req, res) {
  respuesta = {
    cars: []
  }
  //session.run('MATCH (c:Car) return c limit 10000')
  session.run('MATCH (c:Car)-[]-(t:Traccion),(c:Car)-[]-(y:Tamaño),(c:Car)-[]-(b:Brand),(c:Car)-[]-(u:Transmision),(c:Car)-[]-(p:Puerta) return c,t.name,y.name,b.name,u.name,p.numero ')
    .then(async results => {

      results.records.forEach(function (record) {

        record._fields[0].properties["traccion"] = record._fields[1]
        record._fields[0].properties["tamaño"] = record._fields[2]
        record._fields[0].properties["marca"] = record._fields[3]
        record._fields[0].properties["transmision"] = record._fields[4]
        record._fields[0].properties["puertas"] = record._fields[5]
        respuesta.cars.push(record._fields[0].properties)

      })

      res.json(respuesta)
    })
    .catch(error => {
      console.log(error);
      driver.close()
    })
}),

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
      res.json({ error })
      driver.close()
    })
});
app.post("/edad", function (req, res) {
  respuesta = {
    cars: []
  }
  var email = req.body.email;

  session.run('MATCH (user:Usuario {email:"' + email + '"}) RETURN user.edad')
    .then(async results => {
      var edad = results.records[0]._fields[0]

      if (edad <= 28) {
        session.run('MATCH (c:Car)-[]-(t:Traccion),(c:Car)-[]-(y:Tamaño),(c:Car)-[]-(b:Brand),(c:Car)-[]-(u:Transmision),(c:Car)-[]-(p:Puerta) where (c.cv < 200 and p.numero= 2 and c.year>2000 and  y.name<>"Large") return c,t.name,y.name,b.name,u.name,p.numero')
          .then(async results => {

            results.records.forEach(function (record) {

              record._fields[0].properties["traccion"] = record._fields[1]
              record._fields[0].properties["tamaño"] = record._fields[2]
              record._fields[0].properties["marca"] = record._fields[3]
              record._fields[0].properties["transmision"] = record._fields[4]
              record._fields[0].properties["puertas"] = record._fields[5]
              respuesta.cars.push(record._fields[0].properties)

            })

            res.json(respuesta)
          })

      } else if (edad > 28 && edad <= 37) {
        session.run('MATCH (c:Car)-[]-(t:Traccion),(c:Car)-[]-(y:Tamaño),(c:Car)-[]-(b:Brand),(c:Car)-[]-(u:Transmision),(c:Car)-[]-(p:Puerta) where (c.cv > 150 and c.cv < 300 and t.name<>"front wheel drive" and y.name<>"Compact") return c,t.name,y.name,b.name,u.name,p.numero')
          .then(async results => {

            results.records.forEach(function (record) {

              record._fields[0].properties["traccion"] = record._fields[1]
              record._fields[0].properties["tamaño"] = record._fields[2]
              record._fields[0].properties["marca"] = record._fields[3]
              record._fields[0].properties["transmision"] = record._fields[4]
              record._fields[0].properties["puertas"] = record._fields[5]
              respuesta.cars.push(record._fields[0].properties)

            })

            res.json(respuesta)
          })

      } else if (edad > 38 && edad <= 60) {
        session.run('MATCH (c:Car)-[]-(t:Traccion),(c:Car)-[]-(y:Tamaño),(c:Car)-[]-(b:Brand),(c:Car)-[]-(u:Transmision),(c:Car)-[]-(p:Puerta) where (c.cv > 150 and c.cv < 300 and  y.name="Large") return c,t.name,y.name,b.name,u.name,p.numero')
          .then(async results => {

            results.records.forEach(function (record) {

              record._fields[0].properties["traccion"] = record._fields[1]
              record._fields[0].properties["tamaño"] = record._fields[2]
              record._fields[0].properties["marca"] = record._fields[3]
              record._fields[0].properties["transmision"] = record._fields[4]
              record._fields[0].properties["puertas"] = record._fields[5]
              respuesta.cars.push(record._fields[0].properties)

            })

            res.json(respuesta)
          })

      } else if (edad > 60) {
        session.run('MATCH (c:Car)-[]-(t:Traccion),(c:Car)-[]-(y:Tamaño),(c:Car)-[]-(b:Brand),(c:Car)-[]-(u:Transmision),(c:Car)-[]-(p:Puerta) where (c.cv < 150 and u.name="AUTOMATIC") return c,t.name,y.name,b.name,u.name,p.numero')
          .then(async results => {

            results.records.forEach(function (record) {

              record._fields[0].properties["traccion"] = record._fields[1]
              record._fields[0].properties["tamaño"] = record._fields[2]
              record._fields[0].properties["marca"] = record._fields[3]
              record._fields[0].properties["transmision"] = record._fields[4]
              record._fields[0].properties["puertas"] = record._fields[5]
              respuesta.cars.push(record._fields[0].properties)

            })

            res.json(respuesta)
          })
      }
    })
    .catch(error => {
      console.log(error);

      driver.close()
    })
});

app.post("/recomendacion", function(req,res){
  respuesta = {
     cars:[]
  }
  var email = req.body.email;
  session.run('MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[:LIKES]-(pep:Usuario)  Match (pep)-[:LIKES]-(c:Car) where not exists((ser)-[:LIKES]-(c)) with c MATCH (c:Car)-[]-(t:Traccion),(c:Car)-[]-(y:Tamaño),(c:Car)-[]-(b:Brand),(c:Car)-[]-(u:Transmision),(c:Car)-[]-(p:Puerta) return distinct c,t.name,y.name,b.name,u.name,p.numero limit 47')
    .then(results => {
      results.records.forEach(function(record){
        
        record._fields[0].properties["traccion"] = record._fields[1]
        record._fields[0].properties["tamaño"] = record._fields[2]
        record._fields[0].properties["marca"] = record._fields[3]
        record._fields[0].properties["transmision"] = record._fields[4]
        record._fields[0].properties["puertas"] = record._fields[5]
        respuesta.cars.push(record._fields[0].properties)
        
      })
      
      res.json(respuesta)
    })
    .catch(error => {
      console.log(error);
      driver.close()
    })
  }),

app.post("/like", function (req, res) {
  var email = req.body.email
  var id = req.body.id
  session.run('MATCH (u:Usuario{email:"' + email + '"}),(c:Car{id:"' + id + '"}) MERGE (u)-[r:LIKES]->(c)')
    .then(results => {
      if (results.records.length != 0) {

        res.json({ error: "No se encuentra" })
      }
      else {
        res.json({ correcto: "Relacion creada correctamente" })
      }
    })

})

app.listen(port, function () {
  console.log("Example app listening on port " + 3000);
});
