var db = require('../db.js');
var funcs = {};


funcs.createDeck = function(name, front, back, endDate, callback) {
	var qry = 'INSERT INTO decks (name, front, back, endDate) VALUES (?, ?, ?, ?)';

	db.get().query(qry, [name, front, back, endDate], function (err, result) {
		return callback(err, result);
	});
}


module.exports = funcs;