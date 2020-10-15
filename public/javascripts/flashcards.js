$(document).ready(function(){
    $.ajax({
       type: "GET",
       contentType: "application/json",
       url: '/apis/getFlashcards/:deckid',
       success: function(response) {
          console.log(response);
       },
       error: function(xhr, status, err) {
          console.log(err.toString());
       }
    });
});
