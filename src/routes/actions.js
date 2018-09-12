'use strict';

let express = require('express');
let router = express.Router();
// Require actions controller module
let main_controller = require('../controllers/mainController');

// Set default route to our default controller action
router.post('/', main_controller.number_series_retrieve);

// Set all other routes as not implemented
router.all('*', main_controller.not_implemented);

module.exports = router;