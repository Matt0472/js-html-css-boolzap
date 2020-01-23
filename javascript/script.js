$(document).ready(function() {
  $('#add-message').keypress(
      function (event) {
        if(event.which == 13 || event.keyCode == 13) {
          var text = $('#add-message').val();
          var elementNew = $('.template li').clone();
          elementNew.append(text);
          $('.my_message').append(elementNew);
          $('#add-message').val(' ');
        }
      }
    );
    $(document).on('click', '.send_icon i', function() {
      var text = $('#add-message').val();
      var elementNew = $('.template li').clone();
      elementNew.append(text);
      $('.my_message').append(elementNew);
      $('#add-message').val(' ');
    })
});
