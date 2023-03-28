const capitalize = require('./capitalize');
const { Activity } = require('../db');
const getCountryById = require('./getCountryById');

module.exports = async (activity) => {

   let { nombre, descripcion, dificultad, duracion, temporada, paises = [] } = activity;

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

            paises.forEach(async (response) => {
               if (response.error) return errors.push(response.error);

               await activityCreated.addCountry(response.country);
            })
         } catch (err) {
            console.log(err);
         }
      }
   } catch (err) {
      console.log(err);
   }
}