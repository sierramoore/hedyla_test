import { createAction } from '../utils/utils';
import { ROUTE } from './types';


export const mapActions = {
  setOrigin: (originFeature) => createAction(ROUTE.SET_ORIGIN, { 
    originFeature
  }),
  setDestination: (destinationFeature) => createAction(ROUTE.SET_DESTINATION, { 
    destinationFeature
  }),
  setVehicle: (vehicle) => createAction(ROUTE.SET_VEHICLE, { 
    vehicle
  }),
  setRoute: (route) => {
    return createAction(ROUTE.SET_ROUTE, {
    route
  })},
  setDistance: (distance) => {
    return createAction(ROUTE.SET_DISTANCE, {
      distance
    })
  },
  setCostPerKm: costPerKm => {
    return createAction(ROUTE.SET_COST_PER_KM, {
      costPerKm
    })
  },
  calculateCost: () => {
    return createAction(ROUTE.CALCULATE_COST, {})
  }
}

export default mapActions;