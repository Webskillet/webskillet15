<?php
// $Id: node.tpl.php,v 1.4.2.4 2011/02/18 05:26:30 andregriffin Exp $
?>
<?php if (!$page): ?>
  <article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
<?php endif; ?>

  <?php /* if ($user_picture || $display_submitted || !$page): */ ?>
    <?php if (!$page): ?>
      <header>
	<?php endif; ?>

      <?php print $user_picture; ?>
  
      <?php print render($title_prefix); ?>
      <?php if (!$page): ?>
        <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
  
      <?php if ($display_submitted): ?>
        <p class="submitted"><?php print $submitted; ?></p>
      <?php endif; ?>

    <?php if (!$page): ?>
      </header>
	<?php endif; ?>
  <?php /* endif; */ ?>

  <div class="content"<?php print $content_attributes; ?>>
    <?php
      // Hide comments, tags, and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
      hide($content['field_tags']);
      print render($content);
    ?>
  </div>

<?php if ($page && 0): ?>
	  <div class="share-links">
		<h3><?php print(t('Share this').':'); ?></h3>
        <ul class="btn-share btn-social">
          <li class="btn-facebook first"><a href="<?php print webskillet15_share_url($node_url,$title); ?>"><?php print webskillet15_share_text('facebook'); ?></a></li>
          <li class="btn-twitter"><a href="<?php print webskillet15_share_url($node_url,$twitterTweet,'twitter',array('twitterHashtag' => $twitterHashtag, 'twitterHandle' => $twitterHandle)); ?>"><?php print webskillet15_share_text('twitter'); ?></a></li>
          <li class="btn-email last"><a href="<?php print webskillet15_share_url($node_url,$title,'email',array('emailSubject' => t('I think you\'ll enjoy this: ').$title, 'emailBody' => t('I found it here:'))); ?>"><?php print webskillet15_share_text('email'); ?></a></li>
        </ul>
	  </div>
<?php endif; ?>

  <?php if (!empty($content['links'])): ?>
    <footer>
      <?php print render($content['field_tags']); ?>
      <?php print render($content['links']); ?>
    </footer>
  <?php endif; ?>

  <?php print render($content['comments']); ?>

<?php if (!$page): ?>
  </article>
<?php endif; ?> <!-- /.node -->
