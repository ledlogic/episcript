/* st-part.js */
st.part = {
	init: function() {
		st.log("init part");
		var that = st.part;
	},
	renderPart: function($h, part) {
		st.log("rendering part[" + part.id + "]");
		
		var that = st.part;
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
		var that = st.part;
		that.renderSubparts($h, part);
	},
	renderSubparts: function($h, part) {
		var that = st.part;
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
}