$(document).ready(function () {
	var countryArray = ['United States', 'China', 'Japan', 'Germany', 'United Kingdom', 'France', 'India', 'Italy', 'Brazil', 'Canada', 'South Korea', 'Russia', 'Australia', 'Spain', 'Mexico'];
	
	$('#moreGifs').hide();
	// Function renders buttons
	function renderButtons(){ 
		$('#buttons').empty();
		// Loops through countryArray
		for (var i = 0; i < countryArray.length; i++){
		    var a = $('<button>');
		    a.addClass('country').attr('data-name', countryArray[i]).text(countryArray[i]);
		    $('#buttons').append(a);
		}
	}

	// Function to display gifs
	var theGifs = function(){

		var country = $(this).attr('data-name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + country + "&limit=10&api_key=dc6zaTOxFJmzC ";
		
		// Creates AJAX call for the gifs
		$('#gifsView').empty();
	    $.ajax({
	        url: queryURL,
	        type: "GET",
	    })
	    .done(function (response) {
	    	//$.each(response, function (index, value) { <-- I couldn't get it to work using this, and idk why?
	    	for (var i=0; i<response.data.length; i++) {
	    		console.log(response[i]);
	    		var image = "<div class='gifs container'><img class='individualGif col-md-2' data-state='still' data-still='" + response.data[i].images.fixed_height_still.url + "' data-animate='" + response.data[i].images.fixed_height.url + "' src='" + response.data[i].images.fixed_height_still.url + "'></img></div>";
	    		$('#gifsView').append(image);
	    	};

	    	$('#moreGifs').show().html('more');

		}); 
	}

	$('body').on('click', '.individualGif', function(event) {
		var state = $(this).attr('data-state');
		var play = $(this).attr('data-animate');
		var stop = $(this).attr('data-still');

		if (state === 'still') {
			$(this).attr('src', play);
			$(this).attr('data-state', 'animate');
		} if (state !== 'still') {
			$(this).attr('src', stop);
			$(this).attr('data-state', 'still');
		}
	});

	$('#addCountry').on('click', function(){

		var gif = $('#country-input').val().trim();
		countryArray.push(gif);
		renderButtons();
		return false;
	});

	$(document).on('click', '.country', theGifs);

	renderButtons();
});