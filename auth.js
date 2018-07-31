// PopUp Form and thank you popup after sending message
let $popOverlay = $(".popup-overlay");
let $popWindow = $(".popWindow");
let $subscribeWindow = $(".subscribe_window");
let $popThankYouWindow = $(".thank_you_window");
let $popClose = $(".close-btn");
 
$(function() {
  // Close Pop-Up after clicking on the button "Close"
  $popClose.on("click", function() {
    $popOverlay.fadeOut();
    $popWindow.fadeOut();
  });
 
  // Close Pop-Up after clicking on the Overlay
  $(document).on("click", function(event) {
    if ($(event.target).closest($popWindow).length) return;
    $popOverlay.fadeOut();
    $popWindow.fadeOut();
    event.stopPropagation();
  });
 
  // Form Subscribe
  $(".subscribe-form").submit(function() {
    let th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: th.serialize()
    }).done(function() {
      // после успешной отправки скрываем форму подписки и выводим окно с благодарностью за заполнение формы
      $subscribeWindow.fadeOut();
      $popThankYouWindow.fadeIn();
      // используем куки на 30 дней, если человек заполнил форму
      // для куки обязательно должен быть подключен jquery.cookie.min.js
      $.cookie('hideTheModal', 'true', { expires: 30 });
      // очищаем форму
      setTimeout(function() {
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });
});

// или используйте этот код, если нужно появление формы с куки и вы подключали jquery.cookie.min.js
$(window).load(function() {
    // задаем переменную для cookie
    let hideTheModal = $.cookie('hideTheModal');
    // если cookie не установлено...
    if(hideTheModal == null){
      // Через 2 секунды появляется контактная форма
      setTimeout(function() {
        $popOverlay.fadeIn();
        $subscribeWindow.fadeIn();
      }, 2000);
    }
  });

