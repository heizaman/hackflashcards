$(document).ready(function(){
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: `/apis/getDeckName/${deckid}`,
        success: function(response) {
           console.log(response);
           deckname = response.result[0].name;
           console.log(deckname);
        },
        error: function(xhr, status, err) {
           console.log(err.toString());
        }
     });
    $.ajax({
       type: "GET",
       contentType: "application/json",
       url: `/apis/getFlashcards/${deckid}`,
       success: function(response) {
            console.log(response.status);
            console.log(response.result);
            showFlashcards(response.result);
       },
       error: function(xhr, status, err) {
          console.log(err.toString());
       }
    });
});
var deckname;
function showFlashcards(deck) {
    console.log(deckname);
   $("#deck-name").html(' in <a href="/flashcards/'+ deckid +'">' + deckname + '</a>');
   for(var i=0;i< deck.length;i++){
    console.log(deck[i].flashcardid);
    var flashcard ='';
    flashcard += '<tr>';
    flashcard += '<td>' + `${i+1}` + '</td>';
   console.log(disp(deck[i].front));
    flashcard += '<td>' + disp(JSON.parse(deck[i].front)) + '</td>';
    flashcard += '<td>' + getDateFromTimeStamp(deck[i].nextDateScaled) +'</td>';
    flashcard += '</tr>';
    $('#tableOfFlashcards').append(flashcard);

 }
}
function disp(front) {
   var cardFront='<div>';
   console.log(front);
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
      cardFront += `<img width="80" height="90" src = "${front.img}">`;
  }
  cardFront+='</div>'
  console.log(cardFront);
  return cardFront;
}
function getDateFromTimeStamp(endDate) {
 var year = endDate.substring(0,4);
 var month_number = endDate.substring(5,7);
 var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 var day = endDate.substring(8,10);
 return day + '-' + months_arr[month_number-1] + '-' + year;
}