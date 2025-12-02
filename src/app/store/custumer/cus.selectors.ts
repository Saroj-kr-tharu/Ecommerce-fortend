 import { createFeatureSelector } from "@ngrx/store";
import { loadProductInitalType } from "../../core/models/product.model";
 
 
 export const selectGetAllProduct = createFeatureSelector <loadProductInitalType> ('GetAllProductsReducer', );
 
 