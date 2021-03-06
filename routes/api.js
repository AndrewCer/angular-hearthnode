var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var db = require('monk')(process.env.MONGOLAB_URI);
var cards = db.get('cards');
var users = db.get('users');
var postedDecks = db.get('decks');
var validateSignUp = require('../lib/validations.js').validation;
var bcrypt = require('bcrypt');
var cookieSession = require('cookie-session');

router.get('/deck/:class', function(req, res) {
  var className = req.params.class;
  cards.findOne({class: className})
  .then(function (data) {
    res.json(data)
  })
});

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
    bcrypt.hash(password, 8, function(err, hash) {
      users.insert({ username: username.toLowerCase(), email: email, password: hash, decks: []})
      .then(function (user) {
        req.session.user = username.toLowerCase()
        res.json(user._id);
      })
    });
  }
  else {
    res.json(false);
  }
})

router.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  users.findOne({username: username.toLowerCase()})
  .then(function (user) {
    if (user) {
      var cryptCheck = bcrypt.compareSync(password, user.password);
      if (cryptCheck) {
        req.session.user = username.toLowerCase()
        res.json(user._id);
      }
      else {
        res.json(false);
      }
    }
    else {
      res.json(false);
    }
  })
})

router.get('/logout', function (req, res) {
  req.session = null
  res.json(true);
})

router.post('/cookies', function (req, res) {
  var userId = req.body.userinfo
  users.findOne({_id: userId})
  .then(function (user) {
    if (user) {
      req.session.user = user.username.toLowerCase()
      res.json(user.username)
    }
    else {
      res.json(false);
    }
  })
})

router.post('/create-deck', function (req, res) {
  var data = req.body;
  if (!data.user) {
    res.json(false)
  }
  else {
    var cards = {};
    cards[data.classDeck] = data.cards;
    var userCookie = req.session.user
    users.update({username: userCookie}, {$addToSet: {decks: cards} })
    .then(function () {
      res.json(true)
    })
  }
})

router.post('/users-decks', function (req, res) {
  var userId = req.body.userinfo;
  users.findOne({_id: userId})
  .then(function (user) {
    if (user) {
      var returnObj = {};
      returnObj.username = user.username;
      returnObj.decks = user.decks;
      res.json(returnObj)
    }
    else {
      res.json(false);
    }
  })
})

router.post('/live-decks', function (req, res) {
  var deckName = req.body.deckName;
  var description = req.body.description;
  var userId = req.body.userinfo;
  var deck = req.body.deck
  postedDecks.insert({ deckName: deckName, description: description, deck: deck, postedBy: userId })
  .then(function () {
    res.json(true)
  })
})

router.get('/all-decks', function (req, res) {
  postedDecks.find()
  .then(function (allDecks) {
    res.json(allDecks)
  })
})

router.post('/deck-query', function (req, res) {
  var userId = req.body.user;
  users.findOne({_id: userId})
  .then(function (user) {
    res.json(user.username)
  })
})

// database seeed
// router.get('/seed-me/:class', function (req, res) {
//   unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/" + req.params.class)
//   .header("X-Mashape-Key", process.env.MASH_KEY)
//   .end(function (result) {
//     var className = req.params.class
//     var classCards = {}
//     classCards.class = className
//     classCards.cards = result.body
//     cards.insert(classCards)
//     res.json(result.body)
//   });
// })


module.exports = router;
