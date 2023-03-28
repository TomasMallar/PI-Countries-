const axios = require('axios');

module.exports = async () => {
   let data = {};
   const urlAPI = 'https://restcountries.com/v3/all';

   try {
      const response = await axios.get(urlAPI);
      data.countries = response.data;
   } catch (err) {
      console.log(err);
      data.error = {
         status: err.response.status,
         message: err.response.statusText
      };
   }

   return data;
}