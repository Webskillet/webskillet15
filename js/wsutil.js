/**
 * webskillet Javascript utilities
 * Jonathan Kissam (plus others as credited)
 * April 2012
 *
 * Table of contents:
 * 1. jQuery extensions
 *  1.1 jQuery.support.placeholder
 *  1.2 jQuery.smartresize
 *  1.3 :external selector
 *  1.4 :youtube selector
 *  1.5 :pdf, :doc, :xls and :ppt selectors
 * 2. wsUtil object definition
 *  2.1  init
 *  2.2  prepareMessages
 *  2.3  setCookie
 *  2.4  getCookie
 *  2.5  populateInputs
 *  2.6  prepareRollStates
 *  2.7  preparePopUps
 *  2.8  prepareExternalLinks
 *  2.9  prepareNavigation
 *  2.10 preloadImages
 *  2.11 initFB
 *  2.12 checkFB
 *  2.13 wrapFBaction
 *  2.14 loadTwitterScript
 *  2.15 fixOnScroll
 *  2.16 prepareFinishedReadingBlock
 *  2.17 fixFooter
 *  2.18 fixLongUrls
 *  2.19 equalizeHeight
 *  2.20 prepareSectionNavigation
 *  2.21 scrollToInclude
 *  2.22 verticalCenter
 * 3. jQuery triggers
 *  3.1 jQuery(document).ready
 *  3.2 jQuery(document).ajaxComplete
 */

/**
 * 1. jQuery extensions
 */

jQuery.support.placeholder = (function(){
    var i = document.createElement('input');
    return 'placeholder' in i;
})();

(function(jQuery,sr){
 
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;
 
      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null; 
          };
 
          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);
 
          timeout = setTimeout(delayed, threshold || 100); 
      };
  }
	// smartresize 
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
 
})(jQuery,'smartresize');

// Creating custom :external selector
jQuery.expr[':'].external = function(obj){
    if ((obj.href == '#') || (obj.href == '') || (obj.href == null)) { return false; }
    if(obj.href.match(/^mailto\:/)) { return false; }
    if(obj.href.match(/^javascript\:/)) { return false; }
    if ( (obj.hostname == location.hostname)
	|| ('www.'+obj.hostname == location.hostname)
	|| (obj.hostname == 'www.'+location.hostname)
	) { return false; }
    return true;
};

// Creating custom :youtube selector
jQuery.expr[':'].youtube = function(obj){ return obj.hostname.match(/(www\.)?youtu(be\.com|\.be)/i); }

// Custom selectors for document links
jQuery.expr[':'].pdf = function(obj) { return obj.hostname.match(/.pdf$/i); }
jQuery.expr[':'].doc = function(obj) { return obj.hostname.match(/.docx?$/i); }
jQuery.expr[':'].xls = function(obj) { return obj.hostname.match(/.xlsx?$/i); }
jQuery.expr[':'].ppt = function(obj) { return obj.hostname.match(/.pptx?$/i); }

/**
 * 2. wsUtil object definition
 */

wsUtil = {

	// variables
	YTvideoIds : new Array(),
	ytPlayerReady : false,
	ytCurrentId : '',
	FBappid : 0,
	FBstatus : 0, // 0 = not logged into FB, 1 = logged in but not authorized, 2 = logged in, authorized
	FBuserid : null,
	FBaccessToken : null,
	frb : null,
	frbWidth : 0,
	frbTolerance : 0,
	frbOffset : 0,
	currentPopId : '',

	// functions
	init : function() {
		var self = wsUtil;
		self.populateInputs();
		self.prepareRollStates();
		self.prepareNavigation();
		self.prepareMessages();
		self.preparePopUps('.btn-share .btn-facebook a',640,480);
		self.preparePopUps('.btn-share .btn-twitter a',550,450); // remove this if anything on the page invoke's twitter's own javascript
		self.preparePopUps('.print_html a',800,600);

		// validate any forms
		if (jQuery('form').validate) {
			jQuery('form').each(function(){
				jQuery(this).validate();
			});
		}
	},

	prepareMessages : function() {
		jQuery('.messages').each(function(){
			if (jQuery(this).children('.close').length < 1) {
				jQuery(this).prepend('<div class="close" title="(dismiss message)">&times;</div>');
				jQuery(this).children('.close').click(function(event){jQuery(this).parent().slideUp();});
			}
		});
	},

	setCookie : function(c_name,value,exdays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	},

	getCookie : function (c_name) {
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++) {
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name) {
				return unescape(y);
			}
		}
	},

	// populate inputs with the value of their labels
	populateInputs : function() {
		jQuery('input.populate').each(function() {
			var populate_text = jQuery('label[for="' + jQuery(this).attr('id') + '"]').text();
			if (populate_text) {
				if (jQuery.support.placeholder) {
					jQuery(this).attr('placeholder',populate_text);
				} else {
					jQuery(this).val(populate_text).data('populate_text', populate_text);
					jQuery(this).addClass('populated');				
					jQuery(this).focus(function() {
						if (jQuery(this).val() == jQuery(this).data('populate_text')) {
							jQuery(this).val('');
							jQuery(this).removeClass('populated');
						}
					});
					jQuery(this).blur(function() {
						if (jQuery(this).val() == '') {
							jQuery(this).val(jQuery(this).data('populate_text'));
							jQuery(this).addClass('populated');
						}
					});
				}
			}
		});
	},

	// set up roll states for submit buttons and images
	prepareRollStates : function() {
		var i = new Image();
		jQuery('.roll-image').each(function() {
			i.src = jQuery(this).attr('src').replace(/\.png/, '-on.png');
		});
		jQuery('.roll-image').hover(function() {
			jQuery(this).attr('src', jQuery(this).attr('src').replace(/\.png/, '-on.png'));
		}, function() {
			jQuery(this).attr('src', jQuery(this).attr('src').replace(/-on\.png/, '.png'));
		});
	},

	// open pop-up windows on particular links, by selector
	preparePopUps : function(sel,w,h) {
		jQuery(sel).click(function(event){
			var left = (screen.width - w)/2;
			var top = (screen.height - h)/2;
			top = (top < 50) ? 50 : top;
			var attr = 'height='+h+',width='+w+',left='+left+',top='+top+',location=0,menubar=0,status=0';
			window.open(jQuery(this).attr('href'),'popup',attr);
			event.preventDefault();
		});
	},

	// prepare external links
	prepareExternalLinks : function(exceptions) {
		var sel;
		if (exceptions instanceof Array) {
			sel = exceptions.join()
		} else {
			sel = exceptions;
		}
		jQuery('a:external').addClass('external');
		jQuery(sel).removeClass('external');
		jQuery('a.external').each(function(){
			var href = jQuery(this).attr('href');
			var title = jQuery(this).attr('title') ? jQuery(this).attr('title') : '';
			title += (title.length > 0) ? ' ' : '';
			title += '(opens in a new window)';
			jQuery(this).attr('title',title);
			jQuery(this).click(function(event){
				window.open(href,'external','');
				event.preventDefault();
			});
		});
	},

	prepareNavigation : function(container) {
		jQuery('#navigation h2.navigation-header, #navigation > ul.main-menu, #navigation #om-maximenu-main-menu, #navigation #om-maximenu-main-menu .block h3, #navigation #om-maximenu-main-menu .block .content').addClass('collapsed');
		jQuery('#navigation h2.navigation-header').click(function(){
			if (jQuery(this).hasClass('collapsed')) {
				jQuery('#navigation h2.navigation-header, #navigation > ul.main-menu, #navigation #om-maximenu-main-menu').removeClass('collapsed').addClass('expanded');
			} else {
				jQuery('#navigation h2.navigation-header, #navigation > ul.main-menu, #navigation #om-maximenu-main-menu').removeClass('expanded').addClass('collapsed');
			}
		});
		jQuery('#navigation #om-maximenu-main-menu .block h3').click(function(){
			if (jQuery(this).hasClass('collapsed')) {
				jQuery(this).removeClass('collapsed').addClass('expanded');
				jQuery(this).siblings('.content').removeClass('collapsed').addClass('expanded');
			} else {
				jQuery(this).removeClass('expanded').addClass('collapsed');
				jQuery(this).siblings('.content').removeClass('expanded').addClass('collapsed');
			}
		});
	},

	preloadImages : function() {
		var img = new Image();
		for (i=0; i<arguments.length; i++) {
			img.src = Drupal.settings.basePath + 'sites/all/themes/'+Drupal.settings.ajaxPageState.theme+'5/images/'+arguments[i];
		}
	},

	validateEmail : function(form,input) {
		jQuery(form).submit(function(){
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
			if (!jQuery(input).val().match(re)) {
				alert(jQuery(input).val() + ' is not a valid email address.');
				return false;
			}
		});
	},

	initFB : function(appId) {
		wsUtil.FBappid = appId;
		window.fbAsyncInit = function() {
			FB.init({
				appId      : appId,
				status     : true, 
				cookie     : true,
				xfbml      : true,
				oauth      : true
			});
			FB.getLoginStatus(wsUtil.checkFB);
			FB.Event.subscribe('auth.statusChange', wsUtil.checkFB);
		};
		(function(d){
			var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
			js = d.createElement('script'); js.id = id; js.async = true;
			js.src = "//connect.facebook.net/en_US/all.js";
			d.getElementsByTagName('head')[0].appendChild(js);
		}(document));
	},

	checkFB : function(response) {
		if (response.status === 'connected') {
			wsUtil.FBuserid = response.authResponse.userID;
			wsUtil.FBaccessToken = response.authResponse.accessToken;
			wsUtil.FBstatus = 2;
		} else if (response.status === 'not_authorized') {
			wsUtil.FBstatus = 1;
		} else {
			wsUtil.FBstatus = 0;
		}
		// code elsewhere can bind to this event to ensure it's not run until after FB asynch init is run
		jQuery(window).trigger('checkFB.wsUtil');
	},

	wrapFBaction : function(fn, fbscope) {
		if (wsUtil.FBstatus == 2) {
			fn();
		} else {
			FB.login(function(response){
				if(response.authResponse) {
					fn();
				}
			}, {scope : fbscope});
		}
	},

	loadTwitterScript : function() {
		var js, s = 'script', d = document, id='twitter-wjs', fjs=d.getElementsByTagName(s)[0];
		if(!d.getElementById(id)){
			js=d.createElement(s);
			js.id=id;
			js.src="//platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js,fjs);
		}
	},

	fixOnScroll : function(sel, maxScroll, addBottomMarginTo) {
		wsUtil.fixOnScrollObj = jQuery(sel);
		wsUtil.fixOnScrollHeight = wsUtil.fixOnScrollObj.outerHeight(true);
		wsUtil.fixOnScrollAMT = jQuery(addBottomMarginTo);
		jQuery(window).scroll(function(){
			var pos = jQuery(window).scrollTop();
			if (pos > maxScroll) {
				wsUtil.fixOnScrollObj.addClass('fixed');
				if (wsUtil.fixOnScrollAMT) { wsUtil.fixOnScrollAMT.css('margin-bottom', wsUtil.fixOnScrollHeight+'px'); }
			} else {
				wsUtil.fixOnScrollObj.removeClass('fixed');
				if (wsUtil.fixOnScrollAMT) { wsUtil.fixOnScrollAMT.css('margin-bottom', '0px'); }
			}
		});
	},

	prepareFinishedReadingBlock : function(id, tolerance, offset) {
		wsUtil.frb = jQuery(id);
		if (wsUtil.frb.length < 1) { return; }
		if (jQuery(window).width() < 1000) { return; }
		if (window.Modernizr.touch) { return; }
		wsUtil.frb.css('position','absolute');
		wsUtil.frb.width(wsUtil.frb.width()+20);
		wsUtil.frbWidth = wsUtil.frb.outerWidth();
		wsUtil.frb.css('position','fixed');
		wsUtil.frb.prepend('<a href="#" class="popup-close">&times;</a>');
		wsUtil.frbTolerance = tolerance;
		wsUtil.frbOffset = offset;
		wsUtil.frb.remove().addClass('finished-reading-block inactive').css('right', 0 - (wsUtil.frbWidth + wsUtil.frbOffset)).appendTo('#wrapper');
		jQuery(window).scroll(function(event){
			var pos = jQuery(window).scrollTop();
			if ((jQuery('#wrapper').height()-(pos+jQuery(window).height())) < wsUtil.frbTolerance) {
				if (wsUtil.frb.hasClass('inactive')) {
					wsUtil.frb.animate({
						right : (0 - wsUtil.frbOffset)
					},400).removeClass('inactive').addClass('active');
				}
			} else {
				if (wsUtil.frb.hasClass('active')) {
					wsUtil.frb.animate({
						right : (0 - (wsUtil.frbWidth + wsUtil.frbOffset))
					},400).removeClass('active').addClass('inactive');
				}
			}
		});
		jQuery(id+' .popup-close').click(function(event){
			wsUtil.frb.animate({
				right : (0 - (wsUtil.frbWidth + wsUtil.frbOffset))
			},400).removeClass('active inactive');
			event.preventDefault();
		});
	},

	// fixes footer to bottom of the page if the content is not long enough
	// add to ready, load AND resize functions
	fixFooter : function() {
		var $footer = jQuery('#footer-wrapper');
		var heightOfPage = jQuery(window).height();
		var bottomOfFooter = $footer.offset().top + $footer.outerHeight();
		if ($footer.hasClass('fixed')) {
			if ((jQuery('#wrapper').outerHeight() + $footer.outerHeight()) > heightOfPage) { $footer.removeClass('fixed'); }
		} else {
			if (bottomOfFooter < heightOfPage) { $footer.addClass('fixed'); }
		}
	},

	// finds links which contain URLs longer than len characters as their text
	// (likely to be long, and break layout on phones)
	// and replaces their inner text with (link)
	fixLongUrls : function(len) {
		jQuery('a:contains("http"), a:contains("www")').each(function(){
			var linktext = jQuery(this).text();
			if (linktext.length >= len) {
				jQuery(this).text('(link)');
			}
		});
	},

	equalizeHeight : function(sel) {
		var h = 0;
		jQuery(sel).css('height','auto').removeClass('fixed-height');
		if (jQuery(window).width() < 768) { return; }
		jQuery(sel).each(function(){
			var thisH = jQuery(this).outerHeight();
			// console.log('#'+jQuery(this).attr('id')+' height: '+thisH);
			if (thisH > h) { h = thisH; }
		});
		jQuery(sel).css('height',h+'px').addClass('fixed-height');
	},

	prepareSectionNavigation : function(sel, offset) {
		var $ = jQuery;
		$(sel).click(function(event){
			var target = $(this).attr('href');
			var callback = $(this).attr('data-callback');
			newTop = $(target).offset().top;
			if (offset) { newTop -= offset; }
			$('html, body').stop().animate({
				scrollTop: newTop
			}, 500, function() {
				if ($(target+' input').length) {
					$(target+' input:eq(0)').focus();
				}
				if (typeof callback === 'string') {
					var callbackFn = new Function(callback);
					callbackFn();
				}
			});
			event.preventDefault();
		});
	},

	scrollToInclude : function(sel, padding) {
		if (sel instanceof jQuery) { $el = sel; } else { $el = jQuery(sel); }
		if (isNaN(padding)) { padding = 20; }
		if (!$el.length || ($el.css('display') == 'none')) { return; }
		var newTop = $el.offset().top + $el.outerHeight + padding;
		if (newTop > jQuery(window).scrollTop()) {
			jQuery('html, body').stop().animate({
				scrollTop : newTop
			}, 500);
		}
	},

	verticalCenter : function(sel, relativeTo) {
		if (relativeTo == null) { relativeTo = window; }
		var newTop = ( jQuery(relativeTo).height() - jQuery(sel).outerHeight() ) / 2;
		if (newTop >= 0) { jQuery(sel).css('top',newTop+'px'); }
	},

	shortenLinks : function() {
		jQuery('a').each(function(){
			if (jQuery(this).width() > jQuery(this).parent().width()) {

				href = jQuery(this).attr('href');
				linktext = jQuery(this).text();
				regex = /(https?:\/\/)?([a-zA-Z0-9\-\.]+)\/\S*/;
				isUrl = regex.exec(linktext);
				if (isUrl !== null && isUrl.length) {
					url = regex.exec(href);
					if (url[2]) {
						jQuery(this).text('('+url[2]+')');
					} else {
						jQuery(this).text('(link)');
					}
				}

			}
		});
	},

}

/**
 * 3.1 jQuery(document).ready
 */

jQuery(document).ready(function($){
	wsUtil.init();
});

/**
 * 3.2 jQuery(document).ajaxComplete
 */

jQuery(document).ajaxComplete(function() {
	wsUtil.prepareMessages();
});
