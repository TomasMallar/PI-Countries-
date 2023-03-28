const { Country } = require('../db');

module.exports = async (req, res, next) => {

   try {
      let continents = await Country.findAll({ attributes: ["continente"], group: "continente" });
      if (continents.length) {
         continents = continents.map(continent => {
            return { nombre: continent.continente }
         })
      }
      req.continents = continents;
   } catch (err) {
      console.log(err);
      req.error = {};
   }

   next();
}