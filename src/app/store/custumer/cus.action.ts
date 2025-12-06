import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { addItemToCart, sucessType } from "../../core/models/cart.model";
import { loadProductType, sucessProductLoadType } from "../../core/models/product.model";


export const getAllProductsAction = createActionGroup({
    source: 'custumer getProdcutsAll api ',
    events: {   
        'load': props<{payload: loadProductType }>(), 
        'sucess loading': props <{payload: sucessProductLoadType  }> (),
        'failed loading': emptyProps
    }
})


export const addItemcartsAction = createActionGroup({
    source: 'cart addItem action state ',
    events: {   
        'add Item': props<{payload: addItemToCart }>(), 
        'sucess Added': props <{payload: sucessType  }> (),
        'failed To Added': emptyProps

    }
})

export const getcartsAction = createActionGroup({
    source: 'cart getItem action state ',
    events: {   
        'getCart': props <{payload: any  }> (), 
        'sucess getCart': props <{payload: sucessType  }> (),
        'failed To getCart': emptyProps

    }
})


export const clearCartAction = createActionGroup({
    source: ' clearCart action state ',
    events: {   
        'clearCart': props<{payload: any }>(), 
        'sucess clearCart': props <{payload: sucessType  }> (),
        'failed To clearCart': emptyProps

    }
})



export const removeItemAction = createActionGroup({
    source: 'cart removeItem action state ',
    events: {   
        ' removeItem': props<{payload: any }>(), 
        'sucess removeItem': props <{payload: sucessType  }> (),
        'failed To removeItem': emptyProps

    }
})



export const updateItemAction = createActionGroup({
    source: 'cart addItem action state ',
    events: {   
        'updateItem': props<{payload: any }>(), 
        'sucess updateItem': props <{payload: sucessType  }> (),
        'failed To updateItem': emptyProps

    }
})

export const deleteBulkItemAction = createActionGroup({
    source: 'cart  deleteBulkI action state ',
    events: {   
        'delete BulkItem': props<{payload: any }>(), 
        'sucess BulkDelItem': props <{payload: sucessType  }> (),
        'failed  BulkDelete': emptyProps

    }
})


export const bulkUpdateItemAction = createActionGroup({
    source: 'cart  bulkUpdateItem action state ',
    events: {   
        'bulkUpdateItem': props<{payload: any }>(), 
        'sucess bulkUpdateItem': props <{payload: sucessType  }> (),
        'failed  bulkUpdateItem': emptyProps

    }
})