/* st-nav.js */
st.nav = {
	stories: [],
	init: function() {
		st.log("init nav");

		$(".st-nav-link").click(st.nav.click);
		$("#st-select-story").bind("change", st.nav.selectStory);
		st.nav.loadStories();
	},
	click: function() {
		st.log("clicked nav");

		var $that = $(this);
		var href = $that.attr("href").substring(1);
		$(".st-nav-link").removeClass("st-nav-link-active")
		$that.addClass("st-nav-link-active");
		$(".st-page").hide();
		$("." + href).show();
	},
	loadStories: function() {
		st.log("loading stories");

		$.ajax("js/data/st-story-list.json")
		.done(function(data, status, jqxhr) {
			st.nav.stories = data.stories;
			setTimeout(st.nav.renderStories, 10);
		})
		.fail(function() {
			alert("Error: unable to load character list.");
		})
		.always(function() {
		});
	},
	renderStories: function() {
		st.log("rendering stories");

		var $sel = $("#st-select-story");
		for (var i=0;i<st.nav.stories.length;i++) {
			var story = st.nav.stories[i];
			var option = new Option();
			option.value = story.uri;
			option.text = story.name + " by " + story.author;
			$sel.append(option);
		}
	},
	selectStory: function() {
		st.log("selected story");

		var $sel = $(this);
		var uri = $sel.find("option:selected").attr("value");
		if (uri) {
			st.story.loadStory(uri);
		} else {
			st.story.renderReset();
			st.story.hideStory();
		}
	},
	showLinks: function() {
		$(".st-nav-links").show();
	},
	hideLinks: function() {
		$(".st-nav-links").hide();
	}
};