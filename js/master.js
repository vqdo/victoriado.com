var home = (function() {
	var self = {};
	var $logo = $('#logo');

	self.onResize = function() {

	}

	/** 
	 * Update opacity of the logo based on scroll distance 
	 */
	self.logoController = {
		init: function() { },
		onScrollDistance: function(distance) {	
			var interaction_distance = $logo.height();
			var opacity = distance/interaction_distance;
			opacity = Math.max(1 - Math.min(1, opacity), 0.1);

			$logo.css("opacity", opacity);
		}
	}

	//Simple mechanism for changing pages with fading animation
	self.pageController = {
		init: function(opt) {
			if(!opt) return;

			var options = {
				// Required
				default: opt.default || '',
				container: opt.container || '',
				links: opt.links || '',

				// optional
				currentPage: opt.currentPage || 'works-page-current'
			};

			options.default.show('fast');
			options.default.addClass(options.currentPage);

			$(options.links).click(function(evt) {
				evt.preventDefault();

				var $target = $($(this).attr('href'));
				var $current = $('.' + options.currentPage);
				console.log($target);
				$current.fadeOut({
					duration: 'fast',
					complete: function() {
						$target.fadeIn();
					}
				});									
				//$target.fadeIn();			

				$current.removeClass(options.currentPage);
				$target.addClass(options.currentPage);

			});
		}
	}

	self.portfolioController = {
		_worksMap: {},

		init: function() {
			this.attachThumbHandler();
			this.attachThumbExpand();
			this.constructColumns($('.portfolio-gallery'), $('.portfolio-thumb'));
			this.makeWorksMap();
			this.attachLinkHandler();
			this.attachIconsHandler();
		},

		makeWorksMap: function() {
			var thumbnails = $('.portfolio-thumb');
			var links = $('.works-links li');

			if(thumbnails.length != links.length) {
				console.warn("Number of links does not match number of thumbnails.");
			}

			// returns 'name' in string formatted 'x-name'
			var extractName = function(classNames) {
				var parts = classNames.split('-');
				if(parts.length > 1) {
					return parts[1];
				}
			
				console.error("Invalid format: " + classNames);
				return null;
			}

			$.each(thumbnails, $.proxy(function(i, thumbnail) {
				thumbnail = $(thumbnail);
				var name = extractName(thumbnail.attr('id'));
				this._worksMap[name] = this._worksMap[name] || {};
				this._worksMap[name].thumbnail = thumbnail;
			}, this));
			$.each(links, $.proxy(function(i, link) {
				link = $(link);
				var name = extractName(link.attr('id'));
				this._worksMap[name] = this._worksMap[name] || {};
				this._worksMap[name].link = link;
			}, this));
		},

		attachLinkHandler: function() {
			$.each(this._worksMap, function(i, pair) {
				var $link = pair.link,
					$thumb = pair.thumbnail;

				if($thumb) {
					$link.mouseenter(function() {
						$thumb.find('a').mouseover();
					}).mouseleave(function() {
						$thumb.find('a').mouseleave();
					});
				}	
			});
		},

		attachIconsHandler: function() {
			var $viewButtons = $('.open-new');

			$viewButtons.mouseenter(function() {
				$(this).find('.open-new-label').show(200, "linear");
			}).mouseleave(function() {
				$(this).find('.open-new-label').hide();
			});
		},

		attachThumbExpand: function() {
			var toggleMoreInfo = function($thumbnail) {
				$thumbnail.find('.more-info').toggle();
				$thumbnail.toggleClass('expanded');
			}

			$('.see-more-button').click(function(evt) {
				evt.preventDefault();
				var $thumbnail = $(this).parent();
				toggleMoreInfo($thumbnail);

				$thumbnail.find('.see-more').remove();
			});
		},

		attachThumbHandler: function() {
			var createSeeMore = function() {
				return $('<div class="see-more">Click to see more</div>');
			}

			var $works = $('.see-more-button');

			$works.mouseover(function(evt) {;
				evt.stopPropagation();

				var $this = $(this);
				var $parent = $this.parent();
				$this.find('.thumb-title').show();

				if(!$parent.has('.see-more').length && !$parent.is('.expanded')) {
					$this.append(createSeeMore());
				}
			}).mouseleave(function(evt) {;
				// console.log($(evt.target).find('.see-more'));
				//console.log(evt.target);
				$(this).find('.thumb-title').hide();
				$(this).find('.see-more').remove();
			});
		},

		// Create columns for the portfolio works to simulate the "masonry" style
		constructColumns: function($container, $items) {

			var itemWidth = $items.outerWidth();
			var maxWidth = $container.width();
			var n = Math.floor(maxWidth/(itemWidth + 10)); // number of cols

			var makeColumn = function(i) {
				return $('<div />')
					.width(itemWidth)
					.addClass('fl col col' + i);
			}

			var columns = [];
			for(var i = 0; i < n; i++) {
				var col = makeColumn(i);
				$container.append(col);
				columns.push(col);
			}

			$.each($items, function(i, item) {
				columns[i % n].append($(item).detach());
			});
		}		
	}


	return self;
})();


$(document).ready(function() {
	home.logoController.init();
	home.portfolioController.init();

	$(window).scroll(function() {
		home.logoController.onScrollDistance($(window).scrollTop());
	});		

	home.pageController.init({
		default: $('#page-overview'),
		container: $('#portfolio-contents'),
		links: $('.works-links a').add($('.page-back')).add($('.goto-details'))
	});

	var highlightText = function(textarea) {
		textarea.select();
	}

	$('.email-box').click(function(evt) {
		highlightText(this);
	});

	// Google Analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-59103309-1', 'auto');
  ga('send', 'pageview');
	
});