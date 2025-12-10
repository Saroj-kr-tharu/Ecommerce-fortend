import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "../../core/models/dashboard.model";


export const selectDashboardState = createFeatureSelector<DashboardState>('DashboardReducer');

export const selectUsers = createSelector(
  selectDashboardState,
  state => state.users
);

export const selectProducts = createSelector(
  selectDashboardState,
  state => state.products
);

export const selectOrders = createSelector(
  selectDashboardState,
  state => state.orders
);


// Basic counts
export const selectTotalUsers = createSelector(
  selectUsers, 
  users => users?.length ?? 0
);

export const selectTotalProducts = createSelector(
  selectProducts, 
  products => products?.length ?? 0
);

export const selectTotalOrders = createSelector(
  selectOrders, 
  orders => orders?.length ?? 0
);



// Order status counts
export const selectConfirmedOrders = createSelector(
  selectOrders,
  orders => orders?.filter(order => order.orderStatus === 'confirmed').length ?? 0
);

export const selectCancelledOrders = createSelector(
  selectOrders,
  orders => orders?.filter(order => order.orderStatus === 'cancelled').length ?? 0
);

export const selectPendingOrders = createSelector(
  selectOrders,
  orders => orders?.filter(order => order.orderStatus === 'pending').length ?? 0
);

export const selectDeliveredOrders = createSelector(
  selectOrders,
  orders => orders?.filter(order => order.orderStatus === 'delivered').length ?? 0
);

// Payment status counts
export const selectPendingPayment = createSelector(
  selectOrders,
  orders => orders?.filter(order => order.paymentStatus === 'pending').length ?? 0
);

export const selectConfirmedPayment = createSelector(
  selectOrders,
  orders => orders?.filter(order => order.paymentStatus === 'paid' || order.paymentStatus === 'completed').length ?? 0
);

export const selectFailedPayment = createSelector(
  selectOrders,
  orders => orders?.filter(order => order.paymentStatus === 'failed').length ?? 0
);

// Revenue calculations
export const selectTotalRevenue = createSelector(
  selectOrders,
  orders => {
    if (!orders || orders.length === 0) return 0;
    return orders
      .filter(order => order.paymentStatus === 'paid' || order.paymentStatus === 'completed')
      .reduce((total, order) => total + (order.totalAmount ?? 0), 0);
  }
);

export const selectTotalSales = createSelector(
  selectOrders,
  orders => {
    if (!orders || orders.length === 0) return 0;
    return orders
      .reduce((total, order) => total + (order.totalAmount ?? 0), 0);
  }
);

export const selectPendingRevenue = createSelector(
  selectOrders,
  orders => {
    if (!orders || orders.length === 0) return 0;
    return orders
      .filter(order => order.paymentStatus === 'pending')
      .reduce((total, order) => total + (order.totalAmount ?? 0), 0);
  }
);

// Additional useful selectors
export const selectAverageOrderValue = createSelector(
  selectOrders,
  orders => {
    if (!orders || orders.length === 0) return 0;
    const total = orders.reduce((sum, order) => sum + (order.totalAmount ?? 0), 0);
    return total / orders.length;
  }
);






// Orders by payment method
export const selectOrdersByPaymentMethod = createSelector(
  selectOrders,
  orders => {
    if (!orders || orders.length === 0) return {};
    return orders.reduce((acc, order) => {
      const method = order.paymentMethod || 'Unknown';
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
);