'use strict';

angular.module('moviesApp', ['ui.router'])
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
            .state('app.insert', {
                url:'insert',
                views: {
                    'content@': {
                        templateUrl: 'views/insert.html'
                   }
                }
            })            
            

        $urlRouterProvider.otherwise('/');
    })
;