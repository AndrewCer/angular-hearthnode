var app = angular.module("hearthNode", ['ngRoute']);

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
    .otherwise({redirectTo: '/'})
    $locationProvider.html5Mode(true);
})

app.controller('HomeController', ['$scope', '$http', 'Warrior', 'Shaman', 'Rogue',
'Paladin', 'Hunter', 'Druid', 'Warlock', 'Mage', 'Priest',
function ($scope, $http, Warrior, Shaman, Rogue, Paladin, Hunter, Druid, Warlock, Mage, Priest) {
  var classArray = ['Warrior', 'Shaman', 'Rogue',
  'Paladin', 'Hunter', 'Druid', 'Warlock', 'Mage', 'Priest'];
  var getClassDecks = function (input) {
    $http.get('api/deck/' + input)
    .then(function (results) {
      var filteredArray = []
      for (var i = 0; i < results.data.cards.length; i++) {
        if (results.data.cards[i].img && results.data.cards[i].type != 'Hero' && results.data.cards[i].type != 'Hero Power') {
          filteredArray.push(results.data.cards[i])
        }
      }
      eval(input).deckArray(filteredArray)
    })
  }
  if (Warrior.cards.length === 0) {
    for (var i = 0; i < classArray.length; i++) {
      getClassDecks(classArray[i])
    }
  }
}])

app.controller('ClassDeckController', ['$scope', '$routeParams', '$http', 'Warrior', 'Shaman', 'Rogue',
'Paladin', 'Hunter', 'Druid', 'Warlock', 'Mage', 'Priest',
function ($scope, $routeParams, $http, Warrior, Shaman, Rogue, Paladin, Hunter, Druid, Warlock, Mage, Priest) {
  var deckClass = $routeParams.class;
  $scope.deckClass = $routeParams.class
  if (eval(deckClass).cards.length > 0) {
    $scope.cards = eval(deckClass).cards[0]
  }
  else {
    var getClassDecks = function (input) {
      $http.get('api/deck/' + input)
      .then(function (results) {
        var filteredArray = []
        for (var i = 0; i < results.data.cards.length; i++) {
          if (results.data.cards[i].img && results.data.cards[i].type != 'Hero' && results.data.cards[i].type != 'Hero Power') {
            filteredArray.push(results.data.cards[i])
          }
        }
        eval(input).deckArray(filteredArray)
        $scope.cards = eval(deckClass).cards[0]
      })
    }
    getClassDecks($routeParams.class)
  }
  var stagedCardsArr = [];
  $scope.addCard = function (input) {
    if (stagedCardsArr.length < 30) {
      $scope.cardsMaxed = null;
      input.count = 1;
      stagedCardsArr.push(input);
      $scope.stagedCards = stagedCardsArr;
    }
    else {
      $scope.cardsMaxed = 'Your deck is full';
    }
  }
  $scope.removeCard = function (cardIndex) {
    $scope.cardsMaxed = null;
    stagedCardsArr.splice(cardIndex, 1)
  }
  $scope.createDeck = function () {
    //send deck from stage area to factory and also make api call to store deck to db
    usersDeck.currentDeck(stagedCards);
  }
  $scope.clearDeck = function () {
    var clearCheck = confirm('Are you sure you want to clear your staging area?');
    if (clearCheck) {
      stagedCardsArr = [];
      $scope.stagedCards = stagedCardsArr;
      $scope.cardsMaxed = null;
    }
    else {
      return null;
    }
  }
}])

app.directive('modelUndefined', function(){
  return {
    require: 'ngModel',
    link: function(scope,elm,attrs,ngModel){
      ngModel.$parsers.push(function(val){
         return val === null ? undefined : val;
      });
    }
  }
});

// TODO: temp store cards from staging area for quick access
//perhaps also store all users decks here?
app.factory('usersDeck', function () {
  var arr = [];
  var obj = {};
  obj.currentDeck = function (deck) {
    arr.push(deck);
    return arr;
  }
  obj.cards = arr;
  return obj;
})

app.factory('Warrior', function () {
  var arr = []
  var obj = {}
  obj.deckArray = function (deck) {
    arr.push(deck);
    return arr
  }
  obj.cards = arr
  return obj
})

app.factory('Shaman', function () {
  var arr = []
  var obj = {}
  obj.deckArray = function (deck) {
    arr.push(deck);
    return arr
  }
  obj.cards = arr
  return obj
})

app.factory('Rogue', function () {
  var arr = []
  var obj = {}
  obj.deckArray = function (deck) {
    arr.push(deck);
    return arr
  }
  obj.cards = arr
  return obj
})

app.factory('Paladin', function () {
  var arr = []
  var obj = {}
  obj.deckArray = function (deck) {
    arr.push(deck);
    return arr
  }
  obj.cards = arr
  return obj
})

app.factory('Hunter', function () {
  var arr = []
  var obj = {}
  obj.deckArray = function (deck) {
    arr.push(deck);
    return arr
  }
  obj.cards = arr
  return obj
})

app.factory('Druid', function () {
  var arr = []
  var obj = {}
  obj.deckArray = function (deck) {
    arr.push(deck);
    return arr
  }
  obj.cards = arr
  return obj
})

app.factory('Warlock', function () {
  var arr = []
  var obj = {}
  obj.deckArray = function (deck) {
    arr.push(deck);
    return arr
  }
  obj.cards = arr
  return obj
})

app.factory('Mage', function () {
  var arr = []
  var obj = {}
  obj.deckArray = function (deck) {
    arr.push(deck);
    return arr
  }
  obj.cards = arr
  return obj
})

app.factory('Priest', function () {
  var arr = []
  var obj = {}
  obj.deckArray = function (deck) {
    arr.push(deck);
    return arr
  }
  obj.cards = arr
  return obj
})
// app.factory('GetClassDeck', ['$http', function ($http) {
//   var arr = [];
//   var obj = {};
  // obj.deckCall = function (deckClass) {
  //   $http.get('api/deck/' + deckClass)
  //   .then(function (results) {
  //     arr.push(results.data)
  //     return arr
  //   })
  // }
//   obj.cards = arr
//   return obj
// }])

  // var obj = {};
  // var warArr = [];
  // var shamArr = [];
  // obj.allCards = function () {
  //   $http.get('api/allcards')
  //   .then(function (results) {
  //     console.log(results.data);
  //     for (var i = 0; i < results.data.Basic.length; i++) {
  //       results.data.Basic[i]
  //     }
  //     return results;
  //   })
  // }
//   obj.deckCall = function (deckClass) {
//     $http.get('api/deck/' + deckClass)
//     .then(function (results) {
//       if (deckClass === "Shaman") {
//         shamArr.push(results.data)
//         return shamArr
//       }
//       if (deckCall === 'Warrior') {
//         warArr.push(results.data)
//         return warArr
//       }
//     })
//   }
//   obj.cards = {
//     warCards: warArr,
//     shamCards: shamArr
//   };
//   return obj


