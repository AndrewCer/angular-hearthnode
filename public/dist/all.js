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
    .when('/all-decks', {
      templateUrl: 'partials/all-decks.html',
      controller: 'PublishedDeckController'
    })
    .otherwise({redirectTo: '/'})
    $locationProvider.html5Mode(true);
})

String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /\b\w/g, function (m) {
        return m.toUpperCase();
    });
};

app.controller('AccountController', ['$scope', '$http', '$cookies', '$location', function ($scope, $http, $cookies, $location) {
  $scope.checkActive = true;
  var checkLogin = function () {
    var userinfo = $cookies.get('local');
    if (userinfo) {
      $http.post('api/cookies', {userinfo: userinfo})
      .then(function (result) {
        if (result.data) {
          $scope.loggedIn = true;
          $scope.usersName = result.data.capitalize();
        }
        else {
          return null
        }
      })
    }
    else {
      return null;
    }
  }
  checkLogin();
  $scope.logIn = function () {
    var username = $scope.loginName;
    var password = $scope.loginPassword;
    $http.post('api/login', {username: username, password: password})
    .then(function (results) {
      if (results.data) {
        $scope.loggedIn = true;
        $scope.usersName = username.capitalize();
        $cookies.put('local', results.data);
        $scope.userinfo = $cookies.get('local');
        $scope.loginName = null;
        $scope.loginPassword = null;
      }
      else {
        return false
      }
    })
  }
  $scope.logOut = function () {
    $scope.loggedIn = false;
    $scope.usersName = null;
    $cookies.remove('local');
    $http.get('api/logout')
    .then(function (response) {
      return $location.path('/');
    })
  }
  $scope.signUp = function () {
    $scope.nameError = null;
    $scope.nameShortError = null;
    $scope.nameLongError = null;
    $scope.nameExists = null;
    $scope.emailExists = null;
    $scope.passwordError = null;
    $scope.passwordMatchError = null;
    $scope.serverError = null;
    var username = $scope.userName;
    var email = $scope.email;
    var password = $scope.password;
    var passCheck = $scope.passCheck;
    var validationCheck = function (name, password, passwordCheck) {
      var illegals = /\W/;
      var errorArray = [];
      if (name.length < 5) {
        $scope.nameShortError = 'Username is too short. Must be longer than 4 characters';
        errorArray.push(true);
      }
      if (name.length > 15) {
        $scope.nameLongError = 'Username is too long. Must be less than 15 characters';
        errorArray.push(true);
      }
      if (illegals.test(name)) {
        $scope.nameError = 'Username contains illegal characters. Can only use letters, numbers and underscores (no spaces)';
        errorArray.push(true);
      }
      if (password.length < 6) {
        $scope.passwordError = 'Password is too short. Must be greater than 5 characters';
        errorArray.push(true);
      }
      if (password != passwordCheck) {
        $scope.passwordMatchError = 'Passwords do not match';
        errorArray.push(true);
      }
      return errorArray;
    }
    if (validationCheck(username, password, passCheck).length === 0) {
      $http.post('api/check-input', { username: username, email: email})
        .success(function (response) {
          if (response.username === true) {
            $scope.nameExists = 'That user name is taken';
          }
          if (response.email === true) {
            $scope.emailExists = 'That Email is already in use';
          }
          else {
            $http.post('api/authenticate', { username: username, email: email, password: password, passCheck: passCheck})
              .success(function (response) {
                if (response) {
                  $scope.loggedIn = true;
                  $scope.usersName = username.capitalize();
                  $cookies.put('local', response);
                  $scope.userinfo = $cookies.get('local');
                }
                else {
                  $scope.serverError = 'Something went wrong. Please try again'
                }
            });
          }
        })
    }
  }
}])

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

app.controller('ClassDeckController', ['$scope', '$routeParams', '$http', '$location', 'Warrior', 'Shaman', 'Rogue',
'Paladin', 'Hunter', 'Druid', 'Warlock', 'Mage', 'Priest', '$cookies',
function ($scope, $routeParams, $http, $location, Warrior, Shaman, Rogue, Paladin, Hunter, Druid, Warlock, Mage, Priest, $cookies) {
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
  $scope.createDeck = function () {
    var userinfo = $cookies.get('local');
    if (userinfo) {
      $http.post('api/create-deck', {classDeck: deckClass, cards: stagedCardsArr, user: userinfo})
      .then(function (response) {
        $location.path('/user-decks/' + userinfo);
      })
    }
    else {
      $scope.mustLogin = 'Please log in to create decks'
    }
  }
}])

app.controller('UserDeckController', ['$scope', '$http', '$cookies', '$location', function ($scope, $http, $cookies, $location) {
  var userinfo = $cookies.get('local');
  $http.post('api/users-decks', {userinfo: userinfo})
  .then(function (response) {
    var decks = response.data.decks;
    var deckKeys = [];
    for (var i = 0; i < decks.length; i++) {
      deckKeys.push(Object.keys(decks[i])[0].toLowerCase());
    }
    $scope.decks = response.data.decks;
    $scope.deckKeys = deckKeys
    $scope.userName = response.data.username.capitalize();
  })
  $scope.getDeck = function (deck) {
    var decks = $scope.decks;
    var deck = deck.capitalize();
    var returnDeck;
    $scope.hideMain = true;
    for (var i = 0; i < decks.length; i++) {
      if (deck === Object.keys(decks[i])[0]) {
        returnDeck = decks[i]
      }
    }
    $scope.deckName = deck;
    $scope.clickedDeck = returnDeck[deck];
  }
  $scope.removeCard = function (cardIndex) {
    // TODO: remove selected card from array and api call to remove from db
    // stagedCardsArr.splice(cardIndex, 1)
  }
  $scope.publishDeck = function () {
    var deck = $scope.publishDeckName;
    var deckDescrip = $scope.deckDiscription;
    var publishedDeckArray = $scope.clickedDeck
    $http.post('api/live-decks', { deckName: deck, description: deckDescrip, deck: publishedDeckArray, userinfo: userinfo })
    .then(function (response) {
      $location.path('/all-decks');
    })
  }
  $scope.deleteDeck = function (deck) {
    var userinfo = $cookies.get('local');
    $http.post('api/delete-deck', {deck: deck, userinfo: userinfo})
    .then(function (result) {

    })
  }
}])

app.controller('PublishedDeckController', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
  $http.get('api/all-decks')
  .then(function (results) {
    $scope.allPostedDecks = results.data;
  })
  $scope.clickedPost = function (deck) {
    $scope.hideSection = true;
    $scope.decksName = deck.deckName;
    $scope.decksCards = deck.deck;
    $scope.deckDescription = deck.description
    $http.post('api/deck-query', {user: deck.postedBy})
    .then(function (result) {
      $scope.postUser = result.data.capitalize();
    })
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
// app.factory('usersDeck', function () {
//   var arr = [];
//   var obj = {};
//   obj.currentDeck = function (deck) {
//     arr.push(deck);
//     return arr;
//   }
//   obj.cards = arr;
//   return obj;
// })

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


