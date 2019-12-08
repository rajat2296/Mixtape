'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var request = require('request')

/**
 * Get my info
 */
exports.me = function(req, res){
  console.log(req.headers, req.headers['Authorization']);
  request({
    method: 'GET',
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': req.headers['authorization']
    },
  }, function(error, response, body) {
    if(response && response.statusCode == 200) {
      return res.status(200).send(body);
    }
    return res.status(500).send(body||error)
  });
};

exports.getArtists = function(req, res) {
  request({
    method: 'GET',
    url: 'https://api.spotify.com/v1/me/top/artists',
    headers: {
      'Authorization': req.headers['authorization']
    },
  }, function(error, response, body) {
    console.log(response.statusCode, body);
    if(response && response.statusCode == 200) {
      return res.status(200).send(body);
    }
    return res.status(500).send(body||error)
  });
}