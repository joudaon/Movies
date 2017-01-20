'use strict';

angular.module ('moviesApp')

	//Insert Movie Controller - insert.html
	.controller ('InsertController', ['$scope', 'movieFactory', function($scope, movieFactory){
		//Test 
		$scope.mymovies = [];
		
		$scope.addMovie = function(){
			$scope.mymovies.push($scope.movie);
			$scope.movie = {};
		}
					
	}])
	
	.controller ('VideoLibraryController', ['$scope', 'movieFactory', function($scope, movieFactory){		
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