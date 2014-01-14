<?php

/**
 * @file
 * Contains gsb_az_filter_plugin_display_extender_az_filter.
 */

/**
 * Provides a custom display extender plugin for Views.
 */
class gsb_az_filter_plugin_display_extender_az_filter extends views_plugin_display_extender {

  /**
   * {@inheritdoc}
   */
  function options_definition_alter(&$options) {
    $options['gsb_az_filter'] = array('default' => array());
  }

  /**
   * {@inheritdoc}
   */
  function options_summary(&$categories, &$options) {
    $filter = $this->display->get_option('gsb_az_filter');

    if (!empty($filter) && $filters = array_intersect_key($this->getExposedFilterLabels(), $filter)) {
      $value = implode(', ', $filters);
    }
    else {
      $value = t('None');
    }
    $options['gsb_az_filter'] = array(
      'category' => 'exposed',
      'title' => t('A-Z filter'),
      'value' => $value,
    );
  }

  /**
   * Returns an array of labels for string-based exposed filters
   *
   * @return array
   *   An array of exposed filters, with their URL identifier as keys and their
   *   human-readable label as values.
   */
  protected function getExposedFilterLabels() {
    $this->view->init_handlers();
    $filters = $this->view->display_handler->get_handlers('filter');
    $filter_options = array();
    foreach ($filters as $filter) {
      if (!$filter->options['exposed'] || !($filter instanceof views_handler_filter_string)) {
        continue;
      }

      if (!empty($filter->options['expose']['label'])) {
        $title = $filter->options['expose']['label'];
      }
      else {
        $title = $filter->definition['title short'];
      }
      $identifier = $filter->options['expose']['identifier'];
      $filter_options[$identifier] = format_string('@title (@id)', array('@title' => $title, '@id' => $identifier));
    }
    return $filter_options;
  }

  /**
   * {@inheritdoc}
   */
  function options_form(&$form, &$form_state) {
    if ($form_state['section'] == 'gsb_az_filter') {
      $form['#title'] .= t('The A-Z filter settings');
      if (!$filter_options = $this->getExposedFilterLabels()) {
        $form['gsb_az_filter']['#markup'] = t('There are no string-based exposed filters.');
        return;
      }

      $form['gsb_az_filter'] = array(
        '#type' => 'select',
        '#title' => t('Select a filter to replace with an A-Z filter'),
        '#options' => $filter_options,
        '#multiple' => TRUE,
        '#default_value' => $this->display->get_option('gsb_az_filter'),
      );
    }
  }

  /**
   * {@inheritdoc}
   */
  function options_submit(&$form, &$form_state) {
    if ($form_state['section'] == 'gsb_az_filter') {
      $filter = $form_state['values']['gsb_az_filter'];
      $this->display->set_option('gsb_az_filter', $filter);
    }
  }

}
