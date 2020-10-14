var express = require('express');
var router = express.Router();

/* GET frontend pages. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/createdeck', function(req, res, next) {
  res.render('createdeck');
});

module.exports = router;
