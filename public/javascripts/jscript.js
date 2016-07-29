$( document ).ready(function() {
    console.log("IN");
    // This sets the current mood in page
    if(document.getElementById('cm')){
        var currMood = document.getElementById('cm').value;
        $('#moodChoices').val(currMood);
    }
    $('#firstMoodChoices').val('Select First Mood');
    // Control tab buttons by user logged in or not
    if(document.getElementById('nu')){
      var nu = document.getElementById('nu').value;
      console.log(nu);
      if(!nu){
        console.log('notnu')
        $('#logoutid').hide();
        $('#friendlistid').hide();
        $('#searchid').hide();
        $('#oldmoodsid').hide();
      }else{
        $('#loginid').hide();
      }      
    }
});

// Use later
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
