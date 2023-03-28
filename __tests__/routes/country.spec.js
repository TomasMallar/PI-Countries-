/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const countries = [
  { id: "ESP", nombre: "España", continente: "South America", imagen_bandera: "www.imagenes/bandera.png", capital: "Desconocida" },
  { id: "ECU", nombre: "Ecuador", continente: "South America", imagen_bandera: "www.imagenes/bandera.png", capital: "Desconocida" },
  { id: "PER", nombre: "Peru", continente: "South America", imagen_bandera: "www.imagenes/bandera.png", capital: "Desconocida" },
  { id: "OLR", nombre: "Ruanda", continente: "America", imagen_bandera: "www.imagenes/bandera.png", capital: "Desconocida" }
];

describe('Ruta Countries', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.bulkCreate(countries, { validate: true })));

  // Test 1 
  describe('GET /countries', () => {
    it('debería responder con un status 200', () =>
      agent.get('/countries').expect(200)
    );
    it('debería retornar un objeto en formato json', () =>
      agent.get('/countries').expect('Content-type', "application/json; charset=utf-8")
    );
    it('debería retornar la informacion de todos los países', (done) => {
      agent.get('/countries')
        .end((err, res) => {
          // console.log(res.body);
          expect(res.body).to.have.length(countries.length);
          done();
        })
    }
    );
  });

  // Test 2
  describe('GET /countries?name=queryValue', () => {

    describe('GET countries?name=ua', () => {
      it('debería responder con un status 200 cuando hay coincidencias', () =>
        agent.get('/countries?name=ua').expect(200)
      );

      it('debería retornar la informacion de los paises que matchean', (done) => {
        agent.get('/countries?name=ua')
          .end((err, res) => {
            // console.log(res.body);
            expect(res.body.length).is.greaterThan(0);
            done();
          })
      }
      );

    })
  });

  // Test 3
  describe('GET /countries/:idPais', () => {

    describe('GET /countries/ecu', () => {
      it('debería responder con un status 200 cuando matchea con un país', () =>
        agent.get('/countries/ecu').expect(200)
      );

      it('debería retornar la informacion del país que matchea', (done) => {
        agent.get('/countries/ecu')
          .end((err, res) => {
            // console.log(res.body);
            expect(res.body.nombre).includes("Ecuador");
            done();
          })
      });
    })


    describe('GET /countries/123', () => {
      it('debería responder con un status 404 cuando no matchea con ningun país', () =>
        agent.get('/countries/123').expect(404)
      );
    })

  });

});
