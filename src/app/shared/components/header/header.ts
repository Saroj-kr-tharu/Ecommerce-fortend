import { Component, effect, ElementRef, HostListener, inject, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { HotToastService } from '@ngxpert/hot-toast';
import { LoginState } from '../../../core/models/auth.model';
import { CartState } from '../../../core/models/cart.model';
import { logoutAction, restoreSessionAction } from '../../../store/auth/auth.actions';
import { selectLogin } from '../../../store/auth/auth.selectors';
import { selectCart } from '../../../store/custumer/cus.selectors';
import { Searchbar } from "../searchbar/searchbar";


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Searchbar],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
   @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  
  isMobileMenuOpen = signal(false);
  loginState: Signal<LoginState>;
  cartState: Signal<CartState>;
  router = inject(Router)
  toast = inject(HotToastService)
  cartCount = signal(0);

  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isMobileMenuOpen()) {
      const menuEl = this.mobileMenu?.nativeElement;
      if (menuEl && !menuEl.contains(event.target)) {
        this.toggleMobileMenu();
      }
    }
  }

   constructor(
    private store: Store<{LoginReducer : LoginState }>, 

  
  ) {
          this.loginState = this.store.selectSignal(selectLogin);
          this.cartState = this.store.selectSignal(selectCart);
          
          effect( ()=> {
            this.cartState = this.store.selectSignal(selectCart);
             this.loginState = this.store.selectSignal(selectLogin);
          } );

    }

    ngOnInit(): void {
          const session = localStorage.getItem('marketManduAuth');

        if (session) {
            this.store.dispatch(restoreSessionAction.restoreSession({ payload:  JSON.parse(session)}));
            
        }
    }
   
getVisibleLinks() {
  if (this.loginState().isAdmin) {
    return [
      {text: 'Dashboard', to: '/admin/dashboard', },
      {text: 'Products', to: '/admin/products',  },
      {text: 'Users', to: '/admin/users',  },
      {text: 'Orders', to: '/admin/orders',  },
      {text: 'Logout', to: null, } 
    ];
  } else if (this.loginState().isLogin) {
    return [
      {text: 'Cart', to: '/cart',} , 
      {text: 'Checkout', to: '/checkout'},  
      {text: 'Logout', to: null},  
    ];
  } else {
    return [
      {text: 'Login', to: '/login' ,},
      {text: 'Register', to: '/signup' ,}
    ];
  }
}  
  
  
toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
}

logoutFn() {

  // console.log('click btn ')
        this.store.dispatch(  logoutAction.logout() );
  
}

}


