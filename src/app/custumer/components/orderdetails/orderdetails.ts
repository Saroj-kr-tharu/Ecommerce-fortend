import { DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginState } from '../../../core/models/auth.model';
import { CusServices } from '../../../core/services/custumer/cus.services';
import { selectLogin } from '../../../store/auth/auth.selectors';



export interface OrderProduct {
  id: number;
  name: string;
  price: string;
  stock: number;
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
  Product: OrderProduct;
}

export interface OrderAddress {
  street: string;
  city: string;
  zip: string;
  country: string;
}

export interface OrderUser {
  id: string;
  username: string;
  email: string;
}

export interface OrderType {
  id: number;
  userId: string;
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

@Component({
  selector: 'app-orderdetails',
  imports: [NgClass, TitleCasePipe, DecimalPipe],
  templateUrl: './orderdetails.html',
  styleUrl: './orderdetails.css',
})
export class Orderdetails {
  
  route = inject(ActivatedRoute);
  cusService = inject(CusServices);
  router = inject(Router)

  orderSignal = signal<OrderType | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  loginState: Signal<LoginState>;

  // Date helpers 
  formatDate = (dateStr: string | null, withTime = false) => {
    if (!dateStr) return null;
    const opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    if (withTime) { opts.hour = '2-digit'; opts.minute = '2-digit'; }
    return new Date(dateStr).toLocaleDateString('en-US', opts);
  };

  createdDate   = computed(() => this.formatDate(this.orderSignal()?.createdAt ?? null, true) ?? '—');
  updatedDate   = computed(() => this.formatDate(this.orderSignal()?.updatedAt ?? null, true) ?? '—');
  deliveredDate = computed(() => this.formatDate(this.orderSignal()?.deliveredAt ?? null));
  cancelledDate = computed(() => this.formatDate(this.orderSignal()?.cancelledAt ?? null));

  // Currency helpers 
  fmt = (n: number) => new Intl.NumberFormat('en-NP', { 
    style: 'currency', 
    currency: 'NPR' 
  }).format(n);

  formattedTotal    = computed(() => this.fmt(this.orderSignal()?.totalAmount ?? 0));
  formattedSubtotal = computed(() => this.fmt(this.orderSignal()?.subtotal ?? 0));
  formattedTax      = computed(() => this.fmt(this.orderSignal()?.tax ?? 0));
  formattedShipping = computed(() => this.fmt(this.orderSignal()?.shippingFee ?? 0));
  formattedDiscount = computed(() => this.fmt(this.orderSignal()?.discount ?? 0));

  // Address helpers 
  formatAddress = (addr: OrderAddress | undefined) => {
    if (!addr) return 'Not provided';
    const parts = [addr.street, addr.city, addr.zip, addr.country].filter(p => p?.trim());
    return parts.length ? parts.join(', ') : 'Not provided';
  };

  shippingAddress = computed(() => this.formatAddress(this.orderSignal()?.shippingAddress));
  billingAddress  = computed(() => this.formatAddress(this.orderSignal()?.billingAddress));

  //  Status helpers 
  statusActive = computed(() => this.orderSignal()?.isActive === true);
  statusLabel  = computed(() => this.statusActive() ? 'Active' : 'Inactive');

  paymentClass = computed(() => {
    const s = this.orderSignal()?.paymentStatus?.toLowerCase();
    if (s === 'paid')    return 'bg-emerald-100 text-emerald-700';
    if (s === 'pending') return 'bg-amber-100 text-amber-700';
    return 'bg-rose-100 text-rose-600';
  });

  orderStatusClass = computed(() => {
    const s = this.orderSignal()?.orderStatus?.toLowerCase();
    if (s === 'confirmed') return 'bg-blue-100 text-blue-700';
    if (s === 'delivered') return 'bg-emerald-100 text-emerald-700';
    if (s === 'cancelled') return 'bg-rose-100 text-rose-600';
    if (s === 'pending')   return 'bg-amber-100 text-amber-700';
    return 'bg-slate-100 text-slate-600';
  });

  paymentIcon = computed(() => {
    const s = this.orderSignal()?.paymentStatus?.toLowerCase();
    if (s === 'paid')    return 'pi-check-circle';
    if (s === 'pending') return 'pi-hourglass';
    return 'pi-times-circle';
  });

  orderStatusIcon = computed(() => {
    const s = this.orderSignal()?.orderStatus?.toLowerCase();
    if (s === 'confirmed') return 'pi-check';
    if (s === 'delivered') return 'pi-truck';
    if (s === 'cancelled') return 'pi-ban';
    return 'pi-clock';
  });

  constructor( private store: Store<{LoginReducer : LoginState }>, ) {
          this.loginState = this.store.selectSignal(selectLogin); 
          effect( ()=> {
            this.loginState = this.store.selectSignal(selectLogin);
          } );

    }


  // Lifecycle  
  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    const userId = this.loginState().users?.id;
    // console.log("id => ", orderId)
    if (orderId && userId !== undefined) {
      this.loadOrder(orderId,userId);
    }
  }

   ngAfterViewInit() {
    const cards = document.querySelectorAll('.chart-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    cards.forEach(card => observer.observe(card));
  }

  navigateToProduct(product: any) {
    this.router.navigate(['/product', product.id, product.name]);
  }

  navigateToUser(user: any) {
  }

  private loadOrder(id: any, userId:any ): void {
    this.isLoading.set(true);
    this.error.set(null);
     console.log('orderNo => ', id, " UserId => ", userId)
    this.cusService.GetOrdersByUserIdAndOrderNo(userId, id).subscribe({
      next: (res: any) => {
        this.orderSignal.set(res?.data ?? null);
        console.log("Order signal ", this.orderSignal())
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Failed to load order');
        this.isLoading.set(false);
      }
    });
  } 

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
  }
}
