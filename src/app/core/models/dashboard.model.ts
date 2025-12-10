import { sucessLoginType } from "./auth.model";
import { ProductType } from "./product.model";




export interface DashboardState {
  users: sucessLoginType[];
  products: ProductType[];
  orders: any[];
  loading: boolean;
  error: string | null;
}

export const initialDashboardState: DashboardState = {
  users: [],
  products: [],
  orders: [],
  loading: false,
  error: null
};