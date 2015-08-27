var express = require('express');
var router = express.Router();

router.get('/testing', function(req, res, next) {
  res.json({hey: 'yo dawg'})
});

module.exports = router;
