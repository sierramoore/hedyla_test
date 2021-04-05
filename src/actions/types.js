import { createActionTypes } from '../utils/utils';

export const ROUTE = createActionTypes('ROUTE', [
  'SET_ORIGIN',
  'SET_DESTINATION',
  'SET_VEHICLE',
  'SET_ROUTE',
  'SET_DISTANCE',
  'SET_COST_PER_KM',
  'CALCULATE_COST'
]);


export default ROUTE;