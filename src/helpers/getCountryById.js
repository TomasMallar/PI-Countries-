const { Country } = require('../db');

module.exports = async (id) => {
   let res = {};

   try {
      const country = await Country.findByPk(id.toUpperCase());

      country ? res.country = country : res.error = `No se ha encontrado un pais con id ${id}`;
   } catch (error) {
      console.log(error);
      res.error = {
         message: error.message,
         id: id
      };
   }

   return res;
}