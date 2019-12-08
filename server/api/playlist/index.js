'use strict';

var express = require('express');
var controller = require('./playlist.controller');

var router = express.Router();

router.get('/track', controller.searchTrack);
router.get('/similarTracks', controller.getSimilarTracks);

module.exports = router;