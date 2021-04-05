import GeocodingClient from '@mapbox/mapbox-sdk/services/geocoding';
import OSRM from 'osrm.js';

const geocodingClient = GeocodingClient({ accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN });
var osrm = new OSRM("https://router.project-osrm.org");

export const findCoordinates = async (placeName) => { // turn input text into geoJSON feature
    return geocodingClient
        .forwardGeocode({
            query: placeName,
            autocomplete: false,
            limit: 1
        })
        .send()
        .then((response) => {
            if (
                response &&
                response.body &&
                response.body.features &&
                response.body.features.length
            ) {
                const feature = response.body.features[0];
                return feature;
            }
        });
}
export const findRoute = async (originFeature, destinationFeature) => {
    if (originFeature && destinationFeature) { // if have feature objs with coordinates
        const result  = await new Promise((resolve) => {
            osrm.route({
                coordinates: [originFeature.center, destinationFeature.center],
                steps: true,
                alternatives: false,
                overview: 'simplified',
                geometries: 'geojson'
            }, (err, result) => {
                if (result && result.routes && result.routes.length > 0) {
                    console.log(result.routes[0].distance / 1000); //returns distance in meters
                    // console.log(result.routes[0].duration / 60); // returns duration in seconds
                    resolve(result.routes[0]); // .geometry = coordinates array and type (linestring)
                }
                resolve(undefined);
            });
        });
        return result;
    }
    return null;
}