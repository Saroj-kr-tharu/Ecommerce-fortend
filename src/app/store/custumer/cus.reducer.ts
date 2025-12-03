import { createReducer, on } from "@ngrx/store";
import { loadProductInitalType } from "../../core/models/product.model";
import { getAllProductsAction } from "./cus.action";



const productIntialState: loadProductInitalType = {
    loading: false,
    error: null,
    success: false,
    totalRecords: 0,
    data: [] 
};




export const getProductReducer = createReducer(
    productIntialState, 
    on(getAllProductsAction.load,  (state) => ({
            ...state,
            loading: true,
            error: null,
            totalRecords: 0,
            success: false,
             data: []
    })),



        on(getAllProductsAction.sucessLoading, (state, action) => ({
            ...state,
            loading: false,
            error: null,
            success: true,
            totalRecords:action.payload?.count , 
            data: action.payload?.rows
            })),


     on(getAllProductsAction.failedLoading,  (state, action) => ({
            ...state,
            loading: false,
            error: 'error occered' ,
            totalRecords: 0,
            success: false,
             data: []
    })),


    
)

