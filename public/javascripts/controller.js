// TODO: when user opens home page, make an api call for each class and then store data in factory
// TODO: move from an api call to a database call

app.controller('HomeController', ['$scope', '$http', 'Warrior', 'Shaman', 'Rogue',
'Paladin', 'Hunter', 'Druid', 'Warlock', 'Mage', 'Priest',
function ($scope, $http, Warrior, Shaman, Rogue, Paladin, Hunter, Druid, Warlock, Mage, Priest) {
  // var classArray = ['Warrior', 'Shaman', 'Rogue',
  // 'Paladin', 'Hunter', 'Druid', 'Warlock', 'Mage', 'Priest']
  // for (var i = 0; i < classArray.length; i++) {
  //   $http.get('api/deck/' + classArray[i])
  //   .then(function (results) {
  //     console.log(classArray[i]);
  //   //  classArray[i].deckArray(results.data)
  //   })
  // }
}])

app.controller('ClassDeckController', ['$scope', '$routeParams', '$http', 'Warrior', 'Shaman', 'Rogue',
'Paladin', 'Hunter', 'Druid', 'Warlock', 'Mage', 'Priest',
function ($scope, $routeParams, $http, Warrior, Shaman, Rogue, Paladin, Hunter, Druid, Warlock, Mage, Priest) {
  var deckClass = $routeParams.class;
  if (eval(deckClass).cards.length > 0) {
    console.log(eval(deckClass).cards);
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
