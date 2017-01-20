'use strict';

angular.module ('moviesApp')

	//Insert Movie Controller - insert.html
	.controller ('InsertController', ['$scope', 'insertmovieFactory', function($scope, insertmovieFactory){
		//Insert the movie in the db.json file
		$scope.addMovie = function(){
			console.log($scope.movie);
			insertmovieFactory.saveMovie().save({id:$scope.movie.id}, $scope.movie);
		}
					
	}])
	
	.controller ('VideoLibraryController', ['$scope', 'videolibraryFactory', function($scope, videolibraryFactory){		
		//Get dishes from db_movies.json
		videolibraryFactory.getMovies().query(
                function(response) {
                    $scope.movies = response;
                    //$scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });					
	}])
	
;