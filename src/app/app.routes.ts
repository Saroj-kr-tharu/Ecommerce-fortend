import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        loadComponent: () => {
            return import('./custumer/components/cus.home/cus.home').then( (m) => m.CusHome )
        }
    }, 
     
    {
        path: 'product/:id/:slug',
        pathMatch:'full',
        loadComponent: () => {
            return import('./custumer/components/productdetails/productdetails').then( (m) => m.Productdetails )
        }
    }, 
    {
        path: 'search',
        pathMatch:'full',
        loadComponent: () => {
            return import('./custumer/components/search.component/search.component').then( (m) => m.SearchComponent )
        }
    }, 
    {
        path:'login',
        loadComponent: () => {
            return import('./auth/components/login.component/login.component').then( (m) => 
            m.LoginComponent  )
        }
    },
    {
        path:'signup',
        loadComponent: () => {
            return import('./auth/components/register.component/register.component').then( (m) => 
            m.RegisterComponent  )
        }
    },
    {
        path:'checkout',
        canActivate:[authGuard,],
        loadComponent: () => {
            return import('./custumer/components/checkout/checkout').then( (m) => 
                m.Checkout  )
        }
    },
   
    {
        path:'ordersuccess',
        canActivate:[authGuard,],
        loadComponent: () => {
            return import('./custumer/components/order-success/order-success').then( (m) => 
                m.OrderSuccess  )
        }
    },
    {
        path:'cart',
        canActivate:[authGuard],
        loadComponent: () => {
            return import('./custumer/components/cart/cart').then( (m) => 
            m.Cart  )
        }
    },
    {
        path:'Orders/:id',
        canActivate:[authGuard],
        loadComponent: () => {
            return import('./custumer/components/orders/orders').then( (m) => 
            m.Orders  )
        }
    },
    {
        path:'Ordersdetail/:id',
        canActivate:[authGuard],
        loadComponent: () => {
            return import('./custumer/components/orderdetails/orderdetails').then( (m) => 
            m.Orderdetails  )
        }
    },
    {
        path:'admin',
        canActivateChild:[adminGuard],
        children: [

            {path: 'dashboard', 
                loadComponent: () => {
                    return import('./admin/components/dashboard/dashboard').then( (m) => 
                    m.Dashboard  )
                }
            },
            {path: 'products', 
                loadComponent: () => {
                    return import('./admin/components/products/products').then( (m) => 
                    m.Products  )
                }
            },
            {path: 'orders', 
                loadComponent: () => {
                    return import('./admin/components/orders/orders').then( (m) => 
                    m.Orders  )
                }
            },
            {path: 'orders/:id', 
                loadComponent: () => {
                    return import('./admin/components/ordersdetails/ordersdetails').then( (m) => 
                    m.Ordersdetails  )
                }
            },
            
            {path: 'user/:id', 
                loadComponent: () => {
                    return import('./admin/components/userdetails/userdetails').then( (m) => 
                    m.Userdetails  )
                }
            },
        ]
    },


    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },




    
];
