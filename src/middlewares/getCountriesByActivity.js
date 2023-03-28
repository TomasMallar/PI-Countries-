const { Country, Activity } = require('../db');
const { Op } = require('sequelize');

module.exports = async (req, res, next) => {
   let { activity } = req.query;
   let countries;
   if (activity) {
      // console.log(activity);
      activity = activity.toLowerCase();

      try {
         countries = await Country.findAll({
            include: [{
               model: Activity,
               required: true,
               where: {
                  [Op.or]: [
                     {
                        nombre: {
                           [Op.iLike]: activity
                        }
                     },
                     {
                        nombre: {
                           [Op.iLike]: `%${activity}`
                        }
                     },
                     {
                        nombre: {
                           [Op.iLike]: `${activity}%`
                        }
                     },
                     {
                        nombre: {
                           [Op.iLike]: `%${activity}%`
                        }
                     },
                  ]
               }
            }],
         });

         if (countries.length) {
            // console.log(countries);
            countries.actividades = countries.Activities;
            delete countries.Activities;

            req.countries = countries
         } else {
            req.error = {
               status: 404,
               message: 'Ningún país coincide con el criterio de búsqueda'
            };
         }
      } catch (error) {
         console.log(error);
      }
   } else {
      req.error = {
         status: 404,
         message: 'Ningún país coincide con el criterio de búsqueda'
      };
   }

   next();
}