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
	    $scope.genreOptions = [
	        { name: 'Action', value: 'Action' },
	        { name: 'Adventure', value: 'Adventure' },
	        { name: 'Comedy', value: 'Comedy' },
	        { name: 'Crime', value: 'Crime'},
	        { name: 'Drama', value: 'Drama'},
	        { name: 'Historical', value: 'Historical'},
	        { name: 'Horror', value: 'Horror'},
	        { name: 'Mistery', value: 'Mistery'},
	        { name: 'Musical', value: 'Musical'},
	        { name: 'Romance', value: 'Romance'},
	        { name: 'Science Fiction', value: 'Science Fiction'},
	        { name: 'Thriller', value: 'Thriller'},
	        { name: 'Western', value: 'Western'},
	        ];
		
		//Insert the movie in the db.json file, display a crawl and cleans the form
		$scope.addMovie = function(){
			//added "alt" attribute
			$scope.movie.alt = $scope.movie.title;
			console.log($scope.movie);
			insertmovieFactory.saveMovie().save({id:$scope.movie.id}, $scope.movie);			
			growl.success("Movie " + $scope.movie.title + " correctly saved", {title: 'Success', disableCountDown: true});
			$scope.movie = {title:"", releasedate:"", length:"", plot:"", cast:"", downloaddate:""};
			$scope.movieform.$setPristine();
		}
					
	}])
	
	/*------------Video Gallery Controller - videogallery.html------------*/
	.controller ('VideoGalleryController', ['$scope', 'videogalleryFactory', function($scope, videogalleryFactory){		
		//Get dishes from db_movies.json
		videogalleryFactory.getMovies().query(
                function(response) {
                    $scope.movies = response;
                    //$scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });					
	}])
	
;