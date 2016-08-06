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

    $('#moodChoices').change(function(){
      //alert( "Change your mood?" );
      $('#moodChoices').fadeOut('fast').fadeIn('fast');
    });

    $('#submit').click(function(){
      /* when the submit button in the modal is clicked, submit the form */
      $('#addMood').submit();
    });

    $('#submitcomm').click(function(){
      /* when the submit button in the modal is clicked, submit the form */
      $('#addComment').submit();
    });

    $('#submitcommcomm').click(function(){
      /* when the submit button in the modal is clicked, submit the form */
      $('#addCommentComment').submit();
    });

    $('.commcommBtn').click(function(){
      /* when the submit button in the modal is clicked, submit the form */
      //$(this).data("com-id", $(this).data("com-id"));
      console.log("THIS   "+$(this).data("com-id"));
      $('#comcom').text($(this).data("com-id"));
      var url = $(this).data("com-id");
    });

    //$('#moodDate').html(dateFormatting(this));



});

var dateFormat = require('dateformat');
var dateFormatting =  function (date){
  return dateFormat(date, "fullDate")
}

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
