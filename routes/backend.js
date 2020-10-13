var express = require('express');
var router = express.Router();
var db = require('../DBfunctions/sqlDB.js');

/* POST apis. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	if(email == "")
		return res.json({ "status": "failed", "message": "Please enter a valid email address!"});
	if(password == "")
		return res.json({ "status": "failed", "message": "Please enter password!"});

	db.findUserByEmail(email, function (err, rows) {
	    if (err) {
	    	console.log(err);
	    	return res.json({ "status": "failed", "message": "Error!" });
	    }

	    if(rows.length == 0)
    		return res.json({ "status": "failed", "message": "Unregistered Email!" });

		if(rows[0].password != password)
			return res.json({ "status": "failed", "message": "Invalid Password!" });

		var data = {
			"email" : email,
			"name": rows[0].name,
			"role": rows[0].role,
			"token": jwt.createToken(rows[0].userid)
		};

		return res.json({ "status": "success", "message": "success", "data": data });
	});
});

module.exports = router;
