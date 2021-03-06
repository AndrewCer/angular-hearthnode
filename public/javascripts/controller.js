String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /\b\w/g, function (m) {
        return m.toUpperCase();
    });
};

app.controller('AccountController', ['$scope', '$http', '$cookies', '$location', function ($scope, $http, $cookies, $location) {
  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };
  $scope.checkActive = true;
  var checkLogin = function () {
    var userinfo = $cookies.get('local');
    if (userinfo) {
      $http.post('api/cookies', {userinfo: userinfo})
      .then(function (result) {
        if (result.data) {
          $scope.loggedIn = true;
          $scope.usersName = result.data.capitalize();
          $scope.userinfo = $cookies.get('local');
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
        $scope.showLogin = false;
        $scope.loginName = null;
        $scope.loginPassword = null;
      }
      else {
        $scope.userPassError = 'Username or password do not match'
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
    var nullPasses = function () {
      $scope.password = null;
      $scope.passCheck = null;
    }
    var validationCheck = function (name, password, passwordCheck) {
      var illegals = /\W/;
      var errorArray = [];
      if (name.length < 5) {
        $scope.nameShortError = 'Username is too short. Must be longer than 4 characters';
        nullPasses();
        errorArray.push(true);
      }
      if (name.length > 15) {
        $scope.nameLongError = 'Username is too long. Must be less than 15 characters';
        nullPasses();
        errorArray.push(true);
      }
      if (illegals.test(name)) {
        $scope.nameError = 'Username contains illegal characters. Can only use letters, numbers and underscores (no spaces)';
        nullPasses();
        errorArray.push(true);
      }
      if (password.length < 6) {
        $scope.passwordError = 'Password is too short. Must be greater than 5 characters';
        nullPasses();
        errorArray.push(true);
      }
      if (password != passwordCheck) {
        $scope.passwordMatchError = 'Passwords do not match';
        nullPasses();
        errorArray.push(true);
      }
      return errorArray;
    }
    if (validationCheck(username, password, passCheck).length === 0) {
      $http.post('api/check-input', { username: username, email: email})
        .success(function (response) {
          if (response.username === true) {
            $scope.nameExists = 'That user name is taken';
            nullPasses();
          }
          if (response.email === true) {
            $scope.emailExists = 'That Email is already in use';
            nullPasses();
          }
          else {
            $http.post('api/authenticate', { username: username, email: email, password: password, passCheck: passCheck})
              .success(function (response) {
                if (response) {
                  $scope.loggedIn = true;
                  $scope.usersName = username.capitalize();
                  $cookies.put('local', response);
                  $scope.userinfo = $cookies.get('local');
                  $scope.showForm = false;
                  $scope.userName = null;
                  $scope.email = null;
                  $scope.password = null;
                  $scope.passCheck = null;
                }
                else {
                  $scope.serverError = 'Something went wrong. Please try again'
                  nullPasses();
                }
            });
          }
        })
    }
  }
}])

app.controller('HomeController', ['$scope', '$http', 'ClassStore',
function ($scope, $http, ClassStore) {
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
      ClassStore.deckStorage(filteredArray, input)
    })
  }
  if (ClassStore.decks.length === undefined) {
    for (var i = 0; i < classArray.length; i++) {
      getClassDecks(classArray[i])
    }
  }
}])

app.controller('ClassDeckController', ['$scope', '$routeParams', '$http', '$location', 'ClassStore', '$cookies',
function ($scope, $routeParams, $http, $location, ClassStore, $cookies) {
  var deckClass = $routeParams.class;
  $scope.deckClass = $routeParams.class
  if (ClassStore.decks[deckClass]) {
    $scope.cards = ClassStore.decks[deckClass];
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
        ClassStore.deckStorage(filteredArray, input)
        $scope.cards = ClassStore.decks[deckClass];
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
    $scope.deckKeys = deckKeys;
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
  $scope.publishDeck = function () {
    var deck = $scope.publishDeckName;
    var deckDescrip = $scope.deckDiscription;
    var publishedDeckArray = $scope.clickedDeck
    $http.post('api/live-decks', { deckName: deck, description: deckDescrip, deck: publishedDeckArray, userinfo: userinfo })
    .then(function (response) {
      $scope.publish = false;
      $scope.publishDeckName = null;
      $scope.deckDiscription = null;
      $scope.clickedDeck = null;
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
    $scope.allPostedDecks = results.data.reverse();
  })
  $scope.mathz = Math.floor((Math.random() * 10) + 1);
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
