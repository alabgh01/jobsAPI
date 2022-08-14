/* jshint esversion: 8 */
/* jshint node: true */

const express = require('express');
const router = express.Router();
const {login, register} = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
