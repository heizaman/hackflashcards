$(document).ready(function(){
    $.ajax({
       type: "GET",
       contentType: "application/json",
       url: `/apis/getFlashcards/${deckid}`,
       success: function(response) {
            console.log(response.status);
            console.log(response.result);
            flashcards = response.result;
            todaysCards =  getTodaysCards(response.result);
            displayFirstCard();
       },
       error: function(xhr, status, err) {
          console.log(err.toString());
       }
    });
});
var todaysCards;
var flashcards;
var date = new Date();

function getTodaysCards(flashcards) {
    var todaysCards = [];
    for(var i=0; i<flashcards.length; i++) {
        var nextDate = new Date(flashcards[i].nextDateScaled);
        if(dateEqual(nextDate))
            todaysCards.push(flashcards[i]);
    }
    console.log(todaysCards);
    displayFlashcards.index = 0;
    return todaysCards;
}

function dateEqual(nextDate) {
    if(date.getDate() == nextDate.getDate() && date.getMonth() == nextDate.getMonth())
        return true;
    return false;
}
function displayFirstCard() {
    if(displayFlashcards.index == todaysCards.length) {
        showPopUp();
        return;
    }
    showNextCard(todaysCards[displayFlashcards.index]);
    displayFlashcards.index++;
}

function nextDayCards() {
    date = getNextScheduledDate();
    if(date == null) {
        alert("You've learnt the deck");
        return;
    }
    todaysCards = getTodaysCards(flashcards);
    console.log(todaysCards.length);
    console.log(todaysCards + "nextdaycards");
    showNextCard(todaysCards[displayFlashcards.index]);
    displayFlashcards.index++;
}

function displayFlashcards(id) {
    if(displayFlashcards.index == todaysCards.length) {
        showPopUp();
    }
    var flashcard = todaysCards[displayFlashcards.index - 1];
    var quality;
    if(id == 'easy')
        quality = 2;
    else if(id =='medium')
        quality = 1;
    else if(id == 'hard')
        quality = 0;

    console.log("making post req");
    $.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"flashcard": flashcard, "quality" : quality}),
		url: '/apis/updateFlashcardDate',
		success: function(response) {
			if(response.status == 'success') {
			    console.log("updated next practice date");
			}
			else {
				console.log(response.message || "Error!");
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
    showNextCard(todaysCards[displayFlashcards.index]);
    displayFlashcards.index++;
}
displayFlashcards.index = 0;

function showNextCard(flashcard) {
    document.getElementById('cardfront').innerHTML = getCardFront(flashcard); 
    document.getElementById('cardback').innerHTML = getCardBack(flashcard); 
}

function getCardFront(flashcard) {
    var cardFront = '<div>'
    var front = JSON.parse(flashcard.front);
    if(front.heading) {
        cardFront += `<h1>${front.heading}</h1>`;
    }
    if(front.subheading) {
        cardFront += `<h3>${front.subheading}</h3>`;
    }
    if(front.para) {
        cardFront += `<p>${front.para}</p>`;
    }
    if(front.img) {
        cardFront += `<img src = ${front.img}>`;
    }
    cardFront += '</div>';
    return cardFront;
}

function getCardBack(flashcard) {
    var cardBack = '<div>'
    var back = JSON.parse(flashcard.back);
    if(back.heading) {
        cardBack += `<h1>${back.heading}</h1>`;
    }
    if(back.subheading) {
        cardBack += `<h3>${back.subheading}</h3>`;
    }
    if(back.para) {
        cardBack += `<p>${back.para}</p>`;
    }
    if(back.img) {
        cardBack += `<img src = ${back.img}>`;
    }
    cardBack += '</div>';
    return cardBack;
}

function showPopUp() {
    var popup = document.getElementById('popup');
    popup.classList.add('is-active');
}

function onYes() {
    var popup = document.getElementById('popup');
    popup.classList.remove('is-active');
    nextDayCards();
}

function onNo() {
    var popup = document.getElementById('popup');
    popup.classList.remove('is-active');
}

function getNextScheduledDate() {
    for(var i=0;i<flashcards.length;i++) {
        nextDate = new Date(flashcards[i].nextDateScaled);
        if(nextDate > date) {
            console.log(nextDate +"sangu");
            return nextDate;
        }   
    }
    return null;
}