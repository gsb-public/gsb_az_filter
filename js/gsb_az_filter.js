(function ($, window) {

"use strict";

/**
 * Transform a set of A-Z links to update via AJAX.
 */
Drupal.behaviors.gsbAzFilter = {
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

})(jQuery, window);
