const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Modelo Country', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  const completeCountry = { nombre: "España", continente: "South America", imagen_bandera: "www.imagenes/bandera.png", capital: "Desconocida" };

  // VALIDATORS 
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));

    // TEST 1: nombre
    describe('nombre', () => {
      it('debería lanzar un error si el campo "nombre" es null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('debería funcionar cuando se envía un "nombre" válido', () => {
        Country.create(completeCountry);
      });
    });

    // TEST 2: imagen_bandera
    describe('imagen_bandera', () => {
      it('debería lanzar un error si el campo "imagen_bandera" es null', (done) => {
        Country.create({ nombre: "España", continente: "South America", capital: "Desconocida" })
          .then(() => done(new Error('It requires a valid imagen_bandera')))
          .catch(() => done());
      });
      it('debería funcionar cuando se envía una "imagen_bandera" válida"', () => {
        Country.create(completeCountry);
      });
    });

    // TEST 3: continente
    describe('continente', () => {
      it('debería lanzar un error si el campo "continente" es null', (done) => {
        Country.create({ nombre: "España", imagen_bandera: "www.imagenes/bandera.png", capital: "Desconocida" })
          .then(() => done(new Error('Se requiere un "continente" válido')))
          .catch(() => done());
      });
      it('debería funcionar cuando se envía un "continente" válido', () => {
        Country.create(completeCountry);
      });
    });

    // TEST 3: capital
    describe('capital', () => {
      it('debería lanzar un error si el campo "capital" es null', (done) => {
        Country.create({ nombre: "España", imagen_bandera: "www.imagenes/bandera.png" })
          .then(() => done(new Error('Se requiere una "capital" válida')))
          .catch(() => done());
      });
      it('debería funcionar cuando se envía una "capital" válida', () => {
        Country.create(completeCountry);
      });
    });
  });
});
