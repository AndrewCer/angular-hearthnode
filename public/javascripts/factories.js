app.factory('GetClassDeck', ['$http', function ($http) {
  var arr = [];
  var obj = {};
  obj.deckCall = function (deckClass) {
    $http.get('api/deck/ + deckClass')
    .then(function (results) {
      arr.push(results.data)
      return arr
    })
  }
  obj.cards = arr
  // console.log(obj);
  // obj.cards = obj.deckCall('Druid')
  // var obj = {
  //   deckCall: function (deckClass) {
  //     $http.get('api/deck/' + deckClass)
  //     .then(function (results) {
  //       arr.push(results.data)
  //       return arr
  //     })
  //   }
  // }
  return obj
}])
