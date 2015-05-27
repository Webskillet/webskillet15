<?php

/**
 * @file
 * webskillet15 theme-settings.php
 */
function webskillet15_form_system_theme_settings_alter(&$form, $form_state) {

  $form['webskillet15_navigation'] = array(
	'#type' => 'fieldset',
	'#title' => 'Navigation',
	'#collapsible' => TRUE,
  );
  $form['webskillet15_navigation']['webskillet15_navigation_title'] = array
  (
	'#type' => 'textfield',
	'#title' => t('Navigation Title'),
	'#description' => t('Title to display for navigation (generally only shown on mobile)'),
	'#default_value' => theme_get_setting('webskillet15_navigation_title'),
  );
  $form['webskillet15_navigation']['webskillet15_navigation_icon'] = array
  (
	'#type' => 'textfield',
	'#title' => t('Navigation Icon'),
	'#description' => t('Fontawesome icon class to add to navigation title (generally only shown on mobile)'),
	'#default_value' => theme_get_setting('webskillet15_navigation_icon'),
  );
  $form['webskillet15_navigation']['webskillet15_navigation_style'] = array
  (
	'#type' => 'select',
	'#title' => t('Mobile Navigation Style'),
	'#options' => array(
		'default' => 'Default',
		'standard' => 'Standard',
		'slide' => 'Slide',
	),
	'#description' => t('<strong>Default:</strong> entire menu appears, with child items indented<br /><strong>Standard:</strong> child items (or mega-menus) appear upon clicking of parent item<br /><strong>Slide:</strong> menu slides in from the right, as do submenus'),
	'#default_value' => theme_get_setting('webskillet15_navigation_style'),
  );


  $form['webskillet15_google_webfonts'] = array
  (
	'#type' => 'textfield',
	'#title' => t('Google webfonts'),
	'#description' => t('Will be appended to //fonts.googleapis.com/css?family='),
	'#default_value' => theme_get_setting('webskillet15_google_webfonts'),
  );
  $form['webskillet15_load_fontawesome'] = array
  (
	'#type' => 'radios',
	'#title' => t('Load fontawesome?'),
	'#default_value' => theme_get_setting('webskillet15_load_fontawesome'),
	'#options' => array(
		1 => 'Yes',
		0 => 'No',
	),
  );
  $form['webskillet15_om_maximenu'] = array
  (
	'#type' => 'radios',
	'#title' => t('Use OM Maximenu\'s $main_menu_tree instead of $main_menu in page.tpl.php?'),
	'#default_value' => theme_get_setting('webskillet15_om_maximenu'),
	'#options' => array(
		1 => 'Yes',
		0 => 'No',
	),
  );
  $form['webskillet15_logo_rollstate'] = array
  (
	'#type' => 'radios',
	'#title' => t('Does logo have roll state?'),
	'#default_value' => theme_get_setting('webskillet15_logo_rollstate'),
	'#options' => array(
		1 => 'Yes',
		0 => 'No',
	),
	'#description' => '<em>*Logo roll state must be loaded as logo-on.png into theme\'s root directory</em>',
  );


  $form['webskillet15_custom_css'] = array
  (
    '#type' => 'textarea',
    '#title' => t('Custom CSS'),
    '#description' => t('CSS to be added inside &lt;style&gt; tags in &lt;head&gt; element, after all other styles'),
    '#default_value' => theme_get_setting('webskillet15_custom_css'),
    '#cols' => 60,
    '#rows' => 7,
  );


  $form['webskillet15_js'] = array
  (
	'#type' => 'fieldset',
	'#title' => 'Javascript',
	'#collapsible' => true,
	'#collapsed' => !(theme_get_setting('webskillet15_nowsinit') || theme_get_setting('webskillet15_bootstrapjs') || theme_get_setting('webskillet15_hammerjs') || theme_get_setting('webskillet15_galleria') || theme_get_setting('webskillet15_galleria_selectors') || theme_get_setting('webskillet15_custom_js')),
  );
  $form['webskillet15_js']['webskillet15_nowsinit'] = array
  (
	'#type' => 'radios',
	'#title' => t('Override wsUtil.init?'),
	'#default_value' => theme_get_setting('webskillet15_nowsinit'),
	'#options' => array(
		1 => 'Yes',
		0 => 'No',
	),
	'#description' => t('<p>By default, theme runs wsUtil.init on document.ready, which invokes the following methods:</p><ul><li>populateInputs() - any input with class of "populate," will add a placeholder attribute with value of label (HTML5) and javascript for backwards compatibility for browsers that don\'t support the HTML5 placeholder attribute.</li><li>prepareRollStates() - for any image with class of "roll-image," will replace filename.png with filename-on.png on rollover (only works with .png images)</li><li>prepareNavigation() - default javascript behavior for navigation menu</li><li>prepareMessages() - adds an \'x\' to messages which, when clicked, will make them disappear</li><li>preparePopUps - called on \'.btn-share .btn-facebook a\', \'.btn-share .btn-twitter a\' and \'.print_html a\'</li><li>invokes jQuery.validate on all forms on the page</li></ul><p>Set to <strong>YES</strong> to disable this.'),
  );
  $form['webskillet15_js']['webskillet15_bootstrapjs'] = array
  (
	'#type' => 'radios',
	'#title' => t('Load bootstrap.js and full bootstrap.css?'),
	'#default_value' => theme_get_setting('webskillet15_bootstrapjs'),
	'#options' => array(
		1 => 'Yes',
		0 => 'No',
	),
  );
  $form['webskillet15_js']['webskillet15_hammerjs'] = array
  (
	'#type' => 'radios',
	'#title' => t('Load hammer.js?'),
	'#default_value' => theme_get_setting('webskillet15_hammerjs'),
	'#options' => array(
		1 => 'Yes',
		0 => 'No',
	),
  );
  $form['webskillet15_js']['webskillet15_galleria'] = array
  (
	'#type' => 'radios',
	'#title' => t('Load Galleria.js?'),
	'#options' => array(
		1 => 'Yes',
		0 => 'No',
    ),
	'#default_value' => theme_get_setting('webskillet15_galleria'),
	'#description' => t('By default, this will replace any link to a flickr or facebook photo set with a responsive slideshow of the photos in that set.'),
  );
  $form['webskillet15_js']['webskillet15_galleria_selectors'] = array
  (
	'#type' => 'textfield',
	'#title' => t('Galleria'),
	'#description' => t('Add one or more comma-separated jQuery selectors to limit the application of galleria.js, above.'),
	'#default_value' => theme_get_setting('webskillet15_galleria_selectors'),
  );
  $form['webskillet15_js']['webskillet15_custom_js'] = array
  (
    '#type' => 'textarea',
    '#title' => t('Custom Javascript'),
    '#description' => t('Javascript to be added inside &lt;script&gt; tags in &lt;head&gt; element, after all other scripts'),
    '#default_value' => theme_get_setting('webskillet15_custom_js'),
    '#cols' => 60,
    '#rows' => 7,
  );


  $form['webskillet15_twitter'] = array
  (
	'#type' => 'fieldset',
	'#title' => 'Twitter',
	'#collapsible' => true,
	'#collapsed' => !(theme_get_setting('webskillet15_twitter_handle') || theme_get_setting('webskillet15_twitter_hashtag') || theme_get_setting('webskillet15_twitter_field')),
  );
  $form['webskillet15_twitter']['webskillet15_twitter_handle'] = array
  (
    '#type' => 'textfield',
    '#title' => t('Twitter handle for sharing links'),
    '#description' => t('If you enter a Twitter handle here, it will be appended to "share this on Twitter" tweets'),
	'#default_value' => theme_get_setting('webskillet15_twitter_handle'),
  );
  $form['webskillet15_twitter']['webskillet15_twitter_hashtag'] = array
  (
    '#type' => 'textfield',
    '#title' => t('Twitter hashtag for sharing links'),
    '#description' => t('If you enter a Twitter hashtag here, it will be appended to "share this on Twitter" tweets'),
	'#default_value' => theme_get_setting('webskillet15_twitter_hashtag'),
  );
  $form['webskillet15_twitter']['webskillet15_twitter_field'] = array
  (
    '#type' => 'textfield',
    '#title' => t('Field to use for tweet'),
    '#description' => t('By default, the title of the node will be used for the tweet. Enter the machine name of a custom field to allow that field to override the title (title will still be used if this field is blank, or if the node type doesn\'t have the field).  This <strong>will</strong> hide the field in the node display, unless you override that behavior in node.tpl.php.'),
	'#default_value' => theme_get_setting('webskillet15_twitter_field'),
  );


  $form['webskillet15_blocks'] = array
  (
	'#type' => 'fieldset',
	'#title' => 'Advanced block settings',
	'#collapsible' => true,
	'#collapsed' => !(theme_get_setting('webskillet15_block_classes') || theme_get_setting('webskillet15_block_icons')),
  );
  $form['webskillet15_blocks']['webskillet15_block_classes'] = array
  (
    '#type' => 'textarea',
    '#title' => t('Block classes by region'),
    '#description' => t('<p>To add a class (such as a Bootstrap grid column class) to all blocks in a given region, use this format: region|class. One region per line, separate multiple classes with spaces.</p><p>Available regions: header, navigation, highlighted, content, sidebar_first, sidebar_second, prefooter1, prefooter2, utility, footer</p><p>By default, blocks in the Highlighted, Prefooter 1 and 2 and Footer region will be given the col-xs-12 class, to assure proper padding inside the row element.</p>'),
    '#default_value' => theme_get_setting('webskillet15_block_classes'),
    '#cols' => 60,
    '#rows' => 7,
  );
  $form['webskillet15_blocks']['webskillet15_block_icons'] = array
  (
    '#type' => 'textarea',
    '#title' => t('Block Title Icons'),
    '#description' => t('To add an icon to the title of a block, use this format: block_id|icon. One block per line.  icon can be either a class declaration, in which case an &lt;i&gt; element with the class will be prepended to the title, or any arbitrary html (such as an &lt;img&gt; tag).'),
    '#default_value' => theme_get_setting('webskillet15_block_icons'),
    '#cols' => 60,
    '#rows' => 7,
  );

  return $form;
}
