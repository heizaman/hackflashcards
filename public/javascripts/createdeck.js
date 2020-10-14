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