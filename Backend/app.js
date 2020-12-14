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
  session.run('MATCH (c:Car)-[]-(t:Traccion),(c:Car)-[]-(y:Tamano),(c:Car)-[]-(b:Brand),(c:Car)-[]-(u:Transmision),(c:Car)-[]-(p:Puerta) return c,t.name,y.name,b.name,u.name,p.numero ')
    .then(async results => {

      results.records.forEach(function (record) {

        record._fields[0].properties["traccion"] = record._fields[1]
        record._fields[0].properties["tamano"] = record._fields[2]
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
        session.run('MATCH (c:Car)-[]-(t:Traccion),(c:Car)-[]-(y:Tamano),(c:Car)-[]-(b:Brand),(c:Car)-[]-(u:Transmision),(c:Car)-[]-(p:Puerta) where (c.cv < 200 and p.numero= 2 and c.year>2000 and  y.name<>"Large") return c,t.name,y.name,b.name,u.name,p.numero')
          .then(async results => {

            results.records.forEach(function (record) {

              record._fields[0].properties["traccion"] = record._fields[1]
              record._fields[0].properties["tamano"] = record._fields[2]
              record._fields[0].properties["marca"] = record._fields[3]
              record._fields[0].properties["transmision"] = record._fields[4]
              record._fields[0].properties["puertas"] = record._fields[5]
              respuesta.cars.push(record._fields[0].properties)

            })

            res.json(respuesta)
          })

      } else if (edad > 28 && edad <= 37) {
        session.run('MATCH (c:Car)-[]-(t:Traccion),(c:Car)-[]-(y:Tamano),(c:Car)-[]-(b:Brand),(c:Car)-[]-(u:Transmision),(c:Car)-[]-(p:Puerta) where (c.cv > 150 and c.cv < 300 and t.name<>"front wheel drive" and y.name<>"Compact") return c,t.name,y.name,b.name,u.name,p.numero')
          .then(async results => {

            results.records.forEach(function (record) {

              record._fields[0].properties["traccion"] = record._fields[1]
              record._fields[0].properties["tamano"] = record._fields[2]
              record._fields[0].properties["marca"] = record._fields[3]
              record._fields[0].properties["transmision"] = record._fields[4]
              record._fields[0].properties["puertas"] = record._fields[5]
              respuesta.cars.push(record._fields[0].properties)

            })

            res.json(respuesta)
          })

      } else if (edad > 37 && edad <= 60) {
        session.run('MATCH (c:Car)-[]-(t:Traccion),(c:Car)-[]-(y:Tamano),(c:Car)-[]-(b:Brand),(c:Car)-[]-(u:Transmision),(c:Car)-[]-(p:Puerta) where (c.cv > 150 and c.cv < 300 and  y.name="Large") return c,t.name,y.name,b.name,u.name,p.numero')
          .then(async results => {

            results.records.forEach(function (record) {

              record._fields[0].properties["traccion"] = record._fields[1]
              record._fields[0].properties["tamano"] = record._fields[2]
              record._fields[0].properties["marca"] = record._fields[3]
              record._fields[0].properties["transmision"] = record._fields[4]
              record._fields[0].properties["puertas"] = record._fields[5]
              respuesta.cars.push(record._fields[0].properties)

            })

            res.json(respuesta)
          })

      } else if (edad > 60) {
        session.run('MATCH (c:Car)-[]-(t:Traccion),(c:Car)-[]-(y:Tamano),(c:Car)-[]-(b:Brand),(c:Car)-[]-(u:Transmision),(c:Car)-[]-(p:Puerta) where (c.cv < 150 and u.name="AUTOMATIC") return c,t.name,y.name,b.name,u.name,p.numero')
          .then(async results => {

            results.records.forEach(function (record) {

              record._fields[0].properties["traccion"] = record._fields[1]
              record._fields[0].properties["tamano"] = record._fields[2]
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

app.post("/recomendacion", function (req, res) {
  respuesta = {
    cars: []
  }
  var email = req.body.email;
  session.run('MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[:LIKES]-(pep:Usuario)  Match (pep)-[:LIKES]-(c:Car) where not exists((ser)-[:LIKES]-(c)) with c MATCH (c:Car)-[]-(t:Traccion),(c:Car)-[]-(y:Tamano),(c:Car)-[]-(b:Brand),(c:Car)-[]-(u:Transmision),(c:Car)-[]-(p:Puerta) return distinct c,t.name,y.name,b.name,u.name,p.numero')
    .then(results => {
      results.records.forEach(function (record) {

        record._fields[0].properties["traccion"] = record._fields[1]
        record._fields[0].properties["tamano"] = record._fields[2]
        record._fields[0].properties["marca"] = record._fields[3]
        record._fields[0].properties["transmision"] = record._fields[4]
        record._fields[0].properties["puertas"] = record._fields[5]
        respuesta.cars.push(record._fields[0].properties)

      })

      //ELIMINACION DE PUERTAS
      session.run('MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Puerta) where p.numero=2 return count(p.numero) union ALL MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Puerta) where p.numero=4 return count(p.numero) union ALL MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Puerta) return count(p.numero)')
        .then(results => {
          //Elimina 4 puertas
          if ((results.records[0]._fields / results.records[2]._fields) > 0.65) {
            console.log("Elimina 4 puertas")
            for (var i = 0; i < respuesta.cars.length; i++) {
              if (respuesta.cars[i].puertas == 4) {
                respuesta.cars.splice(i, 1)
                i--
              }
            }

          } else if ((results.records[1]._fields / results.records[2]._fields) > 0.65) { //elimina 2 puertas
            console.log("Elimina 2 puertas")
            for (var i = 0; i < respuesta.cars.length; i++) {
              if (respuesta.cars[i].puertas == 2) {
                respuesta.cars.splice(i, 1)
                i--
              }
            }
          }
          console.log("despues de elimina puertas" + respuesta.cars.length)
          //ELIMINACION DE TRANSMISION

          session.run('MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Transmision) where p.name="MANUAL" return count(p.name) union ALL MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Transmision) where p.name="AUTOMATIC" return count(p.name) union ALL MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Transmision) return count(p.name)')
            .then(results => {
              //Elimina AUTOMATIC
              if ((results.records[0]._fields / results.records[2]._fields) > 0.65) {
                console.log("Elimina Automatic ")
                for (var i = 0; i < respuesta.cars.length; i++) {
                  if (respuesta.cars[i].transmision == "AUTOMATIC") {
                    respuesta.cars.splice(i, 1)
                    i--
                  }
                }

              } else if ((results.records[1]._fields / results.records[2]._fields) > 0.65) { //elimina MANUAL
                console.log("Elimina Manual")
                for (var i = 0; i < respuesta.cars.length; i++) {
                  if (respuesta.cars[i].tracccion == "MANUAL") {
                    respuesta.cars.splice(i, 1)
                    i--
                  }
                }

              }


              //ELIMINACION DE TAMAÑO
              session.run('MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Tamano) where p.name="Compact" return count(p.name) union ALL MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Tamano) where p.name="Midsize" return count(p.name) union ALL MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Tamano) where p.name="Large" return count(p.name) union ALL MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Tamano) return count(p.name)')
                .then(results => {
                  //Elimina Midsize y Large
                  if ((results.records[0]._fields / results.records[3]._fields) > 0.55) {
                    console.log("Elimina Midsize y Large")
                    for (var i = 0; i < respuesta.cars.length; i++) {

                      if (respuesta.cars[i].tamano == "Midsize") {
                        respuesta.cars.splice(i, 1)
                        i = 0
                      }
                      if (respuesta.cars[i].tamano == "Large") {
                        respuesta.cars.splice(i, 1)
                        i = -1
                      }
                    }

                  } else if ((results.records[1]._fields / results.records[3]._fields) > 0.55) { //elimina compact y Large
                    console.log("Elimina Compact y Large")
                    for (var i = 0; i < respuesta.cars.length; i++) {

                      if (respuesta.cars[i].tamano == "Compact") {
                        respuesta.cars.splice(i, 1)
                        i = 0
                      }
                      if (respuesta.cars[i].tamano == "Largue") {
                        respuesta.cars.splice(i, 1)
                        i = -1
                      }
                    }
                  } else if ((results.records[2]._fields / results.records[3]._fields) > 0.55) { //elimina compact y midsize
                    console.log("Elimina Compact y Midsize")
                    for (var i = 0; i < respuesta.cars.length; i++) {

                      if (respuesta.cars[i].tamano == "Compact") {
                        respuesta.cars.splice(i, 1)
                        i = 0
                      }
                      if (respuesta.cars[i].tamano == "Midsize") {
                        respuesta.cars.splice(i, 1)
                        i = -1
                      }
                    }
                  }
                  
                  //ELIMINA TRACCION

                  session.run('MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Traccion) where p.name="rear wheel drive" return count(p.name) union ALL MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Traccion) where p.name="front wheel drive" return count(p.name) union ALL MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Traccion) where p.name="all wheel drive" return count(p.name) union ALL MATCH (ser:Usuario{email:"' + email + '"})-[:LIKES]-(a:Car)-[]-(p:Traccion) return count(p.name)')
                    .then(results => {
                      //Elimina Front y all
                      if ((results.records[0]._fields / results.records[3]._fields) > 0.55) {
                        for (var i = 0; i < respuesta.cars.length; i++) {

                          if (respuesta.cars[i].traccion == "front wheel drive") {
                            respuesta.cars.splice(i, 1)
                            i = 0
                          }
                          if (respuesta.cars[i].traccion == "all wheel drive") {
                            respuesta.cars.splice(i, 1)
                            i = -1
                          }
                        }

                      } else if ((results.records[1]._fields / results.records[3]._fields) > 0.55) { //elimina rear y all
                        
                        for (var i = 0; i < respuesta.cars.length; i++) {
                           
                          if (respuesta.cars[i].traccion == "rear wheel drive") {
                            respuesta.cars.splice(i, 1)
                            i = 0
                          }
                          if (respuesta.cars[i].traccion == "all wheel drive") {
                            respuesta.cars.splice(i, 1)
                            i = -1
                          }
                        }
                      } else if ((results.records[2]._fields / results.records[3]._fields) > 0.55) { //elimina front y rear
                        console.log("Elimina Compact y Midsize")
                        for (var i = 0; i < respuesta.cars.length; i++) {

                          if (respuesta.cars[i].traccion == "rear wheel drive") {
                            respuesta.cars.splice(i, 1)
                            i = 0
                          }
                          if (respuesta.cars[i].traccion == "front wheel drive") {
                            respuesta.cars.splice(i, 1)
                            i = -1
                          }
                        }
                      }

                      res.json(respuesta)
                    })
                })

            })

        })



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
