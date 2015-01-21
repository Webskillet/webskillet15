/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/*
 * This file is used/requested by the 'Styles' button.
 * The 'Styles' button is not enabled by default in DrupalFull and DrupalFiltered toolbars.
 */
if(typeof(CKEDITOR) !== 'undefined') {
    CKEDITOR.addStylesSet( 'drupal',
    [
            /* Block Styles */

            /* Inline Styles */

            // These are core styles available as toolbar buttons, but it appears that we
			// need to define a few block or inline styles in order for the object styles to load

            { name : 'Strong'			, element : 'strong', overrides : 'b' },
            { name : 'Emphasis'			, element : 'em', overrides : 'i' },

			/* Object Styles */

			{ name : 'Image Left'			, element : 'img', attributes : { 'class' : 'image-left' } },
			{ name : 'Image Center'			, element : 'img', attributes : { 'class' : 'image-center' } },
			{ name : 'Image Right'			, element : 'img', attributes : { 'class' : 'image-right' } },
    ]);
}
