export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images?: string[];
  selected:boolean;
  brand:string;
  category:string;

}


export type paymentType  = 'ESEWA' | 'KHALTI' | 'STRIPE' | 'CARD'



export interface CartState {

  loading: boolean;
  success: boolean; 
  error: string | null ; 
  orderItems: CartItem[];
  itemCount: number;
 
}


export interface addItemToCart {
  userId: number , 
  productId: number , 
  quantity: number , 
  price: number 
}

export interface updateItemCart {
  cartItemId: number , 
  quantity?: number , 
  selected?: number 
}

export interface sucessType{
    message?: string,
    success?: boolean,
    data?: any
    err?: any
}