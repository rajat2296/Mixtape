'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var SessionSchema = new Schema({
  access_token: String,
  refresh_token: String,
});

module.exports = mongoose.model('Session', SessionSchema);
