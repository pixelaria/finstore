$(function (){
  var top = {};

  console.log('init');

  $('.cart__toggler').click(function(e){
    e.stopPropagation();
    e.preventDefault();
    $('.toolbar').toggleClass('toolbar--active');
    $('.cart').toggleClass('cart--active');
  });

  $('.cart__closer').click(function(e){
    hideCart();
    return false;
  });
  
  // If an event gets to the body
  $("body").click(function(){
    hideCart();
  });

  $('.cart').click(function(e){ 
    e.stopPropagation();
  });
 
  function hideCart() {
    $('.cart').removeClass('cart--active');
    $('.toolbar').removeClass('toolbar--active');
  }

  $('.product__cart').click(function(e){
    e.preventDefault();
  });

  $('.search__toggler').click(function(e){
    e.preventDefault();
    $('.search').toggleClass('search--active');
  });

  $(document).on('click', '.alert__closer', function(e){
    var $alert = $(this).closest('.alert');
    
    $alert.removeClass('alert--active');
    
    setTimeout(function() {
      $alert.remove()
    }, 350);

    return false;
  });


  $('.radioblock__item').click(function(e){
    var value = $(this).data('value');
    var $radioblock = $(this).closest('.radioblock');
    var $input = $radioblock.find('.radioblock__input');
    $radioblock.find('.radioblock__item').removeClass('radioblock__item--active');
    $input.val(value);
    $input.trigger('change');
    $(this).addClass('radioblock__item--active');
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
    $('.alert').addClass('fixed-open');
    header.classList.add('fixed-open');
    footer.classList.add('fixed-open');
  });

  slideout.on('beforeclose', function () {
    $('.alert').removeClass('fixed-open');
    header.classList.remove('fixed-open');
    footer.classList.remove('fixed-open');
  });


  // Init all product sliders
  $.each($('.products-slider__products'), function(e) { 
    var $parent = $(this).closest('.products-slider');
    var _item = $(this).data('item'),
        _pager = $(this).data('pager');
    
    if (_item==undefined) _item=4;
    if (_pager==undefined) _pager=false;

    var $slider = $(this).lightSlider({
      item: _item,
      loop: false,
      slideMove: 1,
      slideMargin: 0,
      easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
      speed: 600,
      pager: _pager,
      controls: false,
      enableDrag: false,

      
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

    $parent.find(".products-slider__arrow--left").click(function(e){
      $slider.goToPrevSlide(); 
    });
    $parent.find(".products-slider__arrow--right").click(function(e){
      $slider.goToNextSlide(); 
    });
  });

  var $product_image = $('.gallery__inner img');
  $('.gallery__item').click(function(e){
      console.log('thumb clicked');
      var target_src = $(this).data('src');
      
      $('.gallery__item').removeClass('gallery__item--active');
      $(this).addClass('gallery__item--active');
      
      $product_image.fadeOut('fast', function () {
          $product_image.attr('src', target_src);
          $product_image.fadeIn('fast');
      });
      return false;
  });

  
  $('.sort span').click(function(e){
    $(this).closest('.sort').toggleClass('sort--active');
  });
  $('.menu__opener').click(function(e){
    $(this).closest('.menu__item').toggleClass('menu__item--opened');

  });

  $(document).on('click','.spinner__button', function(e){
    console.log('.spinner__button');

    var $spinner = $(this).closest('.spinner');
    var $target = $spinner.find('.spinner__input');
    var $placeholder = $spinner.find('.spinner__placeholder');
    
    console.log($target);
    
    var change = 1,min = 1, max=200, uom = 'шт.';
    if ($target.data('change') != undefined) change = parseInt($target.data('change'));
    if ($target.data('min') != undefined) min = parseInt($target.data('min'));
    if ($target.data('max') != undefined) max = parseInt($target.data('max'));
    if ($target.data('uom') != undefined) uom = $target.data('uom');
    
    var val;
    
    if ($(this).hasClass('spinner__button--up')) {
      val=parseInt($target.val()) + change;
    } else {
      val=parseInt($target.val()) - change;
    }
    
    if (val<min) val=min;
    if (val>max) val=max;

    $target.val(val).change();
    //$target.trigger('change');
    $placeholder.html(val+' '+uom);
    console.log(val+' '+uom);
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
  
  if ($('#map').length) {
    ymaps.ready(function(){
      console.log('ymaps ready');
      

      map = new ymaps.Map("map", {
          center: [59.853029, 30.233864],
          zoom: 13,
      });
      placemark=new ymaps.Placemark(
        [59.853029, 30.233864],
        {
          balloonContent:"Пункт выдачи заказа",
          balloonContentHeader:"Пункт выдачи заказа",
          balloonContentBody:"Пункт выдачи заказа: Санкт-Петербург, Ленинский проспект, д. 110к1"
        },
        { 
          preset:"islands#icon",
          iconColor:"#0095b6"
        });
      map.geoObjects.add(placemark);
    }); 
  }
});