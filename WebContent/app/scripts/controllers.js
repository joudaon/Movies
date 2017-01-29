'use strict';

angular.module ('moviesApp')
	
	//Configurates the growl
	.config(['growlProvider', function (growlProvider) {
		growlProvider.globalTimeToLive(5000);
		growlProvider.globalPosition('top-right');
	}])

	/*------------Insert Movie Controller - insert.html ------------*/
	.controller ('InsertMovieController', ['$scope', 'insertmovieFactory', 'growl', function($scope, insertmovieFactory, growl){
		//Options to be displayed in genre select box
		$scope.selectedgenres = [];
	    $scope.genreOptions = [
	        'Action',
	        'Adventure',
	        'Comedy',
	        'Crime',
	        'Drama',
	        'Historical',
	        'Horror',
	        'Mistery',
	        'Musical',
	        'Romance',
	        'Science Fiction',
	        'Thriller',
	        'Western'
	        ];
		
		//Insert the movie in the db.json file, display a crawl and cleans the form
		$scope.addMovie = function(){
			//added "alt" attribute
			$scope.movie.alt = $scope.movie.title;
			$scope.movie.genre = $scope.selectedgenres.join(', ');
			console.log($scope.movie);
			insertmovieFactory.saveMovie().save({id:$scope.movie.id}, $scope.movie);			
			growl.success("Movie " + $scope.movie.title + " correctly saved", {title: 'Success', disableCountDown: true});
			$scope.movie = {title:"", releasedate:"", length:"", genre:"", plot:"", cast:"", downloaddate:""};
			$scope.movieform.$setPristine();
			$scope.selectedgenres = [];
		}
					
	}])
	
	/*------------Video Gallery Controller - videogallery.html------------*/
	.controller ('VideoGalleryController', ['$scope', 'videogalleryFactory', function($scope, videogalleryFactory){		
		//Get dishes from db_movies.json
		videogalleryFactory.getMovies().query(
                function(response) {
                    $scope.movies = response;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });					
	}])
	
;