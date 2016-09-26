// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

var WALDO = WALDO || {};

WALDO.tagsModel = (function () {
	var stub = {};

	return stub;
})();

WALDO.tagsView = (function () {
	var stub = {};

	stub.init = function () {
		_mouseMoveListener();
		_afterSearchClickListener();
	};

	stub.displayAllTags = function (json) {
		for (var i = 0; i < json.length; i++) {
			var newTag = new Tag(json[i]);
		};
	};

	var _mouseMoveListener = function () {
		$('.waldo').on('mousemove', function (event) {
			if ($(this).hasClass("searching")) {
				$(".target").css({
					left: event.pageX - 25,
					top: event.pageY - 25,
				});
			};
		});
	};

	var _afterSearchClickListener = function () {
		$('.waldo').on('click', function (event) {
			if ($(this).hasClass('searching')) {
				$(this).removeClass('searching');
				$('.target').addClass('clicked');
				_animateDropdown();
			} else {
				$(this).addClass('searching');
				$('.target').removeClass('clicked');
				_hideDropdown();
			}
		});
	};

	var _animateDropdown = function () {
		$('.dropdown').slideDown(100);
	};

	var _hideDropdown = function () {
		$('.dropdown').hide();
	};

	stub.addTagToScreen = function (json) {
		var tag = new Tag(json);
		$('.waldo').addClass('searching');
		$('.target').removeClass('clicked');
		$('.dropdown').fadeOut();
	};

	function Tag(json) {
		this.html = $('#tag-prototype').clone().removeAttr('id');
		$('body').append(this.html);
		this.html.show();
		this.html.find('.tagged-name').html(json.name);
		this.html.css({
			left: json.coordx,
			top: json.coordy,
		});

		this.html.find('.delete-tag').click(function () {
			self.html.fadeOut();
		});
	}

	return stub;
})();

WALDO.tagsCtr = (function (TagsView, TagsModel) {
	var stub = {};

	stub.init = function () {
		TagsView.init();
		_nameClickListener();
		_getTags();
	};

	var _getTags = function () {
		$.ajax({
			url: '/tags.json',
			method: 'get',
			success: function (json) {
				TagsView.displayAllTags(json);
			},
		});
	};

	var _createTagAjax = function (name, position) {
		console.log(position);
		$.ajax({
			url: '/tags.json',
			method: 'post',
			data: {
				"tag": {
					name: name,
					coordx: position.left,
					coordy: position.top,
				}
			},
			datatype: 'json',
			success: function (json) {
				console.log("success");
				TagsView.addTagToScreen(json);
			},
		});
	};



	var _nameClickListener = function () {
		$('.name').on('click', function (event) {
			var name = $(this).html();
			var position = $('.target').position();
			_createTagAjax(name, position);
		});
	};

	return stub;
})(WALDO.tagsView, WALDO.tagsModel);


document.addEventListener("turbolinks:load", function () {
	if ($("body").data("controller") === 'tags') {
		WALDO.tagsCtr.init();
	};
});
