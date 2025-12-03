import { Component, effect, OnInit, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { CartItem, CartState } from '../../../core/models/cart.model';
import { cartsAction } from '../../../store/custumer/cus.action';
import { selectCart } from '../../../store/custumer/cus.selectors';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CheckboxModule, FormsModule, ButtonModule, DividerModule
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems = signal<CartItem[]>([]);
  cartStates: Signal<CartState>;
 


  constructor(private store: Store<{ CartReducer: CartState }>) {
    this.cartStates = this.store.selectSignal(selectCart);

    effect( ()=> {
       const stateItems = this.cartStates().orderItems;

       this.cartItems.set(stateItems);

       
    } )
  }

  ngOnInit(): void {
    const stateItems = this.cartStates().orderItems;

    if(stateItems.length == 0 ){
      const localdata = localStorage.getItem('Cart');

      const data = JSON.parse(localdata || 'null');
      // console.log('data => ', data)
      this.store.dispatch(cartsAction.setCart({payload: data}))
    }
    
    }
   

    
  }

