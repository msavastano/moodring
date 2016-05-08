$( document ).ready(function() {
    //var  main_controller = require("../../app_server/controllers/main_controller");
    console.log("IN");
    var currMood = document.getElementById('cm').value;
    $('#moodChoices').val(currMood);
    $('#firstMoodChoices').val('Select First Mood');
    /*$('#friend_list_div li button').each(function(){
      var c = $(this).attr('moodcolor');
      console.log($(this));
      console.log($(this).css('backgroundColor'));
      $(this).css('backgroundColor', c)
    });*/
});

var cbc = function changeBackground(color) {
   document.body.style.background = color;
}

var cfc = function changeFontColor(color) {
   document.body.style.color = color;
}


//    var bgcolor = $(this).attr('hex');
//    var fontcolor = $(this).attr('fonthex');
//    var lab = $(this).attr('lab');
//    console.log(lab);
//    $(this).parents('.btn-group').find('.dropdown-toggle').html($(this).text());
//    cbc(bgcolor);
//    cfc(fontcolor);
    //main_controller.new_mood(label);
//});
