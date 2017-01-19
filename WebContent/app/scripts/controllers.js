'use strict';

angular.module ('moviesApp')

	//Insert Movie Controller - insert.html
	.controller ('InsertController', ['$scope', 'movieFactory', function($scope, movieFactory){
		$scope.mymovies = [];
		
		$scope.addMovie = function(){
			$scope.mymovies.push($scope.movie);
			$scope.movie = {};
		}
		
		//Get dishes from db_movies.json
		movieFactory.getMovies().query(
                function(response) {
                    $scope.movies = response;
                    //$scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
		
			
	}])
	
;