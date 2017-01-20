'use strict';

angular.module ('moviesApp')

	.constant("baseURL", "http://localhost:3000/")
	.service('movieFactory', ['$resource', 'baseURL', function($resource, baseURL) {
		
		this.getMovies = function(){                    
        	return $resource(baseURL+"movies/:id",null,  {'get':{method:'GET' }});                    
        };
		
	}])

;