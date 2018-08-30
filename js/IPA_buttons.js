$(function() {
    $(".toggler").click(function() {
        var dom = $(".showhide");
        jQuery._data(dom[0],"olddisplay","inline-block");
        dom.toggle();
    });
});

//prevents input from losing focus when buttons on keyboard are clicked
$('button').hover(function(){
    focused_element = $("*:focus").get(0);
});
$('button').click(function(){
    focused_element.focus();
});

$(function() {
    $("input[type=text]").focus(function() {
    $("input[type=text]").removeClass('insertHere');
    if ($(this).is('[readonly="readonly"]')) {
        return false;
    } else {
        $(this).addClass('insertHere');
        }
    });
});

$(function() {
$('button').click(function() {
        $('input.insertHere').insertAtCaret($(this).text());
        return false;
    });
});

$.fn.insertAtCaret = function(myValue) {
    return this.each(function() {
        //IE support
        if (document.selection) {
            this.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
            this.focus();
        }
        //MOZILLA / NETSCAPE support
        else if (this.selectionStart || this.selectionStart == '0') {
            var startPos = this.selectionStart;
            var endPos = this.selectionEnd;
            var scrollTop = this.scrollTop;
            this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
            this.focus();
            this.selectionStart = startPos + myValue.length;
            this.selectionEnd = startPos + myValue.length;
            this.scrollTop = scrollTop;
        } else {
            this.value += myValue;
            this.focus();
        }
    });
};


$('.genam').hide();
$('#lang-switch').click(function() {
    $('.rp').toggle();
    $('.genam').toggle();
});

$('.ipa-buttons button[type=button]').hover(function() {
    $('div.symbol').text(($(this).text()));
    $('div.description').text(($(this).val()));
});
$('.ipa-buttons button[type=button]').mouseout(function() {
    $('div.symbol').html('&nbsp;');
    $('div.description').text('');
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