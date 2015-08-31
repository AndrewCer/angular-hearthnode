app.controller('HomeController', ['$scope', '$http', 'Warrior', 'Shaman', 'Rogue',
'Paladin', 'Hunter', 'Druid', 'Warlock', 'Mage', 'Priest',
function ($scope, $http, Warrior, Shaman, Rogue, Paladin, Hunter, Druid, Warlock, Mage, Priest) {
  var classArray = ['Warrior', 'Shaman', 'Rogue',
  'Paladin', 'Hunter', 'Druid', 'Warlock', 'Mage', 'Priest'];
  var testing = function (input) {
    $http.get('api/deck/' + input)
    .then(function (results) {
      eval(input).deckArray(results.data.cards)
    })
  }
  if (Warrior.cards.length === 0) {
    for (var i = 0; i < classArray.length; i++) {
      testing(classArray[i])
    }
  }
}])

app.controller('ClassDeckController', ['$scope', '$routeParams', '$http', 'Warrior', 'Shaman', 'Rogue',
'Paladin', 'Hunter', 'Druid', 'Warlock', 'Mage', 'Priest',
function ($scope, $routeParams, $http, Warrior, Shaman, Rogue, Paladin, Hunter, Druid, Warlock, Mage, Priest) {
  var deckClass = $routeParams.class;
  if (eval(deckClass).cards.length > 0) {
    $scope.cards = eval(deckClass).cards[0]
  }
  else {
    $http.get('api/deck/' + deckClass)
    .then(function (results) {
      eval(deckClass).deckArray(results.data)
      $scope.cards = results.data;
    })
  }
}])
