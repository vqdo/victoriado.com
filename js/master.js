var home = (function() {
	var self = {};
	var $logo = $('#logo');

	self.init = function() {
	}
	// home.scaleToLogoSize = function() {
	// 	var $logo = $('.brand img');
	// 	var $banner = $('header');
	// 	var height = $logo.height();
	// 	console.log(height);
	// 	$banner.height(height);
	// }
	self.onResize = function() {

	}

	/** 
	 * Update opacity of the logo based on scroll distance 
	 */
	self.updateOpacity = function(distance) {
		var interaction_distance = $logo.height();
		var opacity = distance/interaction_distance;
		opacity = Math.max(1 - Math.min(1, opacity), 0.1);

		$logo.css("opacity", opacity);
	}

	return self;
})();

$(document).ready(function() {
	home.init();
	$(window).scroll(function() {
		home.updateOpacity($(window).scrollTop());
	});
});