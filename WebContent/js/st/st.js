/* st.js */

var st = {
	log: function(s) {
		if (typeof(window.console) != "undefined") {
			console.log(s);
		}
	},

	init: function() {
		st.story.init();
		st.part.init();
		st.nav.init();
	}
};

$(document).ready(st.init);
