var map;

function init_map (fms_url) {

  mapboxgl.accessToken = config.mapbox_api_key;
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-guidance-day-v4',
    center: [13.071,52.398],
    zoom: 15.1
  });

  map.on("load", init);

  function init() {

    map.addSource('pods', {type: 'geojson', data: {type : "FeatureCollection", features : [{}]}});
    map.addLayer({
      "id": "pods",
      'type': 'circle',
      "source": "pods",
      "paint": {
        'circle-color': [
          'match',
          ['get', 'status'],
           'idle', '#FF0',
           'roam', '#00f',
           'on_way_to_user', '#80f',
           'ready_to_enter', '#a0f',
           'paused_ride', '#f00',
           'going_to_dropoff', '#f0f',
           '#A0A'
        ],
        // Add data-driven styles for circle radius
        'circle-radius': 8,
        'circle-opacity': 1.0
      }
    });

    map.addLayer({
      "id": "podInfo",
      'type': 'symbol',
      "source": "pods",
      "layout": {
      "text-field": "pod",
      "text-font": [
        "DIN Offc Pro Medium",
        "Arial Unicode MS Bold"
      ],
      "text-size": 15
    }
    });

    map.addSource('users', {type: 'geojson', data: fms_url+"/data/geojson/users"});
    map.addLayer({
      "id": "users",
      'type': 'circle',
      "source": "users",
      "paint": {
        'circle-color': '#F00',
        // Add data-driven styles for circle radius
        'circle-radius': 6,
        'circle-opacity': 1.0
      }
    });
    map.addLayer({
      "id": "userNames",
      'type': 'symbol',
      "source": "users",
      "layout": {
      "text-field": "{firstname}",
      "text-font": [
        "DIN Offc Pro Medium",
        "Arial Unicode MS Bold"
      ],
      "text-size": 12
    }
    });


    if (config.SHOW_STOPS) {
      map.addSource('stops', {type: 'geojson', data: fms_url+"/data/geojson/stops"});
      map.addLayer({
        "id": "stops",
        'type': 'circle',
        "source": "stops",
        "paint": {
          'circle-color': '#00F',
          'circle-radius': 5,
          'circle-opacity': 1
        }
      });
    }

    map.addSource('podTrip', {type: 'geojson', data: fms_url+"/data/geojson/trip_for_pod?pod_id="+STATE.id});
    map.addLayer({
      "id": "podTrip",
      "type": "line",
      "source": "podTrip",
      "paint": {
        "line-color": [
          'match',
          ['get', 'mode'],
           'walk', '#0a0',
           'drive', '#00f',
           "pod_drive", "#f00",
           '#000'
        ],
        // 'line-dasharray': [1, 1],
        "line-width": 3
      }
    });

    map.addSource('podStops', {type: 'geojson', data: fms_url+"/data/geojson/pod/dropoff_points?pod_id="+STATE.id});
    map.addLayer({
      "id": "podStopsName",
      "type": "symbol",
      "source": "podStops",
      "layout": {
        "text-field": "{voucher_id} {place_name}",
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Bold"
        ],
        "text-size": 15
      }
    });

    map.addLayer({
      "id": "podStopsDot",
      "type": "symbol",
      "source": "podStops",
      'type': 'circle',
      "source": "podStops",
      "paint": {
        'circle-color': '#00F',
        'circle-radius': 10,
        'circle-opacity': 0.6
      }
    });




    setInterval(function () {
      map.getSource("users").setData(fms_url+"/data/geojson/users");
      map.getSource("podTrip").setData(fms_url+"/data/geojson/trip_for_pod?pod_id="+STATE.id);
      map.getSource('podStops').setData(fms_url+"/data/geojson/pod/dropoff_points?pod_id="+STATE.id);
    }, 1000);

    setInterval(function () {
      map.getSource("pods").setData(
        {
          type : "FeatureCollection",
          features : [
            {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                STATE.position[0],
                STATE.position[1]
              ]
            }
          }
        ]
      });
    }, 30)
  }
}
