'use strict';

angular.module ('moviesApp')
	
	//Configurates the growl
	.config(['growlProvider', function (growlProvider) {
		growlProvider.globalTimeToLive(5000);
		growlProvider.globalPosition('top-right');
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
		//Adventure filter
		$scope.filterAdventure = function (){
			var target_genres2 = ['Adventure'];
            var movies_array2= $scope.movies;
            var movies_filtered2 = movies_array2.filter (x => {
            	return target_genres2.filter (y => {
            		return x.genre.indexOf (y) >= 0;
            	}).length;
            })
            console.log(movies_filtered2);
            $scope.movies = movies_filtered2;
		}
		//Reset filter
		$scope.reset = function(){
			videogalleryFactory.getMovies().query(
	                function(response) {
	                    $scope.movies = response;
	                });
			$scope.moviesfilter = {};
		}
		
/*        //TESTING - Displays movies whose genre is adventure
        var target_genre = 'Adventure';
        var movies_array = $scope.movies;
        var movies_filtered = movies_array.filter ( x => {
        	return x.genre.indexOf (target_genre) >= 0 
        });
        console.log(movies_filtered); 
        //TESTING - Displays movies whose genre is an aarray -testing purpose
        var target_genres1 = ['Drama', 'Historical' ];
        var movies_array1= $scope.movies;
        var movies_filtered1 = movies_array1.filter (x => {
        	return target_genres1.filter (y => {
        		return x.genre.indexOf (y) >= 0;
        	}).length;
        })
        console.log(movies_filtered1);
        //TESTING - Displays nested genres  testing purpose
        angular.forEach($scope.movies, function(item){
        	console.log(item.genre);
        }) */
		
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
	}]);	
;