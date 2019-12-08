'use strict';

angular.module('playlistMaker')
.controller('playlistCtrl',['$scope', '$http', 'User', 'growl', 'blockUI', 'currentUser', function ($scope, $http, User, growl, blockUI, currentUser) {

	$scope.user = currentUser;
	$scope.tracks = [];
	$scope.selectedTrack = {};
	$scope.selectedTrack = function() {
		$scope.tracks.push({name: 'Track1'});
	}

	$scope.selectTrack = function(track) {
		console.log("select track", track);
	}

	$scope.searchTrackByName = function(track) {
		return $http.get('/api/playlist/track?track='+track).then(function(result) {
			return _.map(result.data.tracks.items, function(item) {
				item.displayName = item.name + ' (' + item.artists[0].name + ')';
				return item;
			});
		}).catch(function(err) {
			return [];
		})
	}

	$scope.searchSimilarTracks = function(track){
		$scope.recommendations = [];
		$http.get('/api/playlist/similarTracks?track='+track.id).then(function(result) {
			$scope.recommendations = result.data.tracks
			console.log($scope.recommendations);
		}).catch(function(err) {
			return [];
		})
	}

}]);
