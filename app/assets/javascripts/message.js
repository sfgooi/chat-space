$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat-main__content__coment">
         <div class="chat-main__content__coment__user-data">
           <div class="chat-main__content__coment__user-data__name">
             ${message.user_name}
            <div class="chat-main__content__coment__user-data__name__time">
              ${message.created_at}
           </div>
        </div>

        </div>
         <div class="chat-main__content__coment__user-data__new">
           <p class="chat-main__content__coment__user-data__new">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat-main__content__coment">
        <div class="chat-main__content__coment__user-data">
          <div class="chat-main__content__coment__user-data__name">
            ${message.user_name}
            <div class="chat-main__content__coment__user-data__name__time">
              ${message.created_at}
            </div>
          </div>
           
        </div>
          <div class="chat-main__content__coment__user-data__new">
            <p class="chat-main__content__coment__user-data__new">
            ${message.content}
            </p>
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
    $('.chat-main__content').animate({ scrollTop: $('.chat-main__content')[0].scrollHeight});
    $(".send").prop("disabled", false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
});
})
});