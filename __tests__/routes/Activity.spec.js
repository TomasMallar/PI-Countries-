/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Activity, conn } = require('../../src/db.js');

const agent = session(app);

const activities = [
  {
    nombre: "Buceo",
    descripcion: "Es una actividad muy divertida",
    dificultad: 3,
    duracion: 12,
    temporada: "Invierno"
  },
  {
    nombre: "Alpinismo",
    descripcion: "Es una actividad que te mantendrá saludable",
    dificultad: 4,
    duracion: 35,
    temporada: "Verano"
  }
];

describe('Ruta Activities', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Activity.sync({ force: true })
    .then(() => Activity.bulkCreate(activities, { validate: true })));

  // Test 1 
  describe('GET /activity', () => {
    it('debería responder con un status 200', () =>
      agent.get('/activity').expect(200)
    );
    it('debería retornar un objeto en formato json', () =>
      agent.get('/activity').expect('Content-type', "application/json; charset=utf-8")
    );
    it('debería retornar la informacion de todas los actividades', (done) => {
      agent.get('/activity')
        .end((err, res) => {
          // console.log(res.body);
          expect(res.body).to.have.length(activities.length);
          done();
        })
    }
    );
  });

  // Test 2
  describe('POST /activity', () => {
    it('debería responder con un status 201 al enviarle la informacion correcta', (done) => {
      agent.post('/activity')
        .send({ ...activities[0], paises: ["ecu", "per"] })
        .expect(201)
      done();
    }
    );

    it('debería responder con un status 400 Bad Request cuando falta información en el body', (done) => {
      agent.post('/activity')
        .send({})
        .expect(400)
      done();
    }
    );

  });

});
