const { Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Modelo Activity', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  const completeActivity = {
    nombre: "Buceo",
    descripcion: "Es una actividad muy divertida",
    dificultad: 3,
    duracion: 12,
    temporada: "Invierno"
  };

  // VALIDATORS 
  describe('Validators', () => {
    beforeEach(() => Activity.sync({ force: true }));

    // TEST 1: nombre
    describe('nombre', () => {
      it('debería lanzar un error si el campo "nombre" es null', (done) => {
        Activity.create({ ...completeActivity, nombre: null })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

    });

    // TEST 2: descripcion
    describe('descripcion', () => {
      it('debería lanzar un error si el campo "descripcion" es null', (done) => {
        Activity.create({ ...completeActivity, descripcion: null })
          .then(() => done(new Error('It requires a valid "descripcion"')))
          .catch(() => done());
      });
    });

    // TEST 3: dificultad
    describe('dificultad', () => {

      it('debería lanzar un error si el campo "dificultad" es mayor a 5', (done) => {
        Activity.create({ ...completeActivity, dificultad: 6 })
          .then(() => done(new Error('El valor de dificultad debe ser como máximo 5')))
          .catch(() => done());
      });

      it('debería lanzar un error si el campo "dificultad" es menor a 1', (done) => {
        Activity.create({ ...completeActivity, dificultad: 0 })
          .then(() => done(new Error('El valor de dificultad debe ser mayor a 1')))
          .catch(() => done());
      });
    });

    // TEST 4: duracion
    describe('duracion', () => {

      it('debería lanzar un error si el campo "duracion" es mayor a 48', (done) => {
        Activity.create({ ...completeActivity, duracion: 49 })
          .then(() => done(new Error('El valor de duracion debe ser como máximo 48')))
          .catch(() => done());
      });

      it('debería lanzar un error si el campo "duracion" es menor a 1', (done) => {
        Activity.create({ ...completeActivity, duracion: 0 })
          .then(() => done(new Error('El valor de duracion debe ser mayor a 1')))
          .catch(() => done());
      });
    });
  });
});
