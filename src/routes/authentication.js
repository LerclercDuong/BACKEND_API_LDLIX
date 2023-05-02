const express = require('express');
const router = express.Router();
const authenticate = require('../API/controllers/authentication');

router.post('/register', authenticate.register);
router.post('/login', authenticate.login);

module.exports = router;