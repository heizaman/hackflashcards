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

//This is similar to getDecks in backend
router.get('/decks', function(req, res, next) {
  res.render('decks');
});

//Similar to /getFlashcards/deckid
router.get('/flashcards/:id', function(req, res, next) {
    if(req.params && req.params.id) {
		res.render('flashcards', { deckid : req.params.id });
	}
	else {
		res.render('error');
	}
});

router.get('/revise/:id', function(req, res, next) {
    if(req.params && req.params.id) {
		res.render('revise', { deckid : req.params.id });
	}
	else {
		res.render('error');
	}
});

module.exports = router;
