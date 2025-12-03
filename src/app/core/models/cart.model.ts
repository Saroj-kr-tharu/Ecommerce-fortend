export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  selected:boolean;
  brand:string;
  category:string;
}


export type paymentType  = 'ESEWA' | 'KHALTI' | 'STRIPE' | 'CARD'



export interface CartState {
  userId: number | null ;
  orderItems: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;
  paymentMethod?: paymentType | null ; 
  loading: boolean;
 

  shippingAddress?: {
    street: string;
    city: string;
    zip: string;
    country: string;
  } | null;

  billingAddress?: {
    street: string;
    city: string;
    zip: string;
    country: string;
  } | null;
 
}