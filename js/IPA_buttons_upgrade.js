$(document).ready(function() {
    $('.ipa-buttons button[type=button]').hover(function() {
        $('div.symbol').text(($(this).text()));
        $('div.description').text(($(this).val()));
        return true;
    });
    $('.ipa-buttons button[type=button]').mouseout(function() {
        $('div.symbol').html('&nbsp;');
        $('div.description').text('');
        return true;
    });
    $('#lang-switch').click(function() {
        $('.rp').toggleClass('hidden');
        $('.rp > button').toggleClass('hidden');
        $('.genam').toggleClass('hidden');
        $('.genam > button').toggleClass('hidden');

        return true;
    });
    $('#sound-switch').click(function() {
        $('.sound_on').toggleClass('hidden');
        $('.sound_off').toggleClass('hidden');
        return true;
    });
    $('.ipa-buttons button[type=button]').click(function() {
    	if($('.sound_off').hasClass('hidden')) {
    		var audio = $(this).val();
    		audio = audio.replace(/\s+/g, "_");
    		audio = 'audio/'+audio+'.wav';
    		audio = 'audio/demo'+(Math.floor(Math.random() * 10) + 1)+'.wav';
    		$('#sound_element').html("<embed src='"+audio+"' hidden=true autostart=true loop=false>");
    	}
    	else {
    		return true;
    	}
    	return true;
    });
    $(document).keyup(function() {
    	$('.insertHere').val(function(index, value) {
    	var input = $('.insertHere').val();
    	if (input.length !== 0) {
    		return input.replace('g', 'ɡ');
    		}
    	else {
    		return '';
    	}
    	});
    });
    $('#backspace').click(function(){
    	$("#backspace").addClass("clicked");
    	$(".insertHere").val(
    	function(index,value){
        return value.substr(0,value.length-1);
    	})
    	setTimeout(function () {
            $("#backspace").removeClass("clicked");
        }, 200);
	})
});
