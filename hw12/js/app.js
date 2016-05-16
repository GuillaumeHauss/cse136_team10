angular.module('mainapp', [ 'mainapp.controllers', 'mainapp.services', 'ngRoute' ])

.config( function ($routeProvider) {
    $routeProvider
        .when('/home', {
            controller: 'HomeCtrl',
            templateUrl: 'templates/home.html'
        })
        .when('/assignments', {
            controller: 'AssignmentCtrl',
            templateUrl: 'templates/assignments.html'
        })
        .when('/assignment/1', {
            controller: 'Assignment1Ctrl',
            templateUrl: 'Task1/templates/assignment1.html'
        })
        .when('/assignment/2', {
            controller: 'Assignment2Ctrl',
            templateUrl: 'Task2/templates/assignment2.html'
        })
        .otherwise({ redirectTo: '/home' });
});
