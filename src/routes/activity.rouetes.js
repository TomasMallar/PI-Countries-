const { Router } = require('express');
const { Activity } = require('../db');
const { getCountryById, capitalize } = require('../helpers');
const { getAllActivities, validateActivity } = require('../middlewares');

const router = Router();

// @route GET /activity
// @desc Get all categories
// @access Public
router.get('/', getAllActivities, (req, res, next) => {
   req.error ? next(req.error) : res.json(req.activities);
})

// @route POST /activity
// @desc Create a new activity
// @access Public
router.post('/', validateActivity,
   async (req, res, next) => {
      const { errors } = req;

      if (errors) return next({
         message: 'Ha fallado la validación',
         errors
      });

      let { nombre, descripcion, dificultad, duracion, temporada, paises = [] } = req.body;

      const newActivity = {
         nombre,
         descripcion: descripcion.trim(),
         dificultad: dificultad.trim(),
         duracion,
         temporada: capitalize(temporada)
      };

      try {
         let activityCreated = await Activity.create(newActivity);

         if (paises.length) {
            try {
               paises = paises.map((idPais) => getCountryById(idPais));
               paises = await Promise.all(paises);

               const errors = [];

               paises.forEach(async (response) => {
                  if (response.error) return errors.push(response.error);

                  await activityCreated.addCountry(response.country);
               })

               if (errors.length) {
                  return res.status(400).json({
                     message: 'Se ha creado la actividad con errores',
                     errors
                  });
               }

            } catch (err) {
               // console.log(err);
               return res.status(201).json({
                  message: 'Se ha creado la actividad pero no ha podido enlazarse a los países indicados'
               });
            }
         }

         res.status(201).end();
      } catch (err) {
         console.log(err);
         next({});
      }


   })

module.exports = router;