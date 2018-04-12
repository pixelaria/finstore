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
  
  $('.gallery').lightSlider({
      gallery:true,
      item:1,
      loop:true,
      thumbItem:5,
      slideMargin:0,
      enableDrag: false,
      currentPagerPosition:'left',
      onSliderLoad: function(el) {
          el.lightGallery({
              selector: '.gallery .lslide'
          });
      }   
  });  



  $(document).on('click','.spinner__button', function(e){
    var target = $(this).siblings('.spinner__input--main');
    var change = 1,min = 1, max=200;
    
    if (target.data('change') != undefined) change = parseInt(target.data('change'));
    if (target.data('min') != undefined) min = parseInt(target.data('min'));
    if (target.data('max') != undefined) max = parseInt(target.data('max'));
    
    var val;
    
    if ($(this).hasClass('spinner__button--up')) {
      val=parseInt(target.val()) + change;
    } else {
      val=parseInt(target.val()) - change;
    }
    
    if (val<min) val=min;
    if (val>max) val=max;

    $(target).val(val).change();
    return false;
  });

  $(document).on('click','.select', function(e){
    $(this).toggleClass('select--opened');
    return false;
  });

  $(document).on('click','.select__item', function(e){
    var text = $(this).html();
    var select = $(this).closest('.select');
    var value = $(this).data('value');
    select.find('.select__input').val(value);
    select.find('.select__input').trigger('change');
    select.find('.select__placeholder').html(text);
    select.removeClass('select--opened');
    return false;
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