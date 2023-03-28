const { Country } = require('../db');

module.exports = async (req, res, next) => {

   const { nombre } = req.params;

   try {
      let countries = await Country.findAll({
         where: {
            continente: nombre
         }
      });

      req.countries = countries;
   } catch (err) {
      console.log(err);
      req.error = {};
   }

   next();
}