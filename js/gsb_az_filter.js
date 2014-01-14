(function ($) {

"use strict";

/**
 * Transform a set of A-Z links to update via AJAX.
 */
Drupal.behaviors.gsbAzFilterLinks = {
  attach: function (context, settings) {
    // Find the input element that needs to be updated.
    var $input = $("[name='" + settings.gsb_az_filter.form_item_name + "']");
    if ($input.length) {
      // Find all of the links.
      var $links = $('a.gsb-az-filter');
      // When a link is clicked...
      $links.click(function (e) {
        var $this = $(this);

        // Set the input element to this link's letter.
        $input.val($this.data('gsb-az-filter-letter'));
        // Remove other active classes.
        $links.removeClass('active');
        // Mark this link as active.
        $this.addClass('active');

        // Trigger the form submission.
        $this.closest('form').find('.ctools-auto-submit-click').click();

        // Prevent the browser from following the link.
        e.preventDefault();
      });
    }
  }
};

/**
 * Transform a set of A-Z links to update via AJAX.
 */
Drupal.behaviors.gsbAzFilterSlider = {
  attach: function () {
    var $wrapper = $('#edit-gsb-az-filter-last-name-wrapper');
    var $slider = $wrapper.find('ul');
    var $prev = $wrapper.find('.prev');
    var $next = $wrapper.find('.next');

    // The single width of a slider item.
    var single_width = $slider.find('li').eq(0).width();
    // How many items will slide by per click
    var items_per_click = Math.floor($slider.width() / single_width);
    // The maximum number of times this can be clicked.
    var max_click = Math.floor($slider.children().length / items_per_click);

    // Track the number of clicks.
    var click = 0;

    $prev.click(function () {
      buttonClick(this, -1);
    });

    $next.click(function () {
      buttonClick(this, 1);
    });

    function buttonClick(el, directional_multiplier) {
      // If the button is disabled, prevent clicking.
      if (!$(el).hasClass('enabled') || $slider.is(':animated')) {
        return;
      }

      // Determine how far to adjust the slider.
      // current offset - (width of visible items * direction)
      var offset = parseInt($slider.css('marginLeft'), 10) - (items_per_click * single_width * directional_multiplier);
      $slider.animate({'margin-left': offset}, 500, 'swing');

      click += directional_multiplier;

      if (click == 0) {
        $prev.removeClass('enabled');
      }
      else if (click == max_click) {
        $next.removeClass('enabled');
      }
      else {
        $prev.addClass('enabled');
        $next.addClass('enabled');
      }
    }
  }
};

})(jQuery);
