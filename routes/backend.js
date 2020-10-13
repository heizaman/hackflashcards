var express = require('express');
var router = express.Router();
var db = require('../DBfunctions/sqlDB.js');

/* POST apis. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createDeck', function(req, res, next) {
	var name = req.body.name;
	var front = req.body.front;
	var back = req.body.back;
	var endDate = req.body.endDate;

	if(name == "")
		return res.json({ "status": "failed", "message": "Please enter a valid name!"});

	if(front == "")
		return res.json({ "status": "failed", "message": "Invalid front data!"});

	if(back == "")
		return res.json({ "status": "failed", "message": "Invalid back data!"});
	
	if(endDate == "")
		return res.json({ "status": "failed", "message": "Invalid endDate!"});


	db.createDeck(name, front, back, endDate, function (err, rows) {
	    if (err) {
	    	console.log(err);
	    	return res.json({ "status": "failed", "message": "Error!" });
	    }

		return res.json({ "status": "success", "message": "success" });
	});
});

module.exports = router;
