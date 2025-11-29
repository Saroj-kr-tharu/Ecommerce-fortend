import { Routes } from '@angular/router';

export const routes: Routes = [
    // {
    //     path:'',
    //     pathMatch:'full',
    //     loadComponent: () => {
    //         return import('./Pages/homecomponent/homecomponent').then( (m) => m.Homecomponent )
    //     }
    // }, 
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
];
