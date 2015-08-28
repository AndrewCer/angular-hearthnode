var express = require('express');
var router = express.Router();
var unirest = require('unirest');

router.get('/deck/:class', function(req, res, next) {
  res.json({hey: 'res from api'})
  unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/{class}")
  .header("X-Mashape-Key", process.env.MASH_KEY)
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
  });
});

module.exports = router;
