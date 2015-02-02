var rr = rr || {};

rr.DirectionView = Backbone.View.extend({

	el: "div",

	self: null,

	initialize: function (options) {
		this.map = options.map;
		this.self = this;
		this.template = _.template($('#direction-template').html());
		$("#directionBtn").on('click', $.proxy(this.render, this));
	},

	events : {
		"click .modal-close": "onModalClose",
		"click #findDirection": "findDRoute",
		"click input": "onOptionSelection"
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
		if ($("#selectByClick").is(":selected")) {
			this.map.findRouteOnClick();
		} else {
			this.map.findRouteOnSearch();
		}
		
	},

	onOptionSelection: function (event) {
		var target = event.currentTarget;
		var searchBox = $("#searchPlaces");
		if (target.id === "selectByClick" && searchBox.is(":visible")) {
			searchBox.addClass("hidden");
		} else if (target.id === "selectBySearch" && searchBox.is(":hidden")) {
			searchBox.removeClass("hidden");
			this.showAutoComplete();
		}
	},

	showAutoComplete: function () {
		$("#destinationPlace").autocomplete({
			serviceUrl: 'http://160.75.81.195:8080/postgis/search_without_SessionID/',
			paramName: "search_txt",
			params: {
				long_current: rr.UserLocation.get("lat"),
				lat_current: rr.UserLocation.get("lng")
			},
		    transformResult: function(response) {
		    	response = $.parseJSON(response);
		        return {
		            suggestions: $.map(response.data.features, function(dataItem) {
		                return { value: dataItem.name, data: dataItem.long+","+dataItem.lat };
		            })
		        };
		    },
		    onSelect: function (suggestion) {
		    	rr.destination = suggestion.data.split(",");
		    }
		});
		$("#originPlace").autocomplete({
			serviceUrl: 'http://160.75.81.195:8080/postgis/search_without_SessionID/',
			paramName: "search_txt",
			params: {
				long_current: rr.UserLocation.get("lat"),
				lat_current: rr.UserLocation.get("lng")
			},
		    transformResult: function(response) {
		    	response = $.parseJSON(response);
		        return {
		            suggestions: $.map(response.data.features, function(dataItem) {
		                return { value: dataItem.name, data: dataItem.long+","+dataItem.lat };
		            })
		        };
		    },
		    onSelect: function (suggestion) {
		        rr.origin = suggestion.data.split(",");
		    }
		});
	}
});



















