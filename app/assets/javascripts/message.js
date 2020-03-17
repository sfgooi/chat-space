$(function(){ 

  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat-main__content__coment" data-message-id=${message.id}>
        <div class="chat-main__content__coment__user-data">
          <div class="chat-main__content__coment__user-data__name">
            ${message.user_name}
            <div class="chat-main__content__coment__user-data__name__time">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__content__coment__user-data__new">
            ${message.content}
            <img src=${message.image} >
          </div>
        </div>
      </div>`
     return html;
   } else  {
     var html =
      `<div class="chat-main__content__coment" data-message-id=${message.id}>
        <div class="chat-main__content__coment__user-data">
          <div class="chat-main__content__coment__user-data__name">
            ${message.user_name}
            <div class="chat-main__content__coment__user-data__name__time">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__content__coment__user-data__new">
            ${message.content}
          </div>
        </div>
      </div>`
     return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__content').append(html);  
      $('form')[0].reset();
      $('.chat-main__content').animate({ scrollTop: $('.chat-main__content')[0].scrollHeight});
      $(".send").prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })

  var reloadMessages = function() {
    
    var last_message_id = $('.chat-main__content__coment:last').data("message-id");
    $.ajax({
      
      url: "api/messages",
      
      type: 'get',
      dataType: 'json',
      
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__content').append(insertHTML);
        $('.chat-main__content').animate({ scrollTop: $('.chat-main__content')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});

