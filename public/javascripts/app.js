var app = angular.module("hearthNode", ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeController'
    })
    .when('/deck/:class', {
      templateUrl: 'partials/class-deck.html',
      controller: 'ClassDeckController'
    })
    .when('/user-decks/:userId', {
      templateUrl: 'partials/user-decks.html',
      controller: 'UserDeckController'
    })
    .otherwise({redirectTo: '/'})
    $locationProvider.html5Mode(true);
})
