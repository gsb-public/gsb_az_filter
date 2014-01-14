<?php

/**
 * @file
 * Views integration for the GSB AZ Filter module.
 */

/**
 * Implements hook_views_plugins().
 */
function gsb_az_filter_views_plugins() {
  $plugins = array();
  $plugins['display_extender']['gsb_az_filter'] = array(
    'title' => t('GSB AZ Filter'),
    'help' => t('Provides an A-Z Filter.'),
    'handler' => 'gsb_az_filter_plugin_display_extender_az_filter',
  );

  return $plugins;
}
