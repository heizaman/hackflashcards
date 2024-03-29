var db = require('../db.js');
var funcs = {};


funcs.createDeck = function(name, front, back, startDate, endDate, callback) {
	var qry = 'INSERT INTO decks (name, front, back, startDate, endDate) VALUES (?, ?, ?, ?, ?)';

	db.get().query(qry, [name, front, back, startDate, endDate], function (err, result) {
		return callback(err, result);
	});
}

funcs.updateDeck = function(deckid, name, front, back, endDate, callback) {
	var qry = 'UPDATE decks SET name = ?, front = ?, back = ?, endDate = ? WHERE deckid = ?';

	db.get().query(qry, [name, front, back, endDate,deckid], function (err, result) {
		return callback(err, result);
	});
}

funcs.createFlashcard = function(deckid, front, back, repetitions, inter, easiness, nextDate, nextDateScaled, display, callback) {
	var qry = 'INSERT INTO flashcards (inter, deckid, front, back, repetitions, easiness, nextDate, nextDateScaled, display) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

	db.get().query(qry, [inter, deckid, front, back, repetitions, easiness, nextDate, nextDateScaled, display], function (err, result) {
		return callback(err, result);
	});
}

funcs.updateFlashcard = function(flashcardid, front, back, repetitions, inter, easiness, nextDate, nextDateScaled, callback) {
	var qry = 'UPDATE flashcards SET front = ?, back = ?, repetitions = ?, inter = ?, easiness = ?, nextDate = ?, nextDateScaled = ? WHERE flashcardid = ?';
	db.get().query(qry, [front, back, repetitions, inter, easiness, nextDate, nextDateScaled, flashcardid], function (err, result) {
		return callback(err, result);
	});
}

funcs.getDeck = function(deckid, callback) {
	var qry = 'SELECT * FROM decks WHERE deckid = ?';

	db.get().query(qry, [deckid], function(err, result){
		return callback(err,result);
	});
}

funcs.getDecks = function(callback) {
	var qry = 'SELECT * FROM decks';

	db.get().query(qry, function(err, result){
		return callback(err,result);
	});
}

funcs.getFlashcards = function(callback) {
	var qry = 'SELECT * FROM flashcards';
	db.get().query(qry, function(err, result){
		return callback(err, result);
	})
}

funcs.getFlashcardsOfDeck = function(deckid, callback) {
	var qry = 'SELECT * FROM flashcards WHERE deckid = ?';
	console.log(deckid);

	db.get().query(qry, [deckid], function(err, result){
		return callback(err, result);
	})
}

funcs.getDeckName = function(deckid, callback) {
	var qry = 'SELECT name FROM decks WHERE deckid = ?';
	console.log(deckid);

	db.get().query(qry, [deckid], function(err, result){
		return callback(err, result);
	})
}

funcs.getFlashcard = function(flashcardid, callback) {
	var qry = 'SELECT * FROM flashcards WHERE flashcardid = ?';

	db.get().query(qry, [flashcardid], function(err, result){
		return callback(err, result);
	})
}


module.exports = funcs;