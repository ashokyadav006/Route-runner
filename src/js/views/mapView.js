var rr = rr || {};

rr.MapView = Backbone.View.extend({

	map: null,

	clickCounter: 0,

	self: null,

	initialize: function () {
		self = this;
		this.render();
        this.login = new rr.LoginView();
        this.direction = new rr.DirectionView({"map": this});
        this.login.render();
	},

	render: function () {
		map = new ol.Map({
			target: 'map',
            renderer:'canvas',
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
    },

    findRouteOnClick: function () {
    	map.on('click', this.getRoutePosition);
    },

    getRoutePosition: function (event) {
   		if (self.clickCounter === 0) {
   			self.origin = event.coords;
   			self.clickCounter++;
   		} else {
   			self.clickCounter = 0;
   			self.destination = event.coords;
   			map.un('click', self.getRoutePosition);
   			self.drawpath();
   		}
    },

    drawpath: function () {
    	var styleCache = {};
    	var geoLayer = new ol.layer.Vector({
    		source: new ol.source.GeoJSON({
    			projection : 'EPSG:3857',
    			url: './js/myGeoJSON.geojson'
    		}),
    		style: function (feature, resolution) {
    			var text = resolution < 5000 ? feature.get('name') : '';
				if (!styleCache[text]) {
					styleCache[text] = [new ol.style.Style({
						fill : new ol.style.Fill({
							color : 'rgba(255, 255, 255, 0.1)'
						}),
						stroke : new ol.style.Stroke({
							color : '#319FD3',
							width : 1
						}),
						text : new ol.style.Text({
							font : '12px Calibri,sans-serif',
							text : text,
							fill : new ol.style.Fill({
								color : '#000'
							}),
							stroke : new ol.style.Stroke({
								color : '#fff',
								width : 3
							})
						}),
						zIndex : 50
					})];
				}
				return styleCache[text];
    		}
    	});
    	map.addLayer(geoLayer);
    }
});





















