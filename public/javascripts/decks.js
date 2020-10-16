$(document).ready(function(){
      $.ajax({
         type: "GET",
         contentType: "application/json",
         url: '/apis/getDecks',
         success: function(response) {
            console.log(response);
            showDecks(response.result);
         },
         error: function(xhr, status, err) {
            console.log(err.toString());
         }
      });
 });

function showDecks(decks) {
   console.log(decks[0].name);
   //document.getElementById("tableOfDecks").innerHTML = "";
   
   for(var i=0;i< decks.length;i++){
      console.log(decks[i].deckid);
      var linkToFlashCards = '/flashcards/'+ decks[i].deckid;
      var revise = '/revise/' +  decks[i].deckid;
      var deck ='';
      deck += '<tr>';
      deck += `<td><a href = ${linkToFlashCards}>` + decks[i].name + '</a></td>';
      deck += '<td>' + getDateFromTimeStamp(decks[i].endDate) +'        ' + `<button class= "button is-primary edit" onclick=updateDate(${decks[i].deckid})>Edit</button></td>`;
      deck += `<td><button class ="button button is-light"><a href = ${revise}>` + 'REVISE' + '</button></a></td>';
      deck +='</a></tr>';
      $('#tableOfDecks').append(deck);

   }
 }

function updateDate(deckid) {
   console.log(deckid);
}
function getDateFromTimeStamp(endDate) {
   var year = endDate.substring(0,4);
   var month_number = endDate.substring(5,7);
   var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   var day = endDate.substring(8,10);
   return day + '-' + months_arr[month_number-1] + '-' + year;
 }