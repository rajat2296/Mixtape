'use strict';
var request = require('request');
var Session = require('./session.model');
const CONFIG = require('../config/environment');
var querystring = require('querystring');
var async = require('async');
var ObjectId = require('mongoose').Types.ObjectId

exports.spotify = {
  authorize: function(req, res) {
  	var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private user-top-read'
		var qs = querystring.stringify({
      response_type: 'code',
      client_id: CONFIG.APP_DATA.CLIENT_ID,
      scope: scope,
      redirect_uri: CONFIG.APP_DATA.REDIRECT_URI
	  });
	  return res.status(200).send({url: 'https://accounts.spotify.com/authorize?' + qs});
  },

  callback: function(req, res) {
  	if(req.query.error) {
  		return res.redirect('/?error='+req.query.error);
  	}
		request({
			method: 'POST',
			url: 'https://accounts.spotify.com/api/token',
			form: {
  			code: req.query.code,
  			redirect_uri: CONFIG.APP_DATA.REDIRECT_URI,
  			grant_type: 'authorization_code'
			},
      headers: {
        'Authorization': 'Basic ' + (new Buffer(CONFIG.APP_DATA.CLIENT_ID + ':' + CONFIG.APP_DATA.CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
		}, function(error, response, body) {
			body = typeof body == 'string'? JSON.parse(body): body;
			if(body && body.access_token && body.refresh_token) {
				return res.redirect('/playlist?' + querystring.stringify(body));
			} 
			return res.redirect('/?error=Something went wrong. Please try again.');
		})
  }
}
