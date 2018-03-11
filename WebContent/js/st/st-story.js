/* st-story.js */
st.story = {
	currentId: null,
	initialId: null,
	$pagecr: null,
	$pageft: null,
	spec: {},
	
	init: function() {
		st.log("init story");
		var that = st.story;
		
		that.$pagecr = $(".st-page .st-page-cr");
		that.$pageft = $(".st-page .st-page-ft");
	},
	loadStory: function(uri) {
		st.log("loading story");
		var that = st.story;
		switch (true) {
			case (uri.indexOf(".json") > -1):
				that.loadStoryJson(uri);
				break;
			default: 
				alert("Error: unable to load story. [17]");
				break;
		}
	},
	hideStory: function() {
		var that = st.story;
		that.$pagecr.hide();
	},
	loadStoryJson: function(uri) {
		st.log("loading story from json");
		var that = st.story;
		$.ajax("js/data/" + uri)
			.done(function(data, status, jqxhr) {
				that.spec = data;
				var initialId = that.spec.initialId;
				that.currentId = initialId;
				setTimeout(st.story.renderStory, 10);
			})
			.fail(function() {
				alert("Error: unable to load story. [30]");
			})
			.always(function() {
			})
		;
	},
	renderStory: function() {
		var that = st.story;
		that.renderReset();
		that.render();
		that.$pagecr.show();
	},
	gotoId: function(nextId) {
		var that = st.story;
		that.currentId = nextId;
		that.renderStory();
	},
	render: function() {
		st.log("rendering story");
		var that = st.story;
		var currentPart = that.findCurrentPart();
		if (currentPart == null) {
			alert("Error: unable to find initial part. [47]");
		}
		var $h = that.$pagecr;
		var h = st.part.renderPart(currentPart);
		$h.append(h);
		$("a.st-story-goto").on("click", st.part.clickGoto);
		$(".st-page").removeClass("st-initial-state");
	},
	renderReset: function() {
		st.log("render reset");
		var that = st.story;
		var $h = that.$pagecr;
		$h.html("");
	},
	findCurrentPart: function() {
		var that = st.story;
		var id = that.currentId;
		var ret = that.findPart(id);
		return ret;
	},
	findPart: function(id) {
		var that = st.story;
		var parts = that.spec.parts;
		for (var i=0; i<parts.length; i++) {
			var part = parts[i];
			if (part.id == id) {
				return part;
			}
		}
		return null;
	}
};