'use strict';

const MODE_MOBILE = 0;
const MODE_DESKTOP = 1;

angular.module( 'mainapp.controllers', [])


.controller( 'NavCtrl', function ($scope, $rootScope, traverse) {
    const vm = this;
    $scope.goTo = traverse.goTo;
})

.controller( 'HomeCtrl', function($scope, $rootScope) {
    const vm = this;

    vm.determineWindowMode = determineWindowMode;

    $rootScope.Anthony = {};
    $rootScope.Guillaume = {};
    $rootScope.Daniel = {};
    $rootScope.Anders = {};
    $rootScope.Brian = {};


    $rootScope.Anthony.fullname = 'Anthony Altieri';
    $rootScope.Anthony.phonenum = '(818) 201-4755';
    $rootScope.Anthony.email = 'AnthonyRAltieri@gmail.com';
    $rootScope.Anthony.githublink = 'github.com/AnthonyAltieri';
    $rootScope.Anthony.bio = 'I am a fourth year pre-law student at the University'
        + 'of California, San Diego studying Computer Science Engineering. My '
        + 'interests include computer science, programming, finance, and law. I'
        + ' am mostly a front-end developer but I am capable of all facets of '
        + 'development. I am currently an intern at the startup Mesh for which '
        + 'I do front-end development. I am also the founder/owner/front-end '
        + 'developer for Stylist Spaces a marketing product for hairstylists.';


    $rootScope.Guillaume.fullname = 'Guillaume Hauss';
    $rootScope.Guillaume.phonenum = '(858) 997-7931';
    $rootScope.Guillaume.email = 'ghauss@hotmail.fr';
    $rootScope.Guillaume.githublink = 'github.com/GuillaumeHauss';
    $rootScope.Guillaume.bio = 'I am a french engineering student, majoring in '
        + "Computer Science and Automation in Robotics. I've been in San Diego "
        + 'since December and will leave this little heaven in June. I am a '
        + 'project-driven guy, always looking for solutions whenever there is '
        + 'a problem. I like working in team and be part of something bigger. '
        + 'I was the CEO of an engineering consulting cabinet in Nantes, for 1 '
        + 'year. I managed 32 co-workers and went over 20 projects as Program '
        + 'Manager. I like new technologies and especially connected cars.';

    $rootScope.Daniel.fullname = 'Daniel Kong';
    $rootScope.Daniel.phonenum = '(310) 985-1473';
    $rootScope.Daniel.email = 'dakong94@gmail.com';
    $rootScope.Daniel.githublink = 'github.com/dakong';
    $rootScope.Daniel.bio = "Hey there! I'm Fourth year Computer Science major at UC "
        + 'San Diego,interested in front end web development. Some of my hobbies '
        + 'include gaming, hiking, and snowboarding. I currently work at UC San '
        + 'Diego Creative Service & Publications, as a Student Web Developer.';

    $rootScope.Anders.fullname = 'Anders Trier';
    $rootScope.Anders.phonenum = '-';
    $rootScope.Anders.email = '-';
    $rootScope.Anders.githublink = 'github.com/AndersTrier';
    $rootScope.Anders.bio = 'First year graduate student. Interested in Computer Security.';


    $rootScope.Brian.fullname = 'Brian Kim';
    $rootScope.Brian.phonenum = '(818) 276-7028';
    $rootScope.Brian.email = 'brianskiim@gmail.com';
    $rootScope.Brian.githublink = 'github.com/brianskiim';
    $rootScope.Brian.bio = 'Hello. I am a fourth year Computer Science student at UCSD. I '
        + "prefer front end development because I don't have much backend knowledge. "
        + 'On my free time I enjoy playing basketball, going to the gym, and any car '
        + 'related activities. I currently work for Hush doing all sorts of things.';



    function determineWindowMode() {
        const width = window.innerWidth;
        if ( width < 767 ) {
            return MODE_MOBILE;
        } else {
            return MODE_DESKTOP;
        }
    }
})

.controller( 'AssignmentCtrl', function ($scope, $rootScope, traverse) {
    const vm = this;

    $scope.goTo = traverse.goTo;
})

.controller('Assignment1Ctrl', function ($rootScope) {

})
.controller('Assignments2Ctrl', function($rootScope) {

});

