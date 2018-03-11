/* st-part.js */
st.part = {
	init: function() {
		st.log("init part");
		var that = st.part;
	},
	clickGoto: function() {
		var story = st.story;
		var nextId = $(this).data("goto-id");
		story.gotoId(nextId);
	},
	renderPart: function(part) {
		st.log("rendering part[" + part.id + "]");
		var h = "";
		var that = st.part;
		switch (part.type) {
			case "chapter":
				h += that.renderChapterPart(part);
				break;
			case "heading":
				h += that.renderHeadingPart(part);
				break;
			case "paragraph":
				h += that.renderTextPart(part);
				break;
			case "navigation":
				h += that.renderNavigationPart(part);
				break;
			case "goto":
				h += that.renderGotoPart(part);
				break;
			default:
				alert("Error: unknown part type[" + part.type + "]. [76]");
		}
		return h;
	},
	renderChapterPart: function(part) {
		var that = st.part;
		var h = that.renderSubparts(part);
		return h;
	},
	renderSubparts: function(part) {
		var that = st.part;
		var parts = part.parts;
		var h = "";
		for (var i=0; parts && parts.length && i<parts.length; i++) {
			h += that.renderPart(parts[i]);
		}
		return h;
	},
	renderHeadingPart: function(part) {
		var h = "<h1 class=\"st-story-part st-story-header\">" + part.text + "</h1>\n";
		return h;
	},
	renderTextPart: function(part) {
		var h = "<p class=\"st-story-part st-story-paragraph\">" + part.text + "</p>\n";
		return h;
	},
	renderNavigationPart: function(part) {
		var that = st.part;
		var h = "<div class=\"st-story-part st-story-navigation\"><h4>" + part.text + "</h4>\n";
		h += that.renderSubparts(part);
		h += "</div>";
		return h;
	},
	renderGotoPart: function(part) {
		var h = "<a href=\"#\" class=\"st-story-part st-story-goto\" data-goto-id=\"" + part.nextId + "\">" + part.text + "</a>\n";
		return h;
	}
}