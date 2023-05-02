const express = require('express');
const router = express.Router();
const movies = require('../API/controllers/movies');

router.get('/:page', movies.getMovies);
router.get('/', movies.getMoviesCategory);
router.get('/theater/:page', movies.getTheaterMovies);
router.get('/:category/:page', movies.getMoviesByCategory);



module.exports = router;