(() => {
  let jquery_version = '3.4.1';
  let site_url = 'https://wee.com:8000/';
  let static_url = site_url + 'static/';
  let min_width = 100;
  let min_height = 100;

  function bookmarklet(msg) {
    // load CSS
    let css = jQuery('<link>');
    css.attr({
      rel: 'stylesheet',
      type: 'text/css',
      href:
        static_url +
        'css/bookmarklet.css?r=' +
        Math.floor(Math.random() * 999999999999999999),
    });
    jQuery('head').append(css);

    // load HTML
    box_html =
      '<div id="bookmarklet"><a href="#" id="close">&times;</a><h1>Select an image to bookmark:</h1><div class="images"></div></div>';

    jQuery('body').append(box_html);

    // close event
    jQuery('#bookmarklet #close').click(() => {
      jQuery('#bookmarklet').remove();
    });

    jQuery.each(jQuery('img[src$="jpg"]'), (index, image) => {
      if (
        jQuery(image).width() >= min_width &&
        jQuery(image).height() >= min_height
      ) {
        image_url = jQuery(image).attr('src');
        jQuery('#bookmarklet .images').append(
          '<a href="#"><img src"' + image_url + '" /></a>'
        );
      }
    });

    // when an image is selected open URL with it
    jQuery('#bookmarklet .images a').click((e) => {
      selected_image = jQuery(this).children('img').attr('src');

      // hide bookmarklet
      jQuery('#bookmarklet').hide();

      // open new window to submit the image
      window.open(
        site_url +
          'images/create/?url=' +
          encodeURIComponent(selected_image) +
          '&title=' +
          encodeURIComponent(jQuery('title').text()),
        '_blank'
      );
    });
  }

  if (typeof window.jQuery != 'undefined') {
    bookmarklet();
  } else {
    // Check for conflicts
    let conflict = typeof window.$ != 'undefined';

    // Create the scripts and point to Google API
    let script = document.createElement('script');
    script.src =
      '//ajax.googleapis.com/ajax/libs/jquery/' +
      jquery_version +
      '/jquery.min.js';

    // Add the script to the 'head' for processing
    document.head.appendChild(script);

    // Wait until script loading
    let attempts = 15;
    (function () {
      if (typeof window.jQuery == 'undefined') {
        if (--attempts > 0) {
          window.setTimeout(arguments.callee, 250);
        } else {
          alert('An error occurred while loading jQuery');
        }
      } else {
        bookmarklet();
      }
    })();
  }
})();
