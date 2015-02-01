var rr = rr || {};

rr.DirectionView = Backbone.View.extend({

	el: "div",

	initialize: function (options) {
		this.map = options.map;
		this.template = _.template($('#direction-template').html());
		$("#directionBtn").on('click', $.proxy(this.render, this));
	},

	events : {
		"click .modal-close": "onModalClose",
		"click #findDirection": "findDRoute"
	},

	onModalClose: function () {
		$("#overlay").hide();
		$("#modal").empty();
		$("#modal").hide();
	},

	render: function () {
		$("#overlay").show();
		$("#modal").show();
		$("#modal").html(this.template());
	},

	findDRoute: function () {
		this.onModalClose();
		this.map.findRouteOnClick();
	}
});