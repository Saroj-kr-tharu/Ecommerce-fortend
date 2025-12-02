import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { loadProductType, ProductType } from "../../core/models/product.model";


export const getAllProductsAction = createActionGroup({
    source: 'custumer getProdcutsAll api ',
    events: {   
        'load': props<{payload: loadProductType }>(), 
        'sucess loading': props <{payload: ProductType[]  }> (),
        'failed loading': emptyProps
    }
})