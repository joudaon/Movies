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
            
            // route for the insert movie page
            .state('app.insertmovie', {
                url:'insertmovie',
                views: {
                    'content@': {
                        templateUrl: 'views/movies/insertmovie.html',
                        controller: 'InsertMovieController'
                   }
                }
            })
            
            // route for the movies gallery page
            .state('app.videogallery', {
                url:'videogallery',
                views: {
                    'content@': {
                        templateUrl: 'views/movies/videogallery.html',
                        controller: 'VideoGalleryController'
                   }
                }
            })
            
            // route for the insert series page
            .state('app.insertseries', {
                url:'insertseries',
                views: {
                    'content@': {
                        templateUrl: 'views/series/insertseries.html',
                   }
                }
            })

            // route for the series gallery page
            .state('app.seriesgallery', {
                url:'seriesgallery',
                views: {
                    'content@': {
                        templateUrl: 'views/series/seriesgallery.html',
                   }
                }
            })

        $urlRouterProvider.otherwise('/');
    })
;