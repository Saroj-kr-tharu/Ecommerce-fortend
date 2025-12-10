import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DividerModule } from 'primeng/divider';
import { LoginState } from '../../../core/models/auth.model';
import { logoutAction } from '../../../store/auth/auth.actions';
import { Dashboarditem } from "../dashboarditem/dashboarditem";
import { Orders } from "../orders/orders";
import { Products } from "../products/products";
import { Users } from "../users/users";

@Component({
  selector: 'app-dashboard',
  imports: [DividerModule, Products, Users, Orders, Dashboarditem],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard { 
    isMobileMenuOpen = false;
  currentView = 'dashboard';

  constructor(private store: Store<{LoginReducer : LoginState }>){
    
  } 
  

  menuItems = [
    { label: 'Dashboard', icon: 'pi pi-th-large', component: 'dashboard', active: true },
    { label: 'Users', icon: 'pi pi-users', component: 'users', active: false },
    { label: 'Products', icon: 'pi pi-shopping-bag', component: 'products', active: false },
    { label: 'Orders', icon: 'pi pi-shopping-cart', component: 'orders', active: false },
  ];

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  navigateTo(item:any): void {
    this.menuItems.forEach(menuItem => menuItem.active = false);
    item.active = true;
    this.currentView = item.component;
    this.isMobileMenuOpen = false;
  }

  logout(): void {
    console.log('Logout clicked');
    // Implement logout logic here

    this.store.dispatch(  logoutAction.logout() );
  }
}
