var express = require('express');
var router = express.Router();

/* GET frontend pages. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/createdeck', function(req, res, next) {
  res.render('createdeck');
});

router.get('/createflashcard', function(req, res, next) {
  res.render('createflashcard');
});

router.get('/decks', function(req, res, next) {
  res.render('decks');
});

router.get('/flashcards', function(req, res, next) {
  res.render('flashcards');
});

router.get('/revise', function(req, res, next) {
  res.render('revise');
});

module.exports = router;
