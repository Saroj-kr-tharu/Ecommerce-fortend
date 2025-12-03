 import { createFeatureSelector } from "@ngrx/store";
import { CartState } from "../../core/models/cart.model";
import { loadProductInitalType } from "../../core/models/product.model";
 
 
 export const selectGetAllProduct = createFeatureSelector <loadProductInitalType> ('GetAllProductsReducer', );

 export const selectCart = createFeatureSelector <CartState> ('CartReducer', );
 
 