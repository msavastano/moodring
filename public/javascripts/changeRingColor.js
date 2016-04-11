$( document ).ready(function() {
    console.log("IN");
    $('#moodChooser li a').on('click', function(){        
        var bgcolor = $(this).attr('hex');
        var fontcolor = $(this).attr('fonthex');
        $(this).parents('.btn-group').find('.dropdown-toggle').html($(this).text());
        console.log(bgcolor);
        console.log(fontcolor);
        cbc(bgcolor);
        cfc(fontcolor);
    });
});

var cbc = function changeBackground(color) {
   document.body.style.background = color;
}

var cfc = function changeFontColor(color) {
   document.body.style.color = color;
}
