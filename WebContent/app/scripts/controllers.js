'use strict';

angular.module ('moviesApp')
	
	//Configurates the growl for InsertMovieController
	.config(['growlProvider', function (growlProvider) {
		growlProvider.globalTimeToLive(5000);
		growlProvider.globalPosition('top-right');
	}])

	/*--------------------------------------------------------------*/
	/*---------------Header Controller - insert.html ---------------*/
	/*--------------------------------------------------------------*/	
	.controller('HeaderController', ['$scope', '$state', function ($scope, $state) {
		//Highlights active menu item
		$scope.stateis = function(curstate) {
		       return $state.is(curstate);  
		    };
	}])
	
	
	/*--------------------------------------------------------------*/
	/*------------Insert Movie Controller - insert.html ------------*/
	/*--------------------------------------------------------------*/
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
			$scope.movie.genre = $scope.selectedgenres;
			console.log($scope.movie);
			insertmovieFactory.saveMovie().save({id:$scope.movie.id}, $scope.movie);			
			growl.success("Movie '" + $scope.movie.title + "' correctly saved", {title: 'Success', disableCountDown: true});
			$scope.movie = {title:"", releasedate:"", length:"", genre:"", plot:"", cast:"", downloaddate:""};
			$scope.movieform.$setPristine();
			$scope.selectedgenres = [];
		};
					
	}])

	/*--------------------------------------------------------------------*/
	/*------------Video Gallery Controller - videogallery.html------------*/
	/*--------------------------------------------------------------------*/
	.controller ('VideoGalleryController', ['$scope', 'videogalleryFactory', function($scope, videogalleryFactory){				
		//Get dishes from db_movies.json
		videogalleryFactory.getMovies().query(
	        function(response) {
	            $scope.movies = response;
	        },
	        function(response) {
	            $scope.message = "Error: "+response.status + " " + response.statusText;
	        });	
		
		//Reset filter
		$scope.reset = function(){
			videogalleryFactory.getMovies().query(
	                function(response) {
	                    $scope.movies = response;
	                });
			$scope.moviesfilter = {};
		};
						
		//Genre filter
		$scope.filterGenre = function (genreButton){
			//New array with movies with the selected genre passed through parameter
			var target_genres2 = genreButton;
            var movies_array2= $scope.movies;
            var movies_filtered2 = movies_array2.filter ( x => {
            	return x.genre.indexOf (target_genres2) >= 0;
            });
            console.log(movies_filtered2);
            $scope.movies = movies_filtered2;
			};
			//Setting background color to selected genre
			var selector = '.genreoptions button';			
			$(selector).on('click', function(){
			    $(selector).removeClass('active');
			    $(this).addClass('active');
			});
		
	}])
	
	/*-------------------------------------------------------------------*/
	/*-----------Insert Series Controller - insertseries.html------------*/
	/*-------------------------------------------------------------------*/
	.controller ('InsertSeriesController', ['$scope', 'insertSeriesFactory', 'growl', function($scope, insertSeriesFactory, growl){
		//Get current year
		$scope.currentyear = new Date().getFullYear();
		//Insert the serie in the db.json file, display a crawl and cleans the form
		$scope.addSeries = function(){
			//added "alt" attribute
			$scope.serie.alt = $scope.serie.title;
			console.log($scope.serie);
			insertSeriesFactory.saveSeries().save({id:$scope.serie.id}, $scope.serie);
			growl.success("Series '" + $scope.serie.title + "' correctly saved", {title: 'Success', disableCountDown: true});
			$scope.serie = {title:"", year:"", description:""};
			$scope.seriesform.$setPristine();
		};
	}])

;