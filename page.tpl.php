<?php if (!$ajax): ?>
<div id="wrapper">

  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
    <?php if ($main_menu): ?>
      <a href="#navigation" class="element-invisible element-focusable"><?php print t('Skip to navigation'); ?></a>
    <?php endif; ?>
  </div>

<div id="header-wrapper">
  <header id="header" role="banner" class="clearfix container">
	<?php if ($logo): ?>
      <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" id="logo">
        <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" class="<?php print $logo_classes; ?>" />
      </a>
    <?php endif; ?>
    <?php if ($site_name || $site_slogan): ?>
      <div id="site-name-slogan">
        <?php if ($site_name): ?>
          <?php if ($title): ?>
            <div id="site-name">
              <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
            </div>
          <?php else: /* Use h1 when the content title is empty */ ?>
            <h1 id="site-name">
              <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
            </h1>
          <?php endif; ?>
        <?php endif; ?>
        <?php if ($site_slogan): ?>
          <div id="site-slogan"><?php print $site_slogan; ?></div>
        <?php endif; ?>
      </div>
    <?php endif; ?>
    <?php print render($page['header']); ?>
  </header> <!-- /#header -->
</div>

  <?php if ($main_menu || $page['navigation']): ?>
    <div id="navigation-wrapper">
      <nav id="navigation" role="navigation" class="clearfix container <?php print $navigation_class; ?>">
        <?php if ($main_menu) { print $main_menu; } ?>
	    <?php if ($page['navigation']) { print render($page['navigation']); } ?>
      </nav> <!-- /#navigation -->
    </div> <!-- /#navigation-wrapper -->
  <?php endif; ?>


<?php if ($page['highlighted']): ?>
  <div id="highlighted-wrapper">
    <section id="highlighted" role="contentinfo" class="container">
      <?php print render($page['highlighted']) ?>
    </section> <!-- /#footer -->
  </div>
<?php endif; ?>

  <div id="main-wrapper"><div id="main" class="clearfix container"><div class="row">

<?php endif; /* !$ajax */ ?>
  <section id="page" role="main" class="clearfix <?php echo $main_classes; ?>">
    <?php print $messages; ?>
    <a id="main-content"></a>
    <?php print render($title_prefix); ?>
    <?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
    <?php print render($title_suffix); ?>
    <?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
    <?php print render($page['help']); ?>
    <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
    <?php print render($page['content']); ?>
  </section> <!-- /#main -->
<?php if (!$ajax): ?>
  
  <?php if ($page['sidebar_first']): ?>
    <aside id="sidebar-first" role="complimentary" class="sidebar clearfix <?php echo $sidebar_first_classes; ?>">
      <?php print render($page['sidebar_first']); ?>
    </aside>  <!-- /#sidebar-first -->
  <?php endif; ?>
  
  <?php if ($page['sidebar_second']): ?>
    <aside id="sidebar-second" role="complimentary" class="sidebar clearfix <?php echo $sidebar_second_classes; ?>">
      <?php print render($page['sidebar_second']); ?>
    </aside>  <!-- /#sidebar-second -->
  <?php endif; ?>

  </div></div></div> <!-- /.row, #main, #wrapper-main -->

<?php if ($page['prefooter1']): ?>
  <div id="prefooter1-wrapper">
    <section id="prefooter1" role="contentinfo" class="container">
      <?php print render($page['prefooter1']) ?>
    </section> <!-- /#footer -->
  </div>
<?php endif; ?>

<?php if ($page['prefooter2']): ?>
  <div id="prefooter2-wrapper">
    <section id="prefooter2" role="contentinfo" class="container">
      <?php print render($page['prefooter2']) ?>
    </section> <!-- /#footer -->
  </div>
<?php endif; ?>

  <?php if ($page['utility'] || $secondary_menu): ?>
    <aside id="utility" role="complimentary">
      <?php if ($secondary_menu): ?>
        <nav id="utility-nav" role="navigation" class="container">
		  <?php echo $secondary_menu; ?>
        </nav> <!-- /#utility-nav -->
      <?php endif; ?>
	  <?php if ($page['utility']) : ?>
		<div class="container">
	      <?php print render($page['utility']); ?>
		</div>
	  <?php endif; ?>
    </aside> <!-- /#utility -->
  <?php endif; ?>

<div id="footer-wrapper">
  <footer id="footer" role="contentinfo" class="container">
    <?php print render($page['footer']) ?>
	<div id="site-credit"><a href="http://www.webskillet.com">website by Webskillet</a></div>
  </footer> <!-- /#footer -->
</div>

</div> <!-- /#wrapper -->
<?php endif; /* !$ajax */ ?>
