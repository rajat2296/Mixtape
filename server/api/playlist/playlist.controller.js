/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var request = require('request');

exports.searchTrack = function(req, res) {
  request({
    method: 'GET',
    url: 'https://api.spotify.com/v1/search?q='+req.query.track+'&type=track',
    headers: {
      'Authorization': req.headers['authorization']
    },
  }, function(error, response, body) {
    if(response && response.statusCode == 200) {
      return res.status(200).send(body);
    }
    return res.status(500).send(body||error)
  });
}

exports.getSimilarTracks = function(req, res) {
  request({
    method: 'GET',
    url: 'https://api.spotify.com/v1/recommendations?seed_tracks='+req.query.track,
    headers: {
      'Authorization': req.headers['authorization']
    },
  }, function(error, response, body) {
    if(response && response.statusCode == 200) {
      return res.status(200).send(body);
    }
    return res.status(500).send(body||error)
  });
}

function handleError(res, err) {
  return res.status(500).send(err);
}