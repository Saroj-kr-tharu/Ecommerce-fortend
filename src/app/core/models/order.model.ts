

 export interface  orderSummary  {
      seletectItem: any,
      subtotal: number | null ,
      total: number | null ,
      itemCount: number | null ,
      shippingFee: number | null ,
    
    }



export interface OrderAddress {
  zip: string | null;
  city: string | null;
  street: string | null;
  country: string | null;
}

export interface OrderUser {
  id: number;
  username: string;
  email: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  Product: {
    id: number;
    name: string;
    price: number;
    stock: number;
  }
}

export interface Order {
  id: number;
  userId: number;
  orderNumber: string;
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;

  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;

  deliveredAt: string | null;
  cancelledAt: string | null;

  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  user: OrderUser;
  OrderItems: OrderItem[];
}



export interface FormattedOrderItem {
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface FormattedOrder {
  id: string;
  user: string | null;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  items: FormattedOrderItem[];
  shippingAddress: string | null;
  delivered: string | null;
  cancelled: string | null;
  created: string | null;
  isActive: boolean,
  itemslength ?: number ,
  itemId ?: number ,
}
