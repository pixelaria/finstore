$(function (){
  console.log('init');

  $(window).scroll(function(){
    var header = $('.header'),
        main = $('.main'),
        scroll = $(window).scrollTop();
    if (scroll >= 300) {
      header.addClass('header--fixed');
      main.addClass('main--fixed');
    } else {
      header.removeClass('header--fixed');
      main.removeClass('main--fixed');
    }
  });
  
  $('.cart__toggler').click(function(e){
    $(this).toggleClass('cart__toggler--active');
    $('.toolbar').toggleClass('toolbar--active');
    $('.cart').toggleClass('cart--active');
    
  });

  $('.nav__toggler').click(function(e){
    $(this).closest('.nav').toggleClass('nav--active');
  });
  
  if ($('.baron').length) {
    baron({
        root: '.baron',
        scroller: '.baron__scroller',
        bar: '.baron__bar',
        scrollingCls: '_scrolling',
        draggingCls: '_dragging'
    }).fix({
        elements: '.header__title',
        outside: 'header__title_state_fixed',
        before: 'header__title_position_top',
        after: 'header__title_position_bottom',
        clickable: true
    }).controls({
        // Element to be used as interactive track. Note: it could be different from 'track' param of baron.
        track: '.baron__track',
        forward: '.baron__down',
        backward: '.baron__up'
    });
  }


});