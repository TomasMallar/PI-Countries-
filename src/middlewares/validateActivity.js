const { capitalize } = require("../helpers")

module.exports = (req, res, next) => {
   const { nombre, descripcion, dificultad, duracion, temporada, paises } = req.body;
   const errors = [];

   // console.log(req.body);

   //VALIDO CAMPO NOMBRE
   if (!nombre) {
      errors.push({ campo: "nombre", detalles: "Es un campo requerido" })
   } else if (typeof nombre !== "string") {
      errors.push({ campo: "nombre", detalles: "El campo nombre debe ser un String" })
   } else if (!nombre.trim()) {
      errors.push({ campo: "nombre", detalles: "No puede estar vacío" })
   }

   //VALIDO CAMPO DESCRIPCION
   if (!descripcion) {
      errors.push({ campo: "descripcion", detalles: "Es un campo requerido" })
   } else if (typeof descripcion !== "string") {
      errors.push({ campo: "descripcion", detalles: "Debe ser un String" })
   } else if (!descripcion.trim()) {
      errors.push({ campo: "descripcion", detalles: "No puede estar vacío" })
   }

   //VALIDO CAMPO DIFICULTAD
   const validateNumber = (str) => /^(\d|-)?(\d|,)*\.?\d*$/.test(str);
   const isEntero = (value) => parseFloat(value) % 1 === 0;
   if (!validateNumber(dificultad)) {
      errors.push({ campo: "dificultad", detalles: "Debe ser un numero" })
   } else if (!isEntero(dificultad)) {
      errors.push({ campo: "dificultad", detalles: "Debe ser un numero entero" })
   } else if (parseInt(dificultad) < 1 || parseInt(dificultad) > 5) {
      errors.push({ campo: "dificultad", detalles: "Debe estar en el rango de 1 a 5" })
   }

   //VALIDO CAMPO DURACIÓN
   if (!validateNumber(duracion)) {
      errors.push({ campo: "duracion", detalles: "Debe ser un numero" })
   } else if (parseFloat(duracion) < 1 || parseFloat(duracion) > 48) {
      errors.push({ campo: "duracion", detalles: "Debe ser un número entre 1 y 48 correspondiente a las horas de duración" })
   }

   // VALIDO CAMPO TEMPORADA
   const temporadaValida = (str) => {
      return ['Invierno', 'Verano', 'Primavera', 'Otoño'].includes(capitalize(str));
   }
   if (typeof temporada !== "string") {
      errors.push({ campo: "temporada", detalles: "Debe ser un String" })
   } else if (!temporada.trim()) {
      errors.push({ campo: "temporada", detalles: "No puede estar vacío" })
   } else if (!temporadaValida(temporada)) {
      errors.push({ campo: "temporada", detalles: "Debe ser un valor valido: invierno, verano, primavera, otoño" })
   }

   // VALIDO CAMPO PAISES
   if (!(paises instanceof Array)) {
      errors.push({ campo: "paises", detalles: "Debe ser un array" })
   }
   // else {
   //    const invalids = paises.filter(pais => typeof pais !== "string" || pais.length !== 3);
   //    invalids.length > 0 && (
   //       errors.push({ campo: "paises", detalles: "Debe contener ids de paises validos" })
   //    );
   // }

   // ADJUNTO LOS ERRORES
   errors.length > 0 && (req.errors = errors);
   next();
}