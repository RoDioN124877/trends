jQuery(function($) {
  function fixDiv() {
    var $cache = $('#s');
    if (window.innerWidth < 600) { 
      if ($(window).scrollTop() > 190)
        $cache.css({
          'position': 'fixed',
          'top': '0px'
        });
      else
        $cache.css({
          'position': 'relative',
          'top': '0px'
        });
    } else {
      $cache.css({
        'position': 'relative',
        'top': '0px'
      });
    }
  }
  $(window).scroll(fixDiv);
  fixDiv();
});
