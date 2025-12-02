import { createReducer, on } from "@ngrx/store";
import { loadProductInitalType } from "../../core/models/product.model";
import { getAllProductsAction } from "./cus.action";



const productIntialState: loadProductInitalType = {
    loading: false,
    error: null,
    success: false,
    data: [] 
};


export const getProductReducer = createReducer(
    productIntialState, 
    on(getAllProductsAction.load,  (state) => ({
            ...state,
            loading: true,
            error: null,
            success: false,
             data: []
    })),



        on(getAllProductsAction.sucessLoading, (state, action) => ({
            ...state,
            loading: false,
            error: null,
            success: true,
            data: action.payload   
            })),


     on(getAllProductsAction.failedLoading,  (state, action) => ({
            ...state,
            loading: false,
            error: 'error occered' ,
            success: false,
             data: []
    })),


    
)