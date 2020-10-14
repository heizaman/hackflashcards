function checkboxChanged()
{
    if($('#front-heading-check').is(":checked"))   
        $("#front-heading").show();
    else
        $("#front-heading").hide();

    if($('#back-heading-check').is(":checked"))   
        $("#back-heading").show();
    else
        $("#back-heading").hide();

    if($('#front-subheading-check').is(":checked"))   
        $("#front-subheading").show();
    else
        $("#front-subheading").hide();

    if($('#back-subheading-check').is(":checked"))   
        $("#back-subheading").show();
    else
        $("#back-subheading").hide();

    if($('#front-para-check').is(":checked"))   
        $("#front-para").show();
    else
        $("#front-para").hide();

    if($('#back-para-check').is(":checked"))   
        $("#back-para").show();
    else
        $("#back-para").hide();

    if($('#front-img-check').is(":checked"))   
        $("#front-img").show();
    else
        $("#front-img").hide();

    if($('#back-img-check').is(":checked"))   
        $("#back-img").show();
    else
        $("#back-img").hide();

    if($('#front-heading-check').is(":checked") || $('#front-subheading-check').is(":checked")
    	|| $('#front-para-check').is(":checked") || $('#front-img-check').is(":checked"))   
        $("#front-sample").hide();
    else
        $("#front-sample").show();

    if($('#back-heading-check').is(":checked") || $('#back-subheading-check').is(":checked")
    	|| $('#back-para-check').is(":checked") || $('#back-img-check').is(":checked"))   
        $("#back-sample").hide();
    else
        $("#back-sample").show();
}

function nameChanged() {
	var name = $("#deck-name-form").val();

	if(name == "") {
		name = "My Deck";
	}

	$("#deck-name").html(name);
}

function submitCreateDeck() {
	var name = $("#deck-name-form").val();

	if(name == "") {
		alert("Invalid Name");
		return;
	}
	
	var frontHeading = $("#front-heading-check").is(":checked") ? true : false;
	var frontSubeading = $("#front-subheading-check").is(":checked") ? true : false;
	var frontPara = $("#front-para-check").is(":checked") ? true : false;
	var frontImg = $("#front-img-check").is(":checked") ? true : false;

	var front = JSON.stringify({
		"heading": frontHeading,
		"subheading": frontSubeading,
		"para": frontPara,
		"img": frontImg
	});

	var backHeading = $("#back-heading-check").is(":checked") ? true : false;
	var backSubeading = $("#back-subheading-check").is(":checked") ? true : false;
	var backPara = $("#back-para-check").is(":checked") ? true : false;
	var backImg = $("#back-img-check").is(":checked") ? true : false;

	var back = JSON.stringify({
		"heading": backHeading,
		"subheading": backSubeading,
		"para": backPara,
		"img": backImg
	});

	var date = $("#deck-date").val();

	if(date == "") {
		alert("Invalid Date");
		return;
	}

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"name": name, "front": front, "back": back, "endDate": date}),
		url: '/apis/createDeck',
		success: function(response) {
			if(response.status == 'success') {
				alert("Deck Created!");
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