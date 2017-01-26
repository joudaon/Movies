'use strict';

angular.module('moviesApp', ['ui.router', 'ui.bootstrap', 'ngResource', 'angular-growl'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
            
            // route for the insert page
            .state('app.insertmovie', {
                url:'insertmovie',
                views: {
                    'content@': {
                        templateUrl: 'views/movies/insertmovie.html',
                        controller: 'InsertMovieController'
                   }
                }
            })
            
            // route for the insert page
            .state('app.videogallery', {
                url:'videogallery',
                views: {
                    'content@': {
                        templateUrl: 'views/movies/videogallery.html',
                        controller: 'VideoGalleryController'
                   }
                }
            })
            

        $urlRouterProvider.otherwise('/');
    })
;