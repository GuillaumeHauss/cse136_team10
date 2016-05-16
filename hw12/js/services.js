'use strict';

angular.module( 'mainapp.services', [] )

.factory('traverse', function ($location) {
    return {
        goTo: state  => {
            console.log( state );
            switch (state) {
                case 'Home':
                    $location.path('/home');
                    break;
                case 'Assignments':
                    $location.path('/assignments');
                    break;
                case 'Assignment1':
                    $location.path('/assignment/1');
                    break;
                case 'Assignment2':
                    $location.path('/assignment/2');
                    break;
            }
        }
    }
});