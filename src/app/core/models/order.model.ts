import { CartItem } from "./cart.model";


 export interface  orderSummary  {
      seletectItem: CartItem[]
      subtotal: number | null ,
      total: number | null ,
      itemCount: number | null ,
      shippingFee: number | null ,
    
    }