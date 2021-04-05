import { configureStore } from '@reduxjs/toolkit';
import { devToolsEnhancer } from 'redux-devtools-extension';

import mapReducer from '../reducers/MapReducer';

export default configureStore({
  reducer: {
    mapReducer,
  },
}, devToolsEnhancer);
