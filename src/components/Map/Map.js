import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useSelector } from 'react-redux';
import './Map.css';


export const Map = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const [map, setMap] = useState(undefined);
  const { route } = useSelector(state => state.mapReducer);
  
  useEffect(() => {
    const map_ = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/mapbox/outdoors-v11/',
      center: [2.166, 41.384], // starting position [lng, lat]
      zoom: 12.5,
    });
    // // add navigation control (the +/- zoom buttons)
    map_.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    map_.on('load', function () {
      setMap(map_);
    });
    // clean up on unmount
    return () => map_.remove();
  }, []);

  useEffect(() => {
    if (!!map) {
      updateMap();
    }
  }, [route])

  const updateMap = async () => {
    if (!!map.getLayer("route")) {
      await map.removeLayer("route");
    }
    if (!!map.getSource("route")) {
      await map.removeSource("route");
    }
    if(!!map) {
      map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': route
        }
      });
      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 8
        }
      });
    }
  }

  return <div className="map-container" id="map" />;
}