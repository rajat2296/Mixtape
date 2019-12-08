'use strict';

var express = require('express');
var router = express.Router();
var auth = require('./auth.service');

router.post('/', auth.spotify.authorize);
router.get('/callback', auth.spotify.callback)

module.exports = router;