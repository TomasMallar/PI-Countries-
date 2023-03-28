const { Router } = require('express');
const { getAllContinents, getCountriesByContinent } = require('../middlewares');

const router = Router();


router.get('/', getAllContinents, (req, res, next) => {
   req.error ? next(req.error) : res.json(req.continents);
})

router.get('/:nombre', getCountriesByContinent, (req, res, next) => {
   req.error ? next(req.error) : res.json(req.countries);
})

module.exports = router;