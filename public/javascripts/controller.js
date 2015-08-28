app.controller('HomeController', ['$scope', 'GetCards', function ($scope, GetCards) {

}])

app.controller('ClassDeckController', ['$scope', '$routeParams', 'GetCards', function ($scope, $routeParams, GetCards) {
  var deckClass = $routeParams.class;

}])
