(function ($) {

"use strict";

/**
 * Transform a set of A-Z links to update via AJAX.
 */
Drupal.behaviors.gsbAzFilterLinks = {
  attach: function () {
    // Find all of the links.
    $('a.gsb-az-filter').click(function (e) {
      var $this = $(this);
      var $input = $("[name='" + $this.data('gsb-az-filter-form-item-name') + "']");

      // Set the input element to this link's letter.
      $input.val($this.data('gsb-az-filter-letter'));
      // Remove other active classes.
      $('a.gsb-az-filter.active').removeClass('active');
      // Mark this link as active.
      $this.addClass('active');

      // Trigger the form submission.
      var $submit_button = $this.closest('form').find('.ctools-auto-submit-click');
      if ($submit_button.length) {
        // Prevent the browser from following the link.
        $submit_button.click();
        e.preventDefault();
      }
    });
  }
};

/**
 * Transform a set of A-Z links to update via AJAX.
 */
Drupal.behaviors.gsbAzFilterSlider = {
  attach: function () {
    $('.views-widget-filter-gsb-az-filter').each(function () {
      new Drupal.GsbAzFilterSlider(this);
    });
  }
};

Drupal.GsbAzFilterSlider = function (element) {
  var $wrapper = $(element);
  var self = {
    $slider: $wrapper.find('ul'),
    $prev: $wrapper.find('.prev'),
    $next: $wrapper.find('.next'),
    // Track the number of clicks.
    click: 0
  };

  // The single width of a slider item.
  var single_width = self.$slider.find('li').eq(0).width();
  // How many items will slide by per click
  var items_per_click = Math.floor(self.$slider.width() / single_width);

  // The maximum number of times this can be clicked.
  self.max_click = Math.floor(self.$slider.children().length / items_per_click);
  // The visible width of the items.
  self.visible_width = items_per_click * single_width;

  // Get the last name char value... if any has been set
  var last_name = $("[name='last_name']").attr('value');
  var char_number = last_name.charCodeAt(0) - 64;
  if (char_number != NaN) {
    // Scroll the slider to the last name char
    var offset = (char_number * single_width) * -1;
    slideSlider(self, offset);
  }

  self.$prev.click(function () {
    buttonClick(this, -1);
  });
  self.$next.click(function () {
    buttonClick(this, 1);
  });

  /**
   * Reacts to a button click to move the slider.
   *
   * @param {Object} el
   *   The button element that was clicked.
   * @param {number} directional_multiplier
   *   The direction the slider should move, either -1 or 1.
   */
  function buttonClick(el, directional_multiplier) {
    // If the button is disabled, prevent clicking.
    if ($(el).hasClass('disabled') || self.$slider.is(':animated')) {
      return;
    }
    // Determine how far to adjust the slider.
    // current offset - (width of visible items * direction)
    var offset = parseInt(self.$slider.css('marginLeft'), 10) - (self.visible_width * directional_multiplier);
    if (offset > 0) {
      offset = 0;
    }
    slideSlider(self, offset);
  }

  function slideSlider(self, offset) {
    self.$slider.animate({'margin-left': offset}, 500, 'swing', function() {
      // Remove disabled class from both ends when in the middle.
      self.$prev.removeClass('disabled');
      self.$next.removeClass('disabled');
      var margin_left = self.$slider.css('marginLeft');
      margin_left = margin_left.replace('px','');
      if (margin_left == '0') {
        self.$prev.addClass('disabled');
      }
      var single_width = self.$slider.find('li').eq(0).width();
      var num_children = self.$slider.children().length;
      var full_width = num_children * single_width;
      var margin_and_width = Math.abs(margin_left) + self.visible_width;
      if (margin_and_width > full_width) {
        self.$next.addClass('disabled');
      }
    });
  }

  $.extend(this, self);
};

})(jQuery);
