/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-default' ),
		Technology = document.querySelector( '#Technology' ),
		Firm = document.querySelector( '#Firm' ),
		Contact = document.querySelector( '#Contact' ),
		Schedule = document.querySelector( '#Schedule' ),
		didScroll = false,
		changeHeaderOn = 300;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'navbar-shrink' );
			Technology.style.color = "white";
			Firm.style.color = "white";
			Contact.style.color = "white";
			Schedule.style.color = "white";
		}
		else {
			classie.remove( header, 'navbar-shrink' );
			Technology.style.color = "black";
			Firm.style.color = "black";
			Contact.style.color = "black";
			Schedule.style.color = "black";
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();