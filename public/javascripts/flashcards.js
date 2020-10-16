$(document).ready(function(){
    $.ajax({
       type: "GET",
       contentType: "application/json",
       url: `/apis/getFlashcards/${deckid}`,
       success: function(response) {
            console.log(response.status);
            console.log(response.result);
            showFlashcardsOfDeck(response.result);
       },
       error: function(xhr, status, err) {
          console.log(err.toString());
       }
    });
});

function showFlashcardsOfDeck(flashcards) {
    for(var i=0; i<flashcards.length; i++) {
        console.log(flashcards[i]);
        var cardFront = '<div class="card-body frontOfCard">'
        var front = JSON.parse(flashcards[i].front);
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
            cardFront += `<img style="width:30px;height:30px;" src = ${front.img}>`;
        }
        cardFront += '</div>';
        console.log(front);

        var cardBack = '<div class="card-body backOfCard">'
        var back = JSON.parse(flashcards[i].back);
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
        console.log(back);

        var flashcard = '<div class="card flashcardShow">';
        flashcard += cardFront;
        flashcard += cardBack;
        flashcard += '</div>';
        $('#allcards').append(flashcard);
    }
}