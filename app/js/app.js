var app = angular.module('todoApp', ['ngRoute', 'angularMoment' ,'ngMaterial' ,'ngMdIcons']);
app.config(function($mdThemingProvider) {
    var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
            'default': '500',
            'hue-1': '50'
        })
        .accentPalette('blue');
    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});


app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/list.html',
            controller: 'listController'
        }).when('/task/:taskId', {
            templateUrl: 'templates/task.html',
            controller: 'taskController'
        });
});