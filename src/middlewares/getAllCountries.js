const { Country } = require('../db');
const { Op } = require('sequelize');

module.exports = async (req, res, next) => {
   let { name } = req.query;
   let countries;
   if (name) {
      // console.log(name);
      name = name.toLowerCase();
      countries = await Country.findAll({
         where: {
            [Op.or]: [
               {
                  nombre: {
                     [Op.iLike]: name
                  }
               },
               {
                  nombre: {
                     [Op.iLike]: `%${name}`
                  }
               },
               {
                  nombre: {
                     [Op.iLike]: `${name}%`
                  }
               },
               {
                  nombre: {
                     [Op.iLike]: `%${name}%`
                  }
               },
            ]
         }
      });

      countries.length ? (
         req.countries = countries
      ) : (
         req.error = {
            status: 404,
            message: 'Ningún país coincide con el criterio de búsqueda'
         });
   } else {
      try {
         countries = await Country.findAll({});
         req.countries = countries;
      } catch (err) {
         console.log(err);
         req.error = {};
      }
   }

   next();
}