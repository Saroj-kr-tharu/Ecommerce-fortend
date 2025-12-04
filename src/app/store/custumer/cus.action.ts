import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CartItem, CartState } from "../../core/models/cart.model";
import { loadProductType, sucessProductLoadType } from "../../core/models/product.model";


export const getAllProductsAction = createActionGroup({
    source: 'custumer getProdcutsAll api ',
    events: {   
        'load': props<{payload: loadProductType }>(), 
        'sucess loading': props <{payload: sucessProductLoadType  }> (),
        'failed loading': emptyProps
    }
})


export const cartsAction = createActionGroup({
    source: 'cart action state ',
    events: {   
        'setCart': props<{payload: CartState }>(), 
        'addItem': props<{payload: CartItem }>(), 
        'removeItem': props<{payload: CartItem }>(), 
        'updateQuantity': props<{payload: CartItem[] }>(), 

    }
})