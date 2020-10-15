$(document).ready(function(){
    $.ajax({
       type: "GET",
       contentType: "application/json",
       url: `/apis/getFlashcards/${deckid}`,
       success: function(response) {
            console.log(response.status);
            console.log(response.result);
            flashcards = response.result;
            displayFlashcards();
       },
       error: function(xhr, status, err) {
          console.log(err.toString());
       }
    });
});
var flashcards;
function displayFlashcards() {
    if(displayFlashcards.index == flashcards.length)
        alert("You're done!");
    showNextCard(flashcards[displayFlashcards.index]);
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
    console.log(front);
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