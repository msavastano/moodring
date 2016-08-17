$( document ).ready(function() {
    // This sets the current mood in page
    if(document.getElementById('cm')){
        var currMood = document.getElementById('cm').value;
        $('#moodChoices').val(currMood);
    }
    $('#firstMoodChoices').val('Select First Mood');
    // Control tab buttons by user logged in or not
    if(document.getElementById('nu')){
      var nu = document.getElementById('nu').value;
      if(!nu){
        console.log('notnu')
        $('#logoutid').hide();
        $('#friendlistid').hide();
        $('#searchid').hide();
        $('#oldmoodsid').hide();
        $('#moodfeedid').hide();
      }else{
        $('#loginid').hide();
      }
    }

    $('#moodChoices').change(function(){
      //alert( "Change your mood?" );
      $('#moodChoices').fadeOut('fast').fadeIn('fast');
    });

    $('#submitmd').click(function(){
      /* when the submit button in the modal is clicked, submit the form */
      $('#addMood').submit();
    });

    $('#submitcomm').click(function(){
      $('#addComment').submit();
    });

    $('#submitcommcomm').click(function(){
      $('#addCommentComment').submit();
    });

    $('.commcommBtn').click(function(){
      $('#addCommentComment').attr("action", $(this).data("com-id"));
      $('#comcomheader').text($(this).data("com-com"));
      $('#comcomuser').text($(this).data("com-user"));
    });
});

function  getCommentID(){
  return document.getElementById('comcom').value
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
