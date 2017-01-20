'use strict';

angular.module ('moviesApp')

	.constant("baseURL", "http://localhost:3000/")
	
	//videolibrary Service
	.service('videogalleryFactory', ['$resource', 'baseURL', function($resource, baseURL) {
		//gets movies from bd.json file
		this.getMovies = function(){                    
        	return $resource(baseURL+"movies",null,  {'get':{method:'GET' }});                    
        };
	}])
   
	//Insertmovie Service
	.service('insertmovieFactory', ['$resource', 'baseURL', function($resource, baseURL) {
		//save movie in bd.json file
		this.saveMovie = function(){
			return $resource(baseURL+'movies/:id', null, {'save':{method:'POST'}});
		};
    	 
	}])
;