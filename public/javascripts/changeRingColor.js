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

    $('#friend_list_div li button').each(function(){
      var c = $(this).attr('moodcolor');
      console.log($(this));
      console.log($(this).css('backgroundColor'));
      $(this).css('backgroundColor', c)
    });
});

var cbc = function changeBackground(color) {
   document.body.style.background = color;
}

var cfc = function changeFontColor(color) {
   document.body.style.color = color;
}
