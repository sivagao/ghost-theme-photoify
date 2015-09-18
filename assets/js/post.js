!(function(){
  'use strict';

  var gallery = $('#gallery');

  // javascript cannot access before/after pseudo-classes
  $('<div class="body-before"></div>')
    .prependTo('body')
    .css('background-image','url('+ PostCover+')');

  // .each(function)
  var loadedIndex = 1;
  var $imgs = $('.images-wrap img');
  if($imgs.length < 6) {
    $('body').addClass('gallery-less-5');
  } else if ($imgs.length < 12) {
    $('body').addClass('gallery-less-12');
  } else if ($imgs.length < 25) {
    $('body').addClass('gallery-less-25');
  }

  $.each($imgs, function(index, img){
    var link = document.createElement('a'),
    li = document.createElement('li')
    link.href = img.src;
    link.appendChild(img);
    li.appendChild(link);
    gallery[0].appendChild(li);

    $(li).addClass('loaded');
  });

  // finally, initialize photobox on all retrieved images
  // thumbs:true,
  $('#gallery').photobox('a', { loop:false }, callback);
  // using setTimeout to make sure all images were in the DOM,
  // before the history.load() function is looking them up to match the url hash
  setTimeout(window._photobox.history.load, 2000);
  function callback(){
    console.log('callback for loaded content:', this);
  };
})();