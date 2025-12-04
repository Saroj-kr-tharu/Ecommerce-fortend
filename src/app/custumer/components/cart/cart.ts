import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, inject, OnInit, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HotToastService } from '@ngxpert/hot-toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { CartItem, CartState } from '../../../core/models/cart.model';
import { cartsAction } from '../../../store/custumer/cus.action';
import { selectCart } from '../../../store/custumer/cus.selectors';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CheckboxModule, FormsModule, ButtonModule, DividerModule, CurrencyPipe,ConfirmDialog],
  providers: [ConfirmationService, MessageService],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems = signal<CartItem[]>([]);
  cartStates: Signal<CartState>;
  selectedItems = signal<Set<number>>(new Set());
  toast = inject(HotToastService)
  router = inject(Router)


subtotal = computed(() => {
    const selected = this.selectedItems();
    if (selected.size === 0) {
      return 0 
    }
   
    return this.cartItems()
      .filter(item => selected.has(item.id))
      .reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
  });


   totalItems = computed(() => {
    const selected = this.selectedItems();
    if (selected.size === 0) {
     
      return this.cartItems().reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);
    }

    return this.cartItems()
      .filter(item => selected.has(item.id))
      .reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);
  });

  
  selectAll = computed(() => {
    const items = this.cartItems();
    const selected = this.selectedItems();
    return items.length > 0 && selected.size === items.length;
  });


  additionInfo = [
    {title:'Secure Checkout', logo: 'pi-shield'},
    {title:'Free shipping on orders over Rs. 2000', logo: 'pi-truck'},
    {title:'Easy returns within 7 days', logo: 'pi-replay'},
  ]

  constructor(private store: Store<{ CartReducer: CartState }>) {
    this.cartStates = this.store.selectSignal(selectCart);

    effect(() => {
      const stateItems = this.cartStates().orderItems;

      this.cartItems.set(stateItems);
    });
  }

  ngOnInit(): void {
    const stateItems = this.cartStates().orderItems;

    if (stateItems.length == 0) {
      const localdata = localStorage.getItem('Cart');

      const data = JSON.parse(localdata || 'null');
      // console.log('data => ', data)
      this.store.dispatch(cartsAction.setCart({ payload: data }));
    }
  }



  increment(itemId: number): void {
    const items = this.cartItems();
    const updatedItems = items.map(item => 
      item.id === itemId 
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    // console.log('updated items => ', updatedItems)
    this.store.dispatch(cartsAction.updateQuantity({ payload: updatedItems }));

    this.toast.success('Quantity increase ');
  }

 
  decrement(itemId: number): void {
    const items = this.cartItems();
    const updatedItems = items.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    // console.log('udpate item => ', updatedItems)
    this.store.dispatch(cartsAction.updateQuantity({ payload: updatedItems }));
    this.toast.success('Quantity decrease ');
  }


  removeItem(itemId: number): void {
    const items = this.cartItems();
    const updatedItems = items.filter(item => item.id !== itemId);
    
    this.store.dispatch(cartsAction.updateQuantity({ payload: updatedItems }));
    this.toast.success('Delete Items ');
    

    const selected = this.selectedItems();
    if (selected.has(itemId)) {
      selected.delete(itemId);
      this.selectedItems.set(new Set(selected));
    }
  }

  // Add item to wishlist
  addToWishlist(itemId: number): void {
    
    // console.log('Add to wishlist:', itemId);
    
  }


  // Toggle item selection
 toggleItemSelection(itemId: number): void {
    const selected = new Set(this.selectedItems());
    
    if (selected.has(itemId)) {
      selected.delete(itemId);
    } else {
      selected.add(itemId);
    }
    
    this.selectedItems.set(selected);
  }

  // Toggle select all
toggleSelectAll(): void {
    const items = this.cartItems();
    
    if (this.selectAll()) {
      // Deselect all
      this.selectedItems.set(new Set());
    } else {
      // Select all
      const allIds = items.map(item => item.id);
      this.selectedItems.set(new Set(allIds));
    }
  }

  // Check if item is selected
  isItemSelected(itemId: number): boolean {
    return this.selectedItems().has(itemId);
  }



  // Delete selected items
  deleteSelected(): void {
    if (this.selectedItems().size === 0) return;
    
    const items = this.cartItems();
    const selected = this.selectedItems();
    const updatedItems = items.filter(item => !selected.has(item.id));
    
    this.store.dispatch(cartsAction.updateQuantity({ payload: updatedItems }));
    this.selectedItems.set(new Set());
  }

  


  // Navigate to checkout
  proceedToCheckout(): void {
    if (this.cartItems().length === 0) return;
    
    // Implement checkout navigation
    // console.log('Proceed to checkout');
    // this.router.navigate(['/checkout']);
  }



  // Continue shopping (go back to products)
  continueShopping(): void {
    
    this.router.navigate(['/']);
  }

  // Get selected items count
  getSelectedCount(): number {
    return this.selectedItems().size;
  }

  // Check if delete button should be disabled
  isDeleteDisabled(): boolean {
    return this.selectedItems().size === 0;
  }

  // Check if checkout button should be disabled
  isCheckoutDisabled(): boolean {
    return this.cartItems().length === 0;
  }



}
