var express = require('express');
var router = express.Router();
var unirest = require('unirest');

router.get('/deck/:class', function(req, res, next) {
  unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/" + req.params.class)
  .header("X-Mashape-Key", process.env.MASH_KEY)
  .end(function (result) {
    res.json(result.body)
  });
});

// router.get('/allcards', function (req, res, next) {
//   unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")
//   .header("X-Mashape-Key", process.env.MASH_KEY)
//   .end(function (result) {
//     // console.log(result.body)
//     res.json(result.body)
//   });
// })

module.exports = router;
