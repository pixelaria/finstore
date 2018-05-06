$(function (){
  console.log('init');

  $(window).scroll(function(){
    var header = $('.header'),
        main = $('.main'),
        scroll = $(window).scrollTop();
    if (scroll >= 105) {
      header.addClass('header--fixed');
      main.addClass('main--fixed');
    } else {
      header.removeClass('header--fixed');
      main.removeClass('main--fixed');
    }
  });
  
  $('.cart__toggler').click(function(e){
    e.preventDefault();
    $(this).toggleClass('cart__toggler--active');
    $('.toolbar').toggleClass('toolbar--active');
    $('.cart').toggleClass('cart--active');
  });

  $('.search__toggler').click(function(e){
    e.preventDefault();
    $('.search').toggleClass('search--active');
    
  });

  

  $('.nav__toggler').click(function(e){
    e.preventDefault();
    $(this).closest('.nav').toggleClass('nav--active');
  });
  
  $('.sidebar-toggler').click(function(){
    $(this).toggleClass('sidebar-toggler--open');
  });

  $('.slider__toggler').click(function(e){
    e.preventDefault();
    $(this).closest('.slider__item').toggleClass('slider__item--closed');
  });


  var header = document.querySelector('.header');
  var footer = document.querySelector('.footer');
  var slideoutBtn = document.querySelector('.sidebar-toggler');

  var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 256,
    'tolerance': 70,
    'side': 'left',
    'tolerance': 70,
    'touch': false

  });


  // Toggle button
  slideoutBtn.addEventListener('click', function() {
    slideout.toggle();
  });

  slideout.on('beforeopen', function () {
    header.classList.add('fixed-open');
    footer.classList.add('fixed-open');
  });

  slideout.on('beforeclose', function () {
    header.classList.remove('fixed-open');
    footer.classList.remove('fixed-open');
  });


  // Init all product sliders
  $.each($('.products-slider__products'), function() { 
    var $prev = $(this).prev();
    var $next = $(this).next();
    
    var $slider = $(this).lightSlider({
      item: 4,
      loop: false,
      slideMove: 1,
      slideMargin: 0,
      easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
      speed: 600,
      pager: false,
      controls: false,

      
      responsive : [
        {
          breakpoint:992,
          settings: {
              item:2,
              slideMove:1,
          }
        },
        {
          breakpoint:500,
          settings: {
            item:1,
            slideMove:1,
            pager: true,
          }
        }
      ]
      
    });  

    $prev.click(function(e){
      $slider.goToPrevSlide(); 
    });

    $next.click(function(e){
      $slider.goToNextSlide(); 
    });
    
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


  $('.menu__opener').click(function(e){
    $(this).closest('.menu__item').toggleClass('menu__item--opened');

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

  $('.im--phone').mask('+7 (000) 000-00-00');

  $('.input--required').change(function(e){
    $(this).removeClass('input--error');
    $(this).removeClass('input--success');
    
    var val = $(this).val();
    if ($(this).hasClass('im--phone')) {
      if (val.length<18)
        $(this).addClass('input--error');
      else {
        $(this).addClass('input--success');
      }
    } else {
      if (val=='') {
        $(this).addClass('input--error');
      } else {
        $(this).addClass('input--success');
      } 
    }
    
  });


});