$(document).ready(function(){
	var href = window.location.href;
	var moodleurl = "";
	if (href.match(/http.*:\/\/.+\/quiz\/*?\//g)) {
		moodleurl = String(href.match(/http.*:\/\/.+\/quiz\/*?\//g)).replace('/mod/quiz', '');
	} else if (href.match(/http.*:\/\/.+\/question\/*?\//g)) {
		moodleurl = String(href.match(/http.*:\/\/.+\/question\/*?\//g)).replace('/question', '');
	} else {
		console.log('could not locate moodle installation directory');
	}
	$("body").append('<div class="assets_holder"></div>');
	
	$(".ipa-buttons").slice(1).remove();	
	
	if ($('.assets').length === 0) {
		$('div.assets_holder').html('<link href="' + moodleurl +'question/type/transcription/css/IPA_buttons.css" type="text/css" rel="stylesheet" /><div class="assets"></div>');
	}
	else {
		return false;
	}
	
	$('html').click(function(e){
		var target = $(e.target);
		if(!($(e.target).parents(".assets").length == 1 || $("input[qtype='transcription']").is(":focus"))){
			$('div.assets').empty();
		}
	});
	
	$("input[qtype='transcription']").on("click", function(){
		var whichtext = $(this);
		if (whichtext.is('[readonly="readonly"]')) {
			return false;
		} else {
			$.ajax({
				url: moodleurl + "question/type/transcription/keyboard.php",
				cache: false
			}).done(function(html){
				$('div.assets').html(html);
				if(!$('div.assets').is(':empty')){
					var object = $(this);
					$('div.assets').on("click", object, function(){
						whichtext.focus();
					});
				}
			});
		}
	});
	
});

