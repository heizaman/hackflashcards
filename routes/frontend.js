var express = require('express');
var router = express.Router();

/* GET frontend pages. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/createdeck', function(req, res, next) {
  res.render('createdeck');
});

router.get('/createflashcard/:id', function(req, res, next) {
	if(req.params && req.params.id) {
		res.render('createflashcard', { deckid : req.params.id });
	}
	else {
		res.render('error');
	}
});

router.get('/decks', function(req, res, next) {
  res.render('decks');
});

router.get('/flashcards/:id', function(req, res, next) {
    if(req.params && req.params.id) {
		res.render('flashcards', { deckid : req.params.id });
	}
	else {
		res.render('error');
	}
});

router.get('/revise', function(req, res, next) {
  res.render('revise');
});

module.exports = router;
