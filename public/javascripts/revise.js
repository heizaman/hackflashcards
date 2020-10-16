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
            displayFlashcards();
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
        var today = date;
        console.log(today);
        if(Date(flashcards[i].nextDateScaled) == today)
            todaysCards.push(flashcards[i]);
    }
    return todaysCards;
}

function nextDayCards() {
    date++;
    getTodaysCards(flashcards);
    displayFlashcards();
}

function displayFlashcards() {
    if(displayFlashcards.index == todaysCards.length) {
        alert("You're done with this day's cards!");
        showPopUp();
    }
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