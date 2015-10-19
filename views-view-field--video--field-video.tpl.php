<?php
 /**
  * This template is used to print a single field in a view. It is not
  * actually used in default Views, as this is registered as a theme
  * function which has better performance. For single overrides, the
  * template is perfectly okay.
  *
  * Variables available:
  * - $view: The view object
  * - $field: The field handler object that can process the input
  * - $row: The raw SQL result that can be used
  * - $output: The processed output that will normally be used.
  *
  * When fetching output from the $row, this construct should be used:
  * $data = $row->{$field->field_alias}
  *
  * The above will guarantee that you'll always get the correct data,
  * regardless of any changes in the aliasing that might happen if
  * the view is modified.
  */
/*
$img = '<img src="'.wsUtil_get_video_thumb($output).'" /><div class="wsAnchorOverlay"></div>';
$options = array('html' => true);
$videoLink = wsUtil_get_video_link($output);
if ($videoLink) {
	$link = $videoLink;
	$options['attributes'] = array('class' => array('video-link'),'title' => 'Watch video');
} else {
	$link = 'node/'.$row->nid;
}

echo '<div class="video-link-wrapper">'.print l($img,$link,$options).'</div>';

*/
?>
<?php echo webskillet15_wrap_video($output); ?>
