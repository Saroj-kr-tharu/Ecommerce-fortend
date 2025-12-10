
import { createReducer, on } from '@ngrx/store';
import { DashboardState } from '../../core/models/dashboard.model';
import { DashboardActions } from './admin.actions';


const initialDashboardState: DashboardState = {
  users: [],
  products: [],
  orders: [],
  loading: false,
  error: null
};


export const dashboardReducer = createReducer(
  initialDashboardState,

  on(DashboardActions.load, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(DashboardActions.loadSuccess, (state, { users, products, orders }) => {
    let data = {
    ...state,
    users: users?.data,
    products: products?.data,
    orders: orders?.data,
    loading: false
  };

  return data ;
  }),

 
);
