var rr = rr || {};

rr.LocationModel = Backbone.Model.extend({

	defaults: {
		name: "",
		lat: "",
		lng: ""
	}
});

rr.LocationList = Backbone.Collection.extend({
	
})