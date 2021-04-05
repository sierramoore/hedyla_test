import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapActions } from '../../actions/mapActions';
import { makeStyles } from '@material-ui/core/styles';
import {
    ListItem,
    ListItemIcon,
    Input,
    Button
} from '@material-ui/core';
import {
    PinDrop as LocationStartIcon,
    Room as LocationIcon
} from '@material-ui/icons';
import GeocodingClient from '@mapbox/mapbox-sdk/services/geocoding';
import OSRM from 'osrm.js';
import {findCoordinates, findRoute} from '../../services';
import {Calculator} from '../Calculator/Calculator.js';


const useStyles = makeStyles(() => ({
    button: {
        marginTop: '30px',
        textAlign: 'center',
        width: '100%',
        //   backgroundColor: 
    },
    select: {
        minWidth: '500',
        color: 'red',

    }
}));
const geocodingClient = GeocodingClient({ accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN });
var osrm = new OSRM("https://router.project-osrm.org");

export const Sidebar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { originFeature, destinationFeature } = useSelector(state => state.mapReducer);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    
    const handleKeyDown = async (event, input) => {
        if (event.key === 'Enter') {
            switch (input) {
                case 'origin':
                    const originFeature = await findCoordinates(origin); //obj with location, coordinates
                    if (originFeature) {
                        setOrigin(originFeature.place_name);
                        dispatch(mapActions.setOrigin(originFeature));
                    };
                    break;
                case 'destination':
                    const destFeature = await findCoordinates(destination);
                    if (destFeature) {
                        setDestination(destFeature.place_name);
                        dispatch(mapActions.setDestination(destFeature));
                    };
                    break;
                default:
                    break;
            }
        }
    };
    

    const findRoute_ = async () => {
        const route = await findRoute(originFeature, destinationFeature);
        if (route) {
            dispatch(mapActions.setRoute(route.geometry));
            dispatch(mapActions.setDistance(route.distance/1000));
            dispatch(mapActions.calculateCost());        
        }
    }
    return (
        <div>
            <Calculator />
            <ListItem button>
                <ListItemIcon>
                    <LocationStartIcon />
                </ListItemIcon>
                <Input value={origin} onKeyDown={(e) => handleKeyDown(e, 'origin')} onChange={(e) => setOrigin(e.target.value)} placeholder="Origin" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <LocationIcon />
                </ListItemIcon>
                <Input value={destination} onKeyDown={(e) => handleKeyDown(e, 'destination')} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" />
            </ListItem>
  
            <ListItem>
                <Button onClick={findRoute_} className={classes.button}>Find Route</Button>
            </ListItem>
        </div>
    );
};