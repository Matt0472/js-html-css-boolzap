$(document).ready(function() {
  $('#add-message').keypress(
      function (event) {
        if(event.which == 13 || event.keyCode == 13) {
          sendMessage();
        }
      }
    );
    $(document).on('click', '.send_icon', function() {
      sendMessage();
    });
      $(document).on('click', '#add-message',
      function() {
        $('span.display_none').removeClass('display_none');
        $('.microphone').addClass('display_none');
      });
        $(document).on('click', '.conversation',
        function() {
          $('span.airplane').addClass('display_none');
          $('.microphone').removeClass('display_none');
        });
  }
);



function sendMessage() {
  var textMessage = $('#add-message').val();

  if(textMessage.length != 0) {
    var newMessage = $('.template .message').clone();

    newMessage.find('.message-text').text(textMessage);

    var data = new Date();
    var hours = addZero(data.getHours());
    var minutes = addZero(data.getMinutes());
    var time = hours +':'+ minutes;

    newMessage.find('.message-time').text(time);
    newMessage.addClass('sent');
    $('.conversation').append(newMessage);

    $('#add-message').val('');
  }
}

function addZero(number) {
  if(number < 10) {
    number = '0' + number;
  }
  return number;
}
