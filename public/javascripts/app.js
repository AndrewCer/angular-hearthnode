var app = angular.module("hearthNode", ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
    .when('/all-decks', {
      templateUrl: 'partials/all-decks.html',
      controller: 'PublishedDeckController'
    })
    .otherwise({redirectTo: '/'})
    $locationProvider.html5Mode(true);
}])
