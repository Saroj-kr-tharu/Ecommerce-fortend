import { createReducer, on } from '@ngrx/store';
import { CartState } from '../../core/models/cart.model';
import { addItemcartsAction, bulkUpdateItemAction, clearCartAction, deleteBulkItemAction, getcartsAction, removeItemAction, updateItemAction } from './cus.action';

// cart Reducer here
const intalCartState: CartState = {
  itemCount: 0,
  
  loading: false,
  success: false,
  error: null ,
  orderItems: []
};



export const cartReducer = createReducer(
  intalCartState,

  
on(addItemcartsAction.sucessAdded, (state, action) => {
  const data = action?.payload?.data;

  return {
    ...state,
    loading: false,
    success: true, 
    itemCount: state.itemCount + 1,
    orderItems: [
      ...(state.orderItems || []),
      data
    ]
  };
}),

on(getcartsAction.sucessGetCart, (state, action) => {

  const data = action?.payload?.data;
  const displayedDAta = data.items.filter( (item:any) => item.selected ==false )
  return {
    ...state,
    loading: false,
    success: true, 
    itemCount: displayedDAta.length,
    orderItems: displayedDAta
  };
}),


  on(clearCartAction.sucessClearCart, (state, action) => {
 
  return {
     error: null ,
    loading: false,
    success: true, 
    itemCount: 0,
    orderItems: []
  };
  }),




  on(removeItemAction.sucessRemoveItem, (state, action) => {
    
  console.log('action => ', action.payload)
  const data = action?.payload?.data?.dataValues; 
  const Items = state.orderItems.filter(item => item.id !== data.id);
  return {
    ...state,
    orderItems: Items
  };
  }),


  on( updateItemAction.sucessUpdateItem, (state, action) => {
    const data = action?.payload?.data; 
    const Items = state.orderItems.map(item => 
      item.id === data.id ? { ...item, ...data } : item
    );

    return {
    ...state,
    orderItems: Items
  };
  }),



    on( deleteBulkItemAction.sucessBulkDelItem, (state, action) => {

      console.log(action?.payload?.data)
    const data = action?.payload?.data?.cartItemIds; 
    const Items = state.orderItems.filter(item => !data.includes(item.id));

    return {
    ...state,
    orderItems: Items
  };
  }),



  on( bulkUpdateItemAction.bulkUpdateItem, (state, action) => {

      

    return {
    ...state,
    
  };
  }),





);
