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
	var startDate = new Date();
	var endDate = req.body.endDate;

	if(name == "")
		return res.json({ "status": "failed", "message": "Please enter a valid name!"});

	if(front == "")
		return res.json({ "status": "failed", "message": "Invalid front data!"});

	if(back == "")
		return res.json({ "status": "failed", "message": "Invalid back data!"});
	
	if(endDate == "")
		return res.json({ "status": "failed", "message": "Invalid endDate!"});


db.createDeck(name, front, back, startDate, endDate, function (err, rows) {
	    if (err) {
	    	console.log(err);
	    	return res.json({ "status": "failed", "message": "Error!" });
	    }

		return res.json({ "status": "success", "message": "Deck added successfully" });
	});
});

router.post('/updateDeck', function(req, res, next) {
	var deckid = req.body.deckid;
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


	db.updateDeck(deckid, name, front, back, endDate, function (err, rows) {
	    if (err) {
	    	console.log(err);
	    	return res.json({ "status": "failed", "message": "Error!" });
	    }

		return res.json({ "status": "success", "message": "Deck updated successfully" });
	});
});

//JSON
// {
//     "deckid" : "5",
//     "front" : "{}",
//     "back"  : "{}"
// }

router.post('/createFlashcard', function(req, res, next) {
	var deckid = req.body.deckid;
	var front = req.body.front;
	var back = req.body.back;
	
	var repetitions = 0;
	var inter = 1;
	var easiness = 1.8;
	var nextDate = new Date();
	var nextDateScaled = nextDate;

	if(deckid == "")
		return res.json({ "status": "failed", "message": "Please enter a valid deckid!"});

	if(front == "")
		return res.json({ "status": "failed", "message": "Invalid front data!"});

	if(back == "")
		return res.json({ "status": "failed", "message": "Invalid back data!"});


	db.createFlashcard(deckid, front, back, repetitions, inter, easiness, nextDate, nextDateScaled, function (err, rows) {
	    if (err) {
	    	console.log(err);
	    	return res.json({ "status": "failed", "message": "Error!" });
	    }

		return res.json({ "status": "success", "message": "Flashcard added successfully" });
	});
});

//JSON
// {
//     "flashcardid" : "9",
//     "deckid" : "2",
//     "front" : "{}",
//     "back"  : "{}",
//     "repetitions" : "0",
//     "inter" : "1",
//     "easiness" : "1.75",
//     "nextDate" : "2020-10-14 13:32:39.0",
//     "nextDateScaled" : "2020-10-14 13:29:40.0"
// }

router.post('/updateFlashcardContent', function(req, res, next) {
	var flashcardid = req.body.flashcardid;
	var deckid = req.body.deckid;
	var front = req.body.front;
	var back = req.body.back;
	var repetitions = req.body.repetitions;
	var inter = req.body.inter;
	var easiness = req.body.easiness;
	var nextDate = req.body.nextDate;
	var nextDateScaled = req.body.nextDateScaled;
	
	// var repetitions = 0;
	// var interval = 1;
	// var easiness = 1.8;
	// var nextDate = new Date();
	// nextDate = nextDate.getTime();

	// db.getDeck(deckid, function(err, rows){
	// 	if(err){
	// 		console.log(err);
	// 		return res.json({"status": "failed", "message": "Error!" });
	// 	}

	// 	var startDate = response.startDate;
	// 	var endDate = response.endDate;
	// 	var differenceInTime = endDate.getTime() - startDate.getTime();
	// 	var differenceInDays = 


	// })

	
	if(deckid == "")
		return res.json({ "status": "failed", "message": "Please enter a valid deckid!"});

	if(front == "")
		return res.json({ "status": "failed", "message": "Invalid front data!"});

	if(back == "")
		return res.json({ "status": "failed", "message": "Invalid back data!"});


	db.updateFlashcard(flashcardid, front, back, repetitions, inter, easiness, nextDate, nextDateScaled, function (err, rows) {
	    if (err) {
	    	console.log(err);
	    	return res.json({ "status": "failed", "message": "Error!" });
	    }

		return res.json({ "status": "success", "message": "Deck updated successfully" });
	});
});


//JSON
// {
//     "flashcard" : {
//         "flashcardid" : 9,
//         "deckid" : 5,
//         "front" : "{}",
//         "back"  : "{}",
//         "repetitions" : 0,
//         "interval" : 1,
//         "easiness" : 1.75,
//         "nextDate" : "2020-10-14 13:32:39.0",
//         "nextDateScaled" : "2020-10-14 13:29:40.0"
//     },
//     "quality" : "2"
// }



router.post('/updateFlashcardDate', function(req, res, next) {
	var flashcard = req.body.flashcard;
	var quality = req.body.quality;

	console.log(flashcard);
	
	if (quality < 0 || quality > 2) {
        return res.json({"status": "failed", "message": "Please select easy, medium or hard"})
	}

	var flashcardid = flashcard.flashcardid;
	console.log(flashcardid);
	var deckid = flashcard.deckid;
	console.log(deckid);
	var front = flashcard.front;
	var back = flashcard.back;
	var repetitions = flashcard.repetitions;
	var easiness = flashcard.easiness;
	var inter = flashcard.inter;
	var presentDate = flashcard.presentDate;
	
	if( quality == 2) {
		easiness = Math.min(2.5, Math.max(1.3, easiness + 0.1 - ((3.0 - quality)*(0.08 + (3.0 - quality)*0.02))));
	}

	if( quality == 0) {
		repetitions = 0;
	} else {
		repetitions += 1;
	}

	if( repetitions <= 1) {
		inter = 1;
	} else if (repetitions == 2) {
		if(quality <= 1){
			inter = 3;
		} else {
			inter = 6;
		}
	} else {
		inter = Math.round(inter*easiness);
	}

	var millisecondsInDay = 60*60*24*1000;
	var nextDate = new Date();
	nextDate += millisecondsInDay*inter;
	var nextDateScaled = nextDate;
	nextDate = new Date(nextDate);
	// nextDate = nextDate.getTime();

	db.getDeck(deckid, function(err, response){
		if(err){
			console.log(err);
			return res.json({"status": "failed", "message": "Error!" });
		}

		console.log(response);

		var startDate = response.startDate;
		var endDate = response.endDate;
		var differenceInTime = endDate.getTime() - startDate.getTime();
		var referenceTime = 15778476000;
		var fraction = differenceInTime / referenceTime;
		var differenceBetweenNextDateAndPresentDate = nextDate.getTime() - presentDate.getTime(); 
		nextDateScaled=fraction*differenceBetweenNextDateAndPresentDate;
		nextDateScaled = new Date(nextDateScaled);
        if(nextDateScaled  < presentDate || (nextDateScaled.getTime() - presentDate.getTime() <= milliSecondsInDay)) {
			nextDateScaled = new Date(presentDate.getTime() + millisecondsInDay)
		}
	})


	db.updateFlashcard(flashcardid, front, back, repetitions, inter, easiness, nextDate, nextDateScaled, function (err, rows) {
	    if (err) {
	    	console.log(err);
	    	return res.json({ "status": "failed", "message": "Error!" });
	    }

		return res.json({ "status": "success", "message": "Deck updated successfully" });
	});


})

module.exports = router;
