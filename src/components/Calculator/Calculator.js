import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapActions } from '../../actions/mapActions';
import { makeStyles } from '@material-ui/core/styles';

import {
    Typography,
    ListItem,
    ListItemIcon,
    Input,
    Select,
    Divider,
    FormControl,
    MenuItem,
    InputLabel,
    Button
} from '@material-ui/core';

import {
    Euro as EuroIcon,
    Explore as ExploreIcon,
    DriveEta as VehicleIcon
} from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    button: {
        margin: '10px',
        textAlign: 'center',
        width: '100%',
        //   backgroundColor: 
    },
    select: {
        minWidth: '500',
        color: 'red',

    }
}));

export const Calculator = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { costPerKm, distance, cost } = useSelector(state => state.mapReducer);
    const [vehicle, setVehicle] = useState('truck');

    const vehicleToCost = { // price per meter
        truck: 0.50,
        van: 0.25
    }
    const selectedVehicle = (e) => {
        setVehicle(e.target.value);
        dispatch(mapActions.setCostPerKm(vehicleToCost[e.target.value]));
    }
    const setDistance = (e) =>{
        dispatch(mapActions.setDistance(parseFloat(e.target.value)));
    }
    const setCostPerKm = (e) =>{
        console.log({e});
        dispatch(mapActions.setCostPerKm(parseFloat(e.target.value)));
    }
    const calculateRoute = () => {
        dispatch(mapActions.calculateCost());
    }

    return (
        <>
            <ListItem button>
                <ListItemIcon>
                    <EuroIcon />
                </ListItemIcon>
                <Input value={costPerKm.toString().replace('NaN', '')} type='number' onChange={setCostPerKm} placeholder="Cost Per Km" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ExploreIcon />
                </ListItemIcon>
                <Input value={distance.toString().replace('NaN','')} type='number' onChange={setDistance} placeholder="Distance" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <VehicleIcon />
                </ListItemIcon>
                <FormControl className={classes.select}>
                    <InputLabel shrink id="selectLabel">Select Vehicle</InputLabel>
                    <Select labelId="selectLabel" id="select" value={vehicle} onChange={selectedVehicle}>
                        <MenuItem value="truck">Truck</MenuItem>
                        <MenuItem value="van">Van</MenuItem>
                    </Select>
                </FormControl>
            </ListItem>
            <ListItem>
                <Button onClick={calculateRoute} className={classes.button}>Calculate Route</Button>
            </ListItem>
            <ListItem>
                <Typography>Total: <b>€{cost}</b></Typography>
            </ListItem>
            <Divider style={{ margin: '20px' }} />
        </>
    )
}