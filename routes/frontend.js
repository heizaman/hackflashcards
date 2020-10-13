var express = require('express');
var router = express.Router();

/* GET frontend pages. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/flashcards', function(req, res, next) {
  res.render('flashcards');
});

module.exports = router;
