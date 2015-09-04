var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var db = require('monk')('localhost/hearthnode');
var cards = db.get('cards');

router.get('/deck/:class', function(req, res, next) {
  var className = req.params.class;
  cards.findOne({class: className})
  .then(function (data) {
    res.json(data)
  })


  //for database seeed
  // unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/" + req.params.class)
  // .header("X-Mashape-Key", process.env.MASH_KEY)
  // .end(function (result) {
  //   var className = req.params.class
  //   var classCards = {}
  //   classCards.class = className
  //   classCards.cards = result.body
  //   cards.insert(classCards)
  //   res.json(result.body)
  // });
});

module.exports = router;
