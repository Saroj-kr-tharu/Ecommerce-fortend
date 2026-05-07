import { DatePipe, DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CusServices } from '../../../core/services/custumer/cus.services';

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
  selector: 'app-orders',
  standalone: true,
  imports: [NgClass, TitleCasePipe, DatePipe,  DecimalPipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit, OnDestroy {

  route       = inject(ActivatedRoute);
  cusService  = inject(CusServices);
  router      = inject(Router);

  //  Signals 
  orders    = signal<OrderType[]>([]);
  isLoading = signal<boolean>(false);
  error     = signal<string | null>(null);

  //  IntersectionObserver 
  private observer: IntersectionObserver | null = null;

  //  Lifecycle 
  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) this.loadOrders(userId);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  //  Data 
  private loadOrders(id: string): void {
    this.isLoading.set(true);
    this.error.set(null); 

    this.cusService.GetAllOrdersByUserId(id).subscribe({
      next: (res: any) => {
        const data: OrderType[] = Array.isArray(res?.data) ? res.data : [];
        this.orders.set(data);
        this.isLoading.set(false);

        if (data.length > 0) {
          setTimeout(() => this.initObserver(), 0);
        }
      },
      error: () => {
        this.error.set('Failed to load orders');
        this.isLoading.set(false);
      }
    });
  }


  private initObserver(): void {
    this.observer?.disconnect();

    const cards = document.querySelectorAll('.chart-card');
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => {
      card.classList.remove('visible');
      this.observer!.observe(card);
    });
  }

  
  viewOrder(order: any): void {
    // console.log("orderId ", order.orderNumber);
    this.router.navigate([`/Ordersdetail/${order.orderNumber}`, ]);
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }
}