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
		
		if (!st.part.isPartSatisfied(part)) {
			return h;
		}
		
		switch (part.type) {
			case "chapter":
				h += that.renderChapterPart(part);
				break;
			case "goto":
				h += that.renderGotoPart(part);
				break;
			case "heading":
				h += that.renderHeadingPart(part);
				break;
			case "navigation":
				h += that.renderNavigationPart(part);
				break;
			case "paragraph":
				h += that.renderTextPart(part);
				break;
			case "variable":
				h += that.renderVariablePart(part);
				break;
			default:
				alert("Error: unknown part type[" + part.type + "]. [76]");
		}
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
	renderChapterPart: function(part) {
		var that = st.part;
		var h = "<div class=\"st-story-part st-story-chapter\">"
			  + that.renderIdPart(part)
		      + that.renderSubparts(part)
		      + "</div>";
		return h;
	},
	renderGotoPart: function(part) {
		var that = st.part;
		var h = "<li>"
			+ that.renderIdPart(part)
			+ "<a href=\"#\" class=\"st-story-part st-story-goto\" data-goto-id=\"" + part.nextId + "\">"
			+ part.text + "</a>"
			+ "</li>\n";
		return h;
	},
	renderHeadingPart: function(part) {
		var that = st.part;
		var h = "<h1 class=\"st-story-part st-story-header\">"
			+ that.renderIdPart(part)
			+ part.text
			+ "</h1>\n";
		return h;
	},
	renderIdPart: function(part) {
        var h = "<div class=\"st-story-edit-id\">" + part.id + "</div>";
        return h;
	},
	renderNavigationPart: function(part) {
		var that = st.part;
		var h = "<div class=\"st-story-part st-story-navigation\"><h4>"
			+ that.renderIdPart(part)
			+ part.text
			+ "</h4><ul>\n";
		h += that.renderSubparts(part);
		h += "</ul></div>";
		return h;
	},
	renderTextPart: function(part) {
		var that = st.part;
		var h = "<p class=\"st-story-part st-story-paragraph\">"
			+ that.renderIdPart(part)
			+ part.text
			+ "</p>\n";
		return h;
	},
	renderVariablePart: function(part) {
		var that = st.part;
		var story = st.story;
		story.vars[part.name] = part.value;
		var h = "<div class=\"st-story-part st-story-variable\">"
			+ that.renderIdPart(part)		
			+ part.name
			+ "="
			+ part.value
			+ "[<span class=\"st-variable-" + (_.slugify(part.name)) + "\">" + (story.vars[part.name]) + "</span>]"
			+ "</div>\n";
		return h;
	},
	isPartSatisfied: function(part) {
		var story = st.story;
		var ret = true;
		if (part.condition) {
			;
		}
		return ret;
	}
}