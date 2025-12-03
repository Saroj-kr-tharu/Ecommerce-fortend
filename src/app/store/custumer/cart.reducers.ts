import { createReducer, on } from "@ngrx/store";
import { CartState } from "../../core/models/cart.model";
import { cartsAction } from "./cus.action";


// cart Reducer here 
const intalCartState: CartState = {
    itemCount: 0,
    loading: false, 
    orderItems: [], 
    subtotal: 0, 
    total: 0, 
    userId: null, 
    billingAddress: null,
    paymentMethod: null, 
    shippingAddress: null ,
    
}

function calculateTotals(state: CartState): CartState {
    const subtotal = state.orderItems.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    const itemCount = state.orderItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const total = Number(subtotal.toFixed(3));

    localStorage.setItem('Cart', JSON.stringify({ ...state,
        subtotal,
        itemCount,
        total}))

    return {
        ...state,
        subtotal,
        itemCount,
        total
    };
}

export const cartReducer = createReducer(
    intalCartState,
    on(cartsAction.addItem, (state, { payload: item }) => {
        

        const quantityToAdd = (item && typeof item.quantity === 'number' && item.quantity > 0)
            ? item.quantity
            : 1;

        const existingItem = state.orderItems.find(it => it.id === item.id);

        const updatedItems = existingItem
            ? state.orderItems.map(it =>
                it.id === item.id
                    ? { ...it, quantity: it.quantity + quantityToAdd }
                    : it
              )
            : [...state.orderItems, { ...item, quantity: quantityToAdd }];

        return calculateTotals({
            ...state,
            orderItems: updatedItems,
        });
    }),


    on(cartsAction.increaseQuantity, (state, { payload: item }) => {
        

        const existingItem = state.orderItems.find(it => it.id === item.id);

        const updatedItems = existingItem
            ? state.orderItems.map(it =>
                it.id === item.id
                    ? { ...it, quantity: it.quantity + 1 }
                    : it
              )
            : [...state.orderItems, { ...item, quantity: 1 }];

        return calculateTotals({
            ...state,
            orderItems: updatedItems,
        });
    }),


    on(cartsAction.decreaseQuantity, (state, { payload: item }) => {
        

        const existingItem = state.orderItems.find(it => it.id === item.id);

        const updatedItems = existingItem
            ? state.orderItems.map(it =>
                it.id === item.id
                    ? { ...it, quantity: it.quantity - 1 }
                    : it
              )
            : [...state.orderItems, { ...item, quantity: 1 }];

        return calculateTotals({
            ...state,
            orderItems: updatedItems,
        });
    }),

     on(cartsAction.setCart, (state, { payload: item }) => ({
        ...state,
        orderItems: item.orderItems
     }) ),



);