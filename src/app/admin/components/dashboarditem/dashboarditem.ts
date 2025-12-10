import { isPlatformBrowser } from '@angular/common';
import { Component, effect, inject, OnInit, PLATFORM_ID, signal, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartModule } from 'primeng/chart';
import { Divider } from 'primeng/divider';
import { DashboardState } from '../../../core/models/dashboard.model';
import { ProductType } from '../../../core/models/product.model';
import { Cardbanner } from "../../../shared/components/cardbanner/cardbanner";
import { DashboardActions } from '../../../store/admin/admin.actions';
import {
    selectAverageOrderValue,
    selectCancelledOrders,
    selectConfirmedOrders,
    selectConfirmedPayment,
    selectFailedPayment,
    selectOrders,
    selectPendingPayment,
    selectPendingRevenue,
    selectProducts,
    selectTotalOrders,
    selectTotalProducts,
    selectTotalRevenue,
    selectTotalSales,
    selectTotalUsers
} from '../../../store/admin/admin.selectors';

@Component({
  selector: 'app-dashboarditem',
  imports: [Cardbanner, Divider, ChartModule],
  templateUrl: './dashboarditem.html',
  styleUrl: './dashboarditem.css',
})
export class Dashboarditem implements OnInit {

  linedata: any;
  lineoptions: any;
  piedata: any;
  pieoptions: any;

  platformId = inject(PLATFORM_ID);
  private store = inject(Store<{ DashboardReducer: DashboardState }>);

  // Use selectSignal for direct values
  totalUsers: Signal<number>;
  totalProducts: Signal<number>;
  totalOrders: Signal<number>;
  confirmedOrders: Signal<number>;
  cancelledOrders: Signal<number>;
  pendingPayment: Signal<number>;
  confirmedPayment: Signal<number>;
  failedPayment: Signal<number>;
  totalRevenue: Signal<number>;
  pendingRevenue: Signal<number>;
  averageOrderValue: Signal<number>;
  totalSales: Signal<number>;

  
  // Use selectSignal for arrays
  products: Signal<ProductType[]>;
  orders: Signal<any[]>;

  // Computed banner items that update automatically
  bannerItems = signal<any[]>([]);

  constructor() {
    // Initialize all signals from store
    this.totalUsers = this.store.selectSignal(selectTotalUsers);
    this.totalProducts = this.store.selectSignal(selectTotalProducts);
    this.totalOrders = this.store.selectSignal(selectTotalOrders);
    this.confirmedOrders = this.store.selectSignal(selectConfirmedOrders);
    this.cancelledOrders = this.store.selectSignal(selectCancelledOrders);
    this.pendingPayment = this.store.selectSignal(selectPendingPayment);
    this.confirmedPayment = this.store.selectSignal(selectConfirmedPayment);
    this.failedPayment = this.store.selectSignal(selectFailedPayment);
    this.totalRevenue = this.store.selectSignal(selectTotalRevenue);
    this.pendingRevenue = this.store.selectSignal(selectPendingRevenue);
    this.averageOrderValue = this.store.selectSignal(selectAverageOrderValue);
    this.totalSales = this.store.selectSignal(selectTotalSales);
    this.products = this.store.selectSignal(selectProducts);
    this.orders = this.store.selectSignal(selectOrders);

    // Effect to update banner items when values change
    effect(() => {
    this.bannerItems.set([
        { title: "Total Revenue", value: this.totalRevenue(), icon: "pi pi-dollar", pipe: 'currency' },
        { title: "Total Sales", value: this.totalSales(), icon: "pi pi-chart-line", pipe: 'currency' },
        { title: "Average Order Value", value: this.averageOrderValue(), icon: "pi pi-chart-bar", pipe: 'currency' },
        { title: "Pending Revenue", value: this.pendingRevenue(), icon: "pi pi-hourglass", pipe: 'currency' },
      { title: "Total Users", value: this.totalUsers(), icon: "pi pi-users" },
      { title: "Total Products", value: this.totalProducts(), icon: "pi pi-shopping-bag" },
      { title: "Total Orders", value: this.totalOrders(), icon: "pi pi-shopping-cart" },
      { title: "Confirmed Orders", value: this.confirmedOrders(), icon: "pi pi-check-circle" },
      { title: "Cancelled Orders", value: this.cancelledOrders(), icon: "pi pi-times-circle" },
      { title: "Pending Payment", value: this.pendingPayment(), icon: "pi pi-clock" },
      { title: "Confirmed Payment", value: this.confirmedPayment(), icon: "pi pi-check" },
      { title: "Failed Payment", value: this.failedPayment(), icon: "pi pi-exclamation-triangle" },
  
    ]);

      
     
    });
  }

  ngOnInit() {
    // Dispatch load action first
    this.store.dispatch(DashboardActions.load());
    
    this.lineChart();
    this.pieChart();
  }

  lineChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.linedata = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Orders',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--p-cyan-500')
          },
          {
            label: 'Users',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderDash: [5, 5],
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--p-orange-500')
          },
          {
            label: 'Products',
            data: [12, 51, 62, 33, 21, 62, 45],
            fill: true,
            borderColor: documentStyle.getPropertyValue('--p-gray-500'),
            tension: 0.4,
            backgroundColor: 'rgba(107, 114, 128, 0.2)'
          }
        ]
      };

      this.lineoptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };
    }
  }

  pieChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.piedata = {
        labels: ['Confirmed', 'Cancelled', 'Pending'],
        datasets: [
          {
            data: [
              this.confirmedOrders(),
              this.cancelledOrders(),
              this.totalOrders() - this.confirmedOrders() - this.cancelledOrders()
            ],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-cyan-500'),
              documentStyle.getPropertyValue('--p-orange-500'),
              documentStyle.getPropertyValue('--p-gray-500')
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--p-cyan-400'),
              documentStyle.getPropertyValue('--p-orange-400'),
              documentStyle.getPropertyValue('--p-gray-400')
            ]
          }
        ]
      };

      this.pieoptions = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
    }
  }


}