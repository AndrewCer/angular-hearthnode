app.factory('GetCards', ['$http', function ($http) {

}])

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
