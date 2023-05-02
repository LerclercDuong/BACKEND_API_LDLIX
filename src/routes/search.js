const express = require('express');
const router = express.Router();
const search = require('../API/controllers/search');

router.get('/:slug', search.findByName);




module.exports = router;