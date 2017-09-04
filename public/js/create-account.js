$('form').submit( function () {

	if($('#accountName').val()===""){
		$('#response').html("<p>The form cannot be empty.</p>");
		return false;
	}
	var formName = $('#accountName').val();
	var formdata = $(this).serialize();

	$.ajax({
		type: "POST",
		url: "/api/insert",
		data: formdata,
		error: function(req, err){console.log('my message' + err);}
	});

	$('#response').html("<p>" + formName + "'s account has been created.</p>");
	$('form').trigger('reset');

	return false;
});