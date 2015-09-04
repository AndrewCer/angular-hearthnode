var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var db = require('monk')('localhost/hearthnode');
var cards = db.get('cards');
var users = db.get('users');
var validateSignUp = require('../lib/validations.js').validation;

router.get('/deck/:class', function(req, res) {
  var className = req.params.class;
  cards.findOne({class: className})
  .then(function (data) {
    res.json(data)
})

router.post('/check-input', function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  console.log(email);
  var returnObj = {}
  users.findOne({username: username})
  .then(function (user) {
    if (user) {
      return returnObj.username = true;
    }
    else {
      return returnObj.username = false;
    }
  })
  .then(function () {
    return users.findOne({email: email})
    .then(function (user) {
      if (user) {
        return returnObj.email = true;
      }
      else {
        return returnObj.email = false;
      }
    })
  })
  .then(function () {
    return res.json(returnObj)
  })
})

router.post('/authenticate', function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var passCheck = req.body.passCheck;
  if (validateSignUp(username, password, passCheck).length === 0) {
    users.insert(req.body)
    .then(function () {
      res.json(true);
    })
  }
  else {
    res.json(false);
  }
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
