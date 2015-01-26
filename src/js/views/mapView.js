var rr = rr || {};

rr.MapView = Backbone.View.extend({

	map: null,

	initialize: function () {
		this.render();
	},

	render: function () {
		map = new ol.Map({
			target: 'map',
			layers: [
		      new ol.layer.Tile({
		      	title: 'Global Imagery',
		        source: new ol.source.OSM()
		      })
		    ],
		    view: new ol.View({
		      center: ol.proj.transform([29.027,41.029], 'EPSG:4326', 'EPSG:3857'),
		      zoom: 11
		    }),
		    controls: ol.control.defaults({
		      attributionOptions: {
		        collapsible: false
		      }
		    })
		});
	}
});