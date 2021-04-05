import { ROUTE } from '../actions/types';

const initialState = {
  originFeature: undefined,
  destinationFeature: undefined,
  route: undefined,
  distance: '', // /1000 for km
  costPerKm: 0.5, // default truck
  cost: 0 
};


export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case ROUTE.SET_ORIGIN:
    case ROUTE.SET_DESTINATION:
    case ROUTE.SET_VEHICLE:
    case ROUTE.SET_ROUTE:
    case ROUTE.SET_DISTANCE:
    case ROUTE.SET_DURATION:
    case ROUTE.SET_COST_PER_KM:
      return {...state, ...action.payload}
    case ROUTE.CALCULATE_COST:
      if (!isNaN(state.distance) && !isNaN(state.costPerKm)){ // if not NaN (empty string value) then update cost
        const cost = (state.distance * state.costPerKm).toFixed(2);
        return {...state, cost}
      }
    default:
      return state
  }
}