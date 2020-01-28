$(document).ready(function() {
  // invio del messaggio premendo il tasto invio
  $('#add-message').keypress(
      function (event) {
        if(event.which == 13 || event.keyCode == 13) {
          sendMessage();
        }
      }
    );

      // invio e ricezione del messaggio on click sull'icona
      $(document).on('click', '.send_icon', function() {
        sendMessage();
      });


      // ricerca nell'input delle chat
      $('.search_chat_wrapper input').keyup(function () {
        var text = $('.search_chat_wrapper input').val().toLowerCase();

        $('.item_wrapper').each(function () {
          var contactName = $(this).find('.contact_name').text().toLowerCase();
          if(contactName.includes(text) == true) {
            $(this).show();
          } else {
            $(this).hide();
          }
        });
      });

      // cambio del pannello della conversazione e dati di quest'ultima
      $(document).on('click','.item_wrapper', function() {
        var conversazione = $(this).attr('data-contact');
        var pannelloConversazione = $('.conversation[data-contact="' + conversazione + '"]');
        $('.conversation').removeClass('active');
        pannelloConversazione.addClass('active');
        $('.item_wrapper').removeClass('on_active');
        $(this).addClass('on_active');

        var name = $(this).find('.contact_name').text();
        var time = $(this).find('.last_message_time > p').text();
        var img = $(this).find('.chat_list_avatar img').attr('src');
        $('.main_content_right .current_chat .current_chat_name .head_name').text(name);
        $('.main_content_right .current_chat .current_chat_name .head_time').text('Ultimo accesso oggi alle' + ' ' + time);
        $('.main_content_right .current_chat .current_chat_avatar img').attr('src', img);
      });

      // attivazione del dropdown
      $(document).on('click', '.message-options', function() {
      $(this).parent().siblings('.dropdown').toggleClass('active');
      $(this).parents('.message').siblings('.message').find('.dropdown').removeClass('active');
      });

      // cancellazione del messaggio dal dropdown
      $(document).on('click', '.delete_message', function() {
        $(this).parents('.message').remove();
      });

      // cambio dell'icona in basso di fianco alla barra invio Messaggio
      $('#add-message').focus(function(){
        $('.send_icon > i').removeClass('fas fa-microphone').addClass('fas fa-paper-plane');
          }).blur(function(){
            $('.send_icon > i').removeClass('fas fa-paper-plane').addClass('fas fa-microphone');
      });
  });



// --------------------FUNZIONI GENERICHE---------------------------------
// funzione per l'invio dei messaggi dall'utente
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
    $('.conversation.active').append(newMessage);
    scrollMessage();
    $('#add-message').val('');
    setTimeout(receivedMessage, 3000);
  }
}

// funzione che manda i messaggi di risposta
function receivedMessage() {
  var textMessage = 'Ciao Bello!';
  var newMessage = $('.template .message').clone();
  newMessage.find('.message-text').text(textMessage);

  var data = new Date();
  var hours = addZero(data.getHours());
  var minutes = addZero(data.getMinutes());
  var time = hours +':'+ minutes;

  newMessage.find('.message-time').text(time);
  newMessage.addClass('received');
  $('.conversation.active').append(newMessage);

  $('#add-message').val('');
  scrollMessage();
}


// funzione che crea lo zero nel tempo
function addZero(number) {
  if(number < 10) {
    number = '0' + number;
  }
  return number;
}

// funzione che scrolla i messaggi
function scrollMessage() {
    var heightContainer = $('.conversation.active').height();
    $('.conversation.active').scrollTop(heightContainer);
}
