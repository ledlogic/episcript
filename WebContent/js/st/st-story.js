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
	},
	loadStoryJson: function(uri) {
		st.log("loading story from json");
		var that = st.story;
		$.ajax("js/data/" + uri)
		.done(function(data, status, jqxhr) {
			that.spec = data;
			var initialId = that.spec.initialId;
			that.currentId = initialId;
			setTimeout(st.story.render, 10);
		})
		.fail(function() {
			alert("Error: unable to load story. [30]");
		})
		.always(function() {
		});
	},
	render: function() {
		st.log("rendering story");
		var that = st.story;
		var currentPart = that.findCurrentPart();
		if (currentPart == null) {
			alert("Error: unable to find initial part. [47]");
		}
		var $h = that.$pagecr;
		that.renderPart($h, currentPart);
		$(".st-page").removeClass("st-initial-state");
	},
	renderReset: function() {
		st.log("render reset");
		st.story.$pageft.html("");
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
	},
	renderPart: function($h, part) {
		st.log("rendering part[" + part.id + "]");
		
		var that = st.story;
		switch (part.type) {
		case "chapter":
			that.renderChapterPart($h, part);
			break;
		case "heading":
			that.renderHeadingPart($h, part);
			break;
		case "paragraph":
			that.renderTextPart($h, part);
			break;
		default:
			alert("Error: unknown part type[" + part.type + "]. [76]");
		}
	},
	renderChapterPart: function($h, part) {
		var that = st.story;
		that.renderSubparts($h, part);
	},
	renderSubparts: function($h, part) {
		var that = st.story;
		var parts = part.parts;
		for (var i=0; parts && parts.length && i<parts.length; i++) {
			that.renderPart($h, parts[i]);
		}
	},
	renderHeadingPart: function($h, part) {
		var h = "<h1 class=\"st-story-part st-story-header\">" + part.text + "</h1>\n";
		$h.append(h);
	},
	renderTextPart: function($h, part) {
		var h = "<p class=\"st-story-part st-story-paragraph\">" + part.text + "</p>\n";
		$h.append(h);
	}
};