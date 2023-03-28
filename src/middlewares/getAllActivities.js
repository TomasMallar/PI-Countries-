const { Activity } = require('../db');
const { Op } = require('sequelize');

module.exports = async (req, res, next) => {

   try {
      let activities = await Activity.findAll({});
      req.activities = activities;
   } catch (err) {
      console.log(err);
      req.error = {};
   }

   next();
}