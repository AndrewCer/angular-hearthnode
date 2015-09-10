//new refactor
app.factory('ClassStore', function () {
  var obj = {};
  var deckObj = {};
  obj.deckStorage = function (deck, deckClass) {
    deckObj[deckClass] = deck;
    return deckObj;
  }
  obj.decks = deckObj;
  return obj
})
//old way
// app.factory('Warrior', function () {
//   var arr = []
//   var obj = {}
//   obj.deckArray = function (deck) {
//     arr.push(deck);
//     return arr
//   }
//   obj.cards = arr
//   return obj
// })
//
// app.factory('Shaman', function () {
//   var arr = []
//   var obj = {}
//   obj.deckArray = function (deck) {
//     arr.push(deck);
//     return arr
//   }
//   obj.cards = arr
//   return obj
// })
//
// app.factory('Rogue', function () {
//   var arr = []
//   var obj = {}
//   obj.deckArray = function (deck) {
//     arr.push(deck);
//     return arr
//   }
//   obj.cards = arr
//   return obj
// })
//
// app.factory('Paladin', function () {
//   var arr = []
//   var obj = {}
//   obj.deckArray = function (deck) {
//     arr.push(deck);
//     return arr
//   }
//   obj.cards = arr
//   return obj
// })
//
// app.factory('Hunter', function () {
//   var arr = []
//   var obj = {}
//   obj.deckArray = function (deck) {
//     arr.push(deck);
//     return arr
//   }
//   obj.cards = arr
//   return obj
// })
//
// app.factory('Druid', function () {
//   var arr = []
//   var obj = {}
//   obj.deckArray = function (deck) {
//     arr.push(deck);
//     return arr
//   }
//   obj.cards = arr
//   return obj
// })
//
// app.factory('Warlock', function () {
//   var arr = []
//   var obj = {}
//   obj.deckArray = function (deck) {
//     arr.push(deck);
//     return arr
//   }
//   obj.cards = arr
//   return obj
// })
//
// app.factory('Mage', function () {
//   var arr = []
//   var obj = {}
//   obj.deckArray = function (deck) {
//     arr.push(deck);
//     return arr
//   }
//   obj.cards = arr
//   return obj
// })
//
// app.factory('Priest', function () {
//   var arr = []
//   var obj = {}
//   obj.deckArray = function (deck) {
//     arr.push(deck);
//     return arr
//   }
//   obj.cards = arr
//   return obj
// })
