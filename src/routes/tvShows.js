const express = require('express');
const router = express.Router();
const tvShows= require('../API/controllers/tvShows');


router.get('/:category/:page', tvShows.getSeriesByCategory);
// router.get('/series/:category/:page', movies.getSeriesByCategory);

module.exports = router;