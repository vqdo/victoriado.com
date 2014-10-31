$(document).ready(function() {
	console.log("Ready!");

	var ANIMATE_TIME = 200;
	var projectThumbs = $('.main-project-wrapper');

	$(projectThumbs).hover(function(evt) {
		var $el = $(this).find('.main-project-overlay');
		$el.animate({ marginLeft: '+=300px' }, {
			duration: ANIMATE_TIME
		});
	}, function(evt) {
		var $el = $(this).find('.main-project-overlay');
		$el.animate({ marginLeft: '+=300px' }, {
				duration: ANIMATE_TIME, 
				complete: function() {
					$el.css('margin-left', '-300px');	
				}
		});	
	});

});