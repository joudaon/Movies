'use strict';

angular.module ('moviesApp')

	.constant("baseURL", "http://localhost:3000/")
	
	//videolibrary Service
	.service('videogalleryFactory', ['$resource', 'baseURL', function($resource, baseURL) {
		//gets movies from bd.json file
		this.getMovies = function(){                    
        	return $resource(baseURL+"movies/:id",null,  {'get':{method:'GET' }});                    
        };
	}])
   
	//Insertmovie Service
	.service('insertmovieFactory', ['$resource', 'baseURL', function($resource, baseURL) {
		//save movie in bd.json file
		this.saveMovie = function(){
			return $resource(baseURL+'movies/:id', null, {'save':{method:'POST'}});
		};
    	 
	}])
	
	//Insertseries Service
	.service('insertSeriesFactory', ['$resource', 'baseURL', function($resource, baseURL) {
		//save movie in bd.json file
		this.saveSeries = function(){
			return $resource(baseURL+'series/:id', null, {'save':{method:'POST'}});
		};
    	 
	}])
;