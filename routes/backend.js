var express = require('express');
var router = express.Router();
var db = require('../DBfunctions/sqlDB.js');


/* GET apis */

router.get('/getDecks', function(req, res, next) {
	db.getDecks(function(err, response){
		response.sort(function(a,b){
			return a.startDate - b.startDate;
		})
		return res.json({"status" : "Decks fetched successfully", "result" : response});
	})
})

router.get('/getFlashcards/:deckid', function(req, res, next){
	var deckid = req.params.deckid;
	db.getFlashcardsOfDeck(deckid, function(err, response){
		response.sort(function(a,b){
			return a.nextDate - b.nextDate;
		})
		return res.json({"status": "Flashcards fetched successfully", "result": response});
	})
})

router.get('/getFlashcard/:flashcardid', function(req, res, next){
	var flashcardid = req.params.flashcardid;
	db.getFlashcard(flashcardid, function(err, response){
		return res.json({"status": "Flashcard fetched successfully", "result": response});
	})
})



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
	
	if(startDate == "")
		return res.json({ "status": "failed", "message": "Invalid startDate!"});

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


router.post('/getDeck', function(req, res, next) {

	var deckid = req.body.deckid;

	db.getDeck(deckid, function(err, response){
		if(err){
			console.log(err);
			return res.json({"status": "failed", "message": "Error!" });
		}

		return res.json({ "status": "success", "message": "getDeck Successful", "decks": response });
	});
});


router.post('/updateDeck', function(req, res, next) {
	var deckid = req.body.deckid;
	var name = req.body.name;
	var front = req.body.front;
	var back = req.body.back;
	var endDate = req.body.endDate;

	if(deckid == "")
		return res.json({ "status": "failed", "message": "Invalid DeckId!"});

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
		
		changeEndDateScaledForAllFlashcards(endDate);

		return res.json({ "status": "success", "message": "Deck updated successfully" });
	});
});

function changeEndDateScaledForAllFlashcards() {
	db.getFlashcards(function(err,response) {
		var stringFlashcard = JSON.stringify(response);
		var jsonFlashcard = JSON.parse(stringFlashcard);
		var presentDate = new Date();

		for(let i=0;i < jsonFlashcard.length ; i++){
			 var flashcard = json[i];
			 db.getDeck(flashcard.deckid, function(err, response){
				if(err){
					console.log(err);
					return res.json({"status": "failed", "message": "Error!" });
				}
				var string = JSON.stringify(response);
				var json = JSON.parse(string);
		
				var startDate = json[0].startDate;
				var endDate = json[0].endDate;
				console.log("New start and end dates are as follows : ");
				console.log(startDate);
				console.log(endDate);
				startDate = new Date(startDate);
				endDate = new Date(endDate);
				console.log(startDate);
				console.log(endDate);
				var differenceInTime = endDate.getTime() - startDate.getTime();
				console.log("The difference in time value is as follows : ");
				console.log(differenceInTime);
				var referenceTime = 15778476000;
				var fraction = differenceInTime / referenceTime;
				var differenceBetweenNextDateAndPresentDate = flashcard.nextDate.getTime() - presentDate.getTime(); 
				var nextDateScaled=fraction*differenceBetweenNextDateAndPresentDate;
				nextDateScaled = new Date(nextDateScaled);

				db.updateFlashcard(flashcard.flashcardid, flashcard.front, flashcard.back, flashcard.repetitions, flashcard.inter, 
					flashcard.easiness, flashcard.nextDate, nextDateScaled, function (err, rows) {
					if (err) {
						console.log(err);
						// return res.json({ "status": "failed", "message": "Error!" });
					}
			
					// return res.json({ "status": "success", "message": "Deck updated successfully" });
				});



		})
      }
	})
}

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
		return res.json({ "status": "failed", "message": "Invalid deckid!"});

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
	// var presentDate = flashcard.nextDate;
	var presentDate = new Date();
	
	if( quality == 2) {
		var temp = 5;
		easiness = Math.min(2.5, Math.max(1.3, easiness + 0.1 - ((5.0 - temp)*(0.08 + (5.0 - temp)*0.02))));
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
	nextDate = nextDate.getTime() + millisecondsInDay*inter;
	nextDate = new Date(nextDate);
	var nextDateScaled = nextDate;
	// nextDate = nextDate.getTime();

	db.getDeck(deckid, function(err, response){
		if(err){
			console.log(err);
			return res.json({"status": "failed", "message": "Error!" });
		}

		console.log(response);
		var string = JSON.stringify(response);
		var json = JSON.parse(string);
		console.log(json[0]);

		var startDate = json[0].startDate;
		var endDate = json[0].endDate;
		console.log(startDate);
		console.log(endDate);
		// startDate = startDate.split(/[- :]/);
		// startDate[1]--;
		// endDate = endDate.split(/[- :]/);
		// endDate[1]--;
		startDate = new Date(startDate);
		endDate = new Date(endDate);
		console.log(startDate);
		console.log(endDate);
		// startDate = new Date();
		// console.log(startDate);
		// endDate = new Date(startDate.getDate() + 30);
		// console.log(endDate);
		var differenceInTime = endDate.getTime() - startDate.getTime();
		console.log(differenceInTime);
		var referenceTime = 15778476000;
		var fraction = differenceInTime / referenceTime;
		var differenceBetweenNextDateAndPresentDate = nextDate.getTime() - presentDate.getTime(); 
		nextDateScaled=fraction*differenceBetweenNextDateAndPresentDate;
		nextDateScaled = new Date(nextDateScaled);
        if(nextDateScaled  < presentDate || (nextDateScaled.getTime() - presentDate.getTime() <= millisecondsInDay)) {
			nextDateScaled = new Date(presentDate.getTime() + millisecondsInDay)
		}

		console.log(nextDate);
		console.log(nextDateScaled);

		db.updateFlashcard(flashcardid, front, back, repetitions, inter, easiness, nextDate, nextDateScaled, function (err, rows) {
			if (err) {
				console.log(err);
				return res.json({ "status": "failed", "message": "Error!" });
			}
	
			return res.json({ "status": "success", "message": "Deck updated successfully" });
		});
	})


	// db.updateFlashcard(flashcardid, front, back, repetitions, inter, easiness, nextDate, nextDateScaled, function (err, rows) {
	//     if (err) {
	//     	console.log(err);
	//     	return res.json({ "status": "failed", "message": "Error!" });
	//     }

	// 	return res.json({ "status": "success", "message": "Deck updated successfully" });
	// });


})


router.post('/reorderFlashcards', function(req, res, next){
	var presentDate = new Date();
	var deckid = req.body.deckid;

	db.getDeck(deckid, function(err, response){
		if(err){
			console.log(err);
			return res.json({"status": "failed", "message": "Error!" });
		}

		var string = JSON.stringify(response);
		var json = JSON.parse(string);

		var endDate = json[0].endDate;
		endDate = new(endDate);

		var leftDays = endDate.getDate() - presentDate.getDate() + 1;
		db.getFlashcards(function(err,response) {
			var stringFlashcard = JSON.stringify(response);
			var jsonFlashcard = JSON.parse(stringFlashcard);

			var totalFlashcards = jsonFlashcard.length;
			
			for(let i=0 ; i < totalFlashcards ; i++) {
				jsonFlashcards[i].nextDate = new Date(jsonFlashcards[i].nextDate);
			}

			jsonFlashcards.sort(function(a, b){
				return b.nextDate - a.nextDate;
			})

			var cardsPerDay = (totalFlashcards / leftDays);
			var date = presentDate;
			var index = 0;

			for(let r=1; r <= leftDays ; r++) {

				for(let s=0; s< cardsPerDay ; s++) {
					jsonFlashcards[index].nextDate.setDate(date.getDate());
					index++;
				}

				date.setDate(date.getDate() + 1);
			}

			var leftCards = totalFlashcards - (leftDays*cardsPerDay);
			
			for(let r=1;r<=leftCards;r++){
				jsonFlashcards[index].nextDate.setDate(date.getDate());
				index++;
			}

			for(let r=0;r< totalFlashcards; r++) {
                 
				db.updateFlashcard(jsonFlashcards[r].flashcardid, jsonFlashcards[r].front, jsonFlashcards[r].back, jsonFlashcards[r].repetitions, jsonFlashcards[r].inter, 
					jsonFlashcards[r].easiness, jsonFlashcards[r].nextDate, jsonFlashcards[r].nextDate, function (err, rows) {
					if (err) {
						console.log(err);
						// return res.json({ "status": "failed", "message": "Error!" });
					}
			
					// return res.json({ "status": "success", "message": "Deck updated successfully" });
				});
			}
		})
	})



	
})

module.exports = router;
