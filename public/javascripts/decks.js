$(document).ready(function(){
      $.ajax({
         type: "GET",
         contentType: "application/json",
         url: '/apis/getDecks',
         success: function(response) {
            console.log(response);
            decks = response.result;
            showDecks(response.result);
         },
         error: function(xhr, status, err) {
            console.log(err.toString());
         }
      });
 });

var decks;
function showDecks(decks) {
   for(var i=0;i< decks.length;i++) {
      console.log(decks[i].deckid);
      var linkToFlashCards = '/flashcards/'+ decks[i].deckid;
      var revise = '/revise/' +  decks[i].deckid;
      var addFlashcard ='/createflashcard/'+decks[i].deckid;
      var toEdit = decks[i];
      console.log(toEdit);
      var deck ='';
      deck += '<tr>';
      deck += `<td><a href = ${linkToFlashCards}>` + decks[i].name + '</a></td>';
      deck += '<td>' + getDateFromTimeStamp(decks[i].endDate) +'        ' + `<button class= "button is-primary edit" onclick=updateDate(${i})>Edit</button></td>`;
      deck += `<td><button class ="button button is-light"><a href = ${revise}>` + 'REVISE' + '</button></a></td>';
      deck += `<td><button class ="button button is-light"><a href = ${addFlashcard}>` + 'ADD FLASHCARD' + '</button></a></td>';
      deck +='</a></tr>';
      console.log(deck);
      $('#tableOfDecks').append(deck);
   }
 }

 var deck;
 function updateDate(i) {
   showPopUp(decks[i]);
   deck = decks[i];
}

function getDateFromTimeStamp(endDate) {
   console.log(endDate);
   var year = endDate.substring(0,4);
   var month_number = endDate.substring(5,7);
   var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   var day = parseInt(endDate.substring(8,10)) + 1;
   return day.toString() + '-' + months_arr[month_number-1] + '-' + year;
 }

function showPopUp(deck) {
   document.getElementById('popup-title').innerHTML = deck.name;
   var popup = document.getElementById('popup');
   popup.classList.add('is-active');
}

function onYes() {
   var popup = document.getElementById('popup');
   popup.classList.remove('is-active');
   var date = $("#deck-date").val();
   console.log(date);
   $.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"deckid": deck.deckid, "name":deck.name, "front": deck.front, "back": deck.back, "endDate":date}),
		url: '/apis/updateDeck',
		success: function(response) {
			if(response.status == 'success') {
				alert("Updated end date!");
			}
			else {
				alert(response.message || "Error!");
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
   });

   var millisecondsToWait = 50;
      setTimeout(function() {
         location.reload();
   }, millisecondsToWait);
   
}

function onNo() {
   var popup = document.getElementById('popup');
   popup.classList.remove('is-active');
}