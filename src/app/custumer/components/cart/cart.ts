import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
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
import { CusServices } from '../../../core/services/custumer/cus.services';
import { bulkUpdateItemAction, deleteBulkItemAction, getcartsAction, removeItemAction, updateItemAction } from '../../../store/custumer/cus.action';
import { selectCart } from '../../../store/custumer/cus.selectors';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CheckboxModule, FormsModule, ButtonModule, DividerModule, CurrencyPipe, ConfirmDialog],
  providers: [ConfirmationService, MessageService],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart  {
  cartItems = signal<any[]>([]);
  cartStates: Signal<CartState>;
  selectedItems = signal<Set<number>>(new Set());
  toast = inject(HotToastService);
  router = inject(Router);
  cusService = inject(CusServices);

  subtotal = computed(() => {
    const selected = this.selectedItems();
    if (selected.size === 0) {
      return 0;
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
    { title: 'Secure Checkout', logo: 'pi-shield' },
    { title: 'Free shipping on orders over Rs. 2000', logo: 'pi-truck' },
    { title: 'Easy returns within 7 days', logo: 'pi-replay' },
  ];

  constructor(private store: Store<{ cartReducer: CartState }>) {
    this.cartStates = this.store.selectSignal(selectCart);

    const localStr = localStorage.getItem('marketManduAuth');
    let local: { id?: number } | null = null;

    local = localStr ? JSON.parse(localStr) : null;

    if (local && local.id) {
      let user = { userId: local.id };
      this.store.dispatch(getcartsAction.getCart({ payload: user }));
    }

    effect(() => {
      const stateItems = this.cartStates().orderItems;
      console.log('Cart items updated => ', stateItems);
      this.cartItems.set(stateItems);
    });
  }



  increment(itemId: number): void {
     const item = this.cartItems().find(item => item.id === itemId);
    let quan = item ? item.quantity : 0;
    let daa = {
        cartItemId: itemId , 
        quantity: quan + 1  , 
      }
   
    this.store.dispatch(updateItemAction.updateItem({ payload: daa }));
    
  }

  decrement(itemId: number): void {

    const item = this.cartItems().find(item => item.id === itemId);
    let quan = item ? item.quantity : 0;

      // console.log('itemid => decrement ' ,itemId)
      let daa = {
        cartItemId: itemId , 
        quantity: quan - 1  , 
      }

      this.store.dispatch(updateItemAction.updateItem({payload: daa }))
  }


  removeItem(itemId: number): void {
  this.store.dispatch(removeItemAction.removeItem({ payload: itemId }));

}


deleteSelected(): void {
  const selected = this.selectedItems();
  if (selected.size === 0) return;

  console.log('selected =? ', selected)

  // Store all selected item IDs in an array
  const selectedItemIds = Array.from(selected);
  console.log('Selected item IDs:', selectedItemIds);

  this.store.dispatch(deleteBulkItemAction.deleteBulkItem({payload:selectedItemIds }))


}

  addToWishlist(itemId: number): void {
    console.log('Add to wishlist:', itemId);
    // Implement wishlist functionality
  }

  toggleItemSelection(itemId: number): void {
    const selected = new Set(this.selectedItems());

    if (selected.has(itemId)) {
      selected.delete(itemId);
    } else {
      selected.add(itemId);
    }

    this.selectedItems.set(selected);
  }

  toggleSelectAll(): void {
    const items = this.cartItems();

    if (this.selectAll()) {
      this.selectedItems.set(new Set());
    } else {
      const allIds = items.map(item => item.id);
      this.selectedItems.set(new Set(allIds));
    }
  }

  isItemSelected(itemId: number): boolean {
    return this.selectedItems().has(itemId);
  }



  getSelectedCartItems(): CartItem[] {
    const selectedIds = this.selectedItems();
    return this.cartItems().filter(item => selectedIds.has(item.id));
  }

  proceedToCheckout(): void {
    if (this.selectedItems().size === 0) {
      this.toast.error('Please select items to checkout');
      return;
    }

  const selected = this.selectedItems();
  const selectedCartItems = this.cartItems()
    .filter(item => selected.has(item.id))
    .map(item => ({
      cartItemId: item.id,
      quantity: item.quantity,
      selected: true
    }));
  console.log('Selected cart items:', selectedCartItems);

  this.store.dispatch(bulkUpdateItemAction.bulkUpdateItem({payload:selectedCartItems }))
    

    

   

    
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }

  getSelectedCount(): number {
    return this.selectedItems().size;
  }

  isDeleteDisabled(): boolean {
    return this.selectedItems().size === 0;
  }

  isCheckoutDisabled(): boolean {
    return this.selectedItems().size === 0;
  }
}