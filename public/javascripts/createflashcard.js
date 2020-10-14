$(document).ready(function () {
	getDeck();
});


var deck;


function getDeck() {
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"deckid": deckid}),
		url: '/apis/getDeck',
		success: function(response) {
			if(response.status == 'success') {
				showForm(response.decks);
			}
			else {
				alert(response.message || "Error!");
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}


function showForm(decks) {
	if(decks.length < 1) {
		alert("Invalid Deck!");
		window.location = "/createDeck";
	}

	deck = decks[0];

	$("#deck-name").html(" in <a href='/flashcards/"+deck.deckid+"'><u>" + deck.name + "</u></a>");

	var front = JSON.parse(deck.front);
	var back = JSON.parse(deck.back);

	if(front.heading == true) {
		$("#front-heading").show();
		$("#front-heading-form-div").show();
		$("#front-heading-form").prop('disabled', false);
	}
	if(front.subheading == true) {
		$("#front-subheading").show();
		$("#front-subheading-form-div").show();
		$("#front-subheading-form").prop('disabled', false);
	}
	if(front.para == true) {
		$("#front-para").show();
		$("#front-para-form-div").show();
		$("#front-para-form").prop('disabled', false);
	}
	if(front.img == true) {
		$("#front-img").show();
		$("#front-img-form-div").show();
		$("#front-img-form").prop('disabled', false);
	}
	if(back.heading == true) {
		$("#back-heading").show();
		$("#back-heading-form-div").show();
		$("#back-heading-form").prop('disabled', false);
	}
	if(back.subheading == true) {
		$("#back-subheading").show();
		$("#back-subheading-form-div").show();
		$("#back-subheading-form").prop('disabled', false);
	}
	if(back.para == true) {
		$("#back-para").show();
		$("#back-para-form-div").show();
		$("#back-para-form").prop('disabled', false);
	}
	if(back.img == true) {
		$("#back-img").show();
		$("#back-img-form-div").show();
		$("#back-img-form").prop('disabled', false);
	}
}


function fieldChanged()
{
	var frontHeading = $("#front-heading-form").val();

	if(frontHeading == "") {
		frontHeading = "My Heading";
	}

	$("#front-heading").html(frontHeading);

	var backHeading = $("#back-heading-form").val();

	if(backHeading == "") {
		backHeading = "My Heading";
	}

	$("#back-heading").html(backHeading);

	var frontSubheading = $("#front-subheading-form").val();

	if(frontSubheading == "") {
		frontSubheading = "My Subheading";
	}

	$("#front-subheading").html(frontSubheading);

	var backSubheading = $("#back-subheading-form").val();

	if(backSubheading == "") {
		backSubheading = "My Subheading";
	}

	$("#back-subheading").html(backSubheading);

	var frontpara = $("#front-para-form").val();

	if(frontpara == "") {
		frontpara = "This is a sample paragraph which shows us how a paragraph will appear on the flashcards of this deck.";
	}

	$("#front-para").html(frontpara);

	var backpara = $("#back-para-form").val();

	if(backpara == "") {
		backpara = "This is a sample paragraph which shows us how a paragraph will appear on the flashcards of this deck.";
	}

	$("#back-para").html(backpara);

	var frontimg = $("#front-img-form").val();

	if(frontimg == "") {
		frontimg = "https://bulma.io/images/placeholders/128x128.png";
	}

	$("#front-img-pic").attr("src", frontimg);

	var backimg = $("#back-img-form").val();

	if(backimg == "") {
		backimg = "https://bulma.io/images/placeholders/128x128.png";
	}

	$("#back-img-pic").attr("src", backimg);
}

function submitCreateDeck() {
	var front = JSON.parse(deck.front);
	var back = JSON.parse(deck.back);

	var myfront = {};
	var myback = {};

	if(front.heading == true) {
		var frontHeading = $("#front-heading-form").val();
		myfront.heading = frontHeading;
	}
	if(front.subheading == true) {
		var frontSubheading = $("#front-subheading-form").val();
		myfront.subheading = frontSubheading;
	}
	if(front.para == true) {
		var frontPara = $("#front-para-form").val();
		myfront.para = frontPara;
	}
	if(front.img == true) {
		var frontImg = $("#front-img-form").val();
		myfront.img = frontImg;
	}
	if(back.heading == true) {
		var backHeading = $("#back-heading-form").val();
		myback.heading = backHeading;
	}
	if(back.subheading == true) {
		var backSubheading = $("#back-subheading-form").val();
		myback.subheading = backSubheading;
	}
	if(back.para == true) {
		var backPara = $("#back-para-form").val();
		myback.para = backPara;
	}
	if(back.img == true) {
		var backImg = $("#back-img-form").val();
		myback.img = backImg;
	}

	myfront = JSON.stringify(myfront);
	myback = JSON.stringify(myback);

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"deckid": deckid, "front": myfront, "back": myback}),
		url: '/apis/createFlashcard',
		success: function(response) {
			if(response.status == 'success') {
				alert("Flashcard Created!");
			}
			else {
				alert(response.message || "Error!");
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}