$(function () {
	var map = new L.Map('map',{
		center: [0, 0],
		zoom: 3,
		minZoom: 3 
	});
	var marker;
	var isUserSelectingByClick = false;
	var startPosition;
	var endPosition;
	var route;

	new L.TileLayer(
	  'http://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png',
	  { attribution: 'Map tiles &copy; <a href="http://mapbox.com">MapBox</a>', maxNativeZoom: 19, maxZoom: 21 }
	).addTo(map);

	var osmb = new OSMBuildings(map)
	  .date(new Date(2014, 5, 15, 17, 30))
	  .load()
	  .click(function(id) {
	    console.log('feature id clicked:', id);
	  });

	L.control.layers({}, { Buildings: osmb }).addTo(map);

	$("#myLocationButton").on('click', function (event) {
		navigator.geolocation.getCurrentPosition(showCurrentLocation, handleCurrentLocationError);
	});

	showCurrentLocation = function (position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		map.setView([lat, lng], 17);
		marker = L.marker([lat, lng]).addTo(map);
	};

	handleCurrentLocationError = function (err) {
		console.log("There seems to be an error :"+err);
	};

	function getUserSelectedPosition (event) {
		if (!startPosition) {
			startPosition = event.latlng;
		} else {
			endPosition = event.latlng;
			map.off('click',getUserSelectedPosition);
			getPath();
			startPosition = null;
			endPosition = null;
			$("#map").css({
				cursor: "grab"
			});
		}
	}

	var getPath = function () {
		$.getJSON('http://160.75.81.195:8080/postgis/postgisdb/ways/pgr_aStarFromAtoB/'+startPosition.lng+'/'+startPosition.lat+'/'+endPosition.lng+'/'+endPosition.lat)
			.done(function (data) {
				var latlngs = [];
				var latlng;
				for (var i = 1; i < data.length; i++) {
					latlng = new L.latLng(data[i][3], data[i][2]);
					latlngs.push(latlng);
					latlng = new L.latLng(data[i][5], data[i][4]);
					latlngs.push(latlng);
				}

				route = L.polyline(latlngs, {color: 'red'}).addTo(map);
				map.fitBounds(route.getBounds());
			});
	};

	$("#searchChoiceButton").on('click', function (event) {
		$("#pickDestination").modal('hide');
		if ($("#selectByClick").is(":checked")) {
			isUserSelectingByClick = true;
			map.on('click', getUserSelectedPosition);
			$("#map").css({
				cursor: "default"
			});
		} else {

		}
	});	
});
