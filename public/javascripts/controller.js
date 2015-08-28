app.controller('HomeController', ['$scope', 'GetClassDeck', function ($scope, GetClassDeck) {

}])

app.controller('ClassDeckController', ['$scope', '$routeParams', 'GetClassDeck', function ($scope, $routeParams, GetClassDeck) {
  var deckClass = $routeParams.class;
  GetClassDeck.deckCall(deckClass);
  $scope.cards = GetClassDeck
  console.log(GetClassDeck);
}])
