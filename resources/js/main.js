var Main = function() {
	var MAX_TILT = 90; // degrees
	var FRAME_WIDTH = 32.0; // rem
	var NUM_FRAMES = 12;

	var $sprite;

	function init() {
		$(document).ready(function() {
			$sprite = $(".sprite");
			$status = $(".status");

			$(window).on("deviceorientation", function(event) {
				var	beta = event.originalEvent.beta;
				var	gamma = event.originalEvent.gamma;

				var sensitivity, tiltProgress, tiltDirection, tiltValue, frame, position;

				// Portrait mode.
				if ($(window).height() > $(window).width()) {
					tiltDirection = "Gamma";
					tiltValue = gamma;
				}

				// Landscape mode.
				else {
					tiltDirection = "Beta";
					tiltValue = beta;
				}

				tiltProgress = progress(tiltValue, -15, 15);
				frame = transition(tiltProgress, 1, NUM_FRAMES);
				frame = Math.round(frame);
				position = (-frame * FRAME_WIDTH) + "rem";
				$sprite.css("background-position", position);
				$status.text(tiltDirection + "=" + Math.round(tiltValue) + "° Progress=" + tiltProgress.toFixed(2) + " Frame=" + frame);
			});

			$(document).on("mousemove", function(event) {				
				var hoverProgress, frame, position;

				hoverProgress = progress(event.pageX, 200, window.innerWidth-200);
				frame = transition(hoverProgress, 1, NUM_FRAMES);
				frame = Math.round(frame);
				position = (-frame * FRAME_WIDTH) + "rem";
				$sprite.css("background-position", position);
				$status.text("X=" + Math.round(event.pageX) + " Progress=" + hoverProgress.toFixed(2) + " Frame=" + frame);
			});
		});
	}

	function progress(value, start, end) {
		var ratio = (value - start) / (end - start);

		if (ratio < 0) {
			return 0;
		} else if (ratio > 1) {
			return 1;
		} else {
			return ratio;
		}
	}

	function transition(progress, start, end) {
		return progress * (end - start);
	}

	return {
		init:init
	};
}();

Main.init();