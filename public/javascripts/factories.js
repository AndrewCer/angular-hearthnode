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
