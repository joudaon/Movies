'use strict';

angular.module ('moviesApp')

	.controller ('InsertController', ['$scope', function($scope){
		$scope.mymovies = [];
		
		$scope.addMovie = function(){
			$scope.mymovies.push($scope.movie);
			$scope.movie = {};
		}
			
	}])
	
;