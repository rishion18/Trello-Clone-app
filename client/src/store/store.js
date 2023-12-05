import {configureStore} from '@reduxjs/toolkit';
import DashboardReducers from './DashboardReducers';

export default configureStore({
  reducer:{
    Dashboard: DashboardReducers
  }
});
