import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, computed, effect, inject, OnInit, PLATFORM_ID, signal, Signal } from '@angular/core';
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
  selectDeliveredOrders,
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

  Paymentpiedata: any;

  salespiedata: any;

  Productpiedata: any;

  platformId = inject(PLATFORM_ID);
  private store = inject(Store<{ DashboardReducer: DashboardState }>);
  private cd = inject(ChangeDetectorRef)

  // Use selectSignal for direct values
  totalUsers: Signal<number>;
  totalProducts: Signal<number>;
  totalOrders: Signal<number>;
  confirmedOrders: Signal<number>;
  cancelledOrders: Signal<number>;
  DeliveredOrders: Signal<number>;
  pendingPayment: Signal<number>;
  confirmedPayment: Signal<number>;
  failedPayment: Signal<number>;
  totalRevenue: Signal<number>;
  pendingRevenue: Signal<number>;
  averageOrderValue: Signal<number>;
  totalSales: Signal<number>;

    // products 
    totalDelete = computed(() => this.products().filter(product => product.isActive === false).length);
    totalStockOut = computed(() => this.products().filter(product => product.stock === 0).length);
    totalStockIN = computed(() => this.products().filter(product => product.stock > 0).length);

  
  // Use selectSignal for arrays
  products: Signal<ProductType[]>;
  orders: Signal<any[]>;

  // Computed banner items that update automatically
  bannerItems = signal<any[]>([]);

  constructor() {
    // Initialize all signals from store
    this.totalUsers = this.store.selectSignal(selectTotalUsers);
    this.totalProducts = this.store.selectSignal(selectTotalProducts);
    // orders
    this.totalOrders = this.store.selectSignal(selectTotalOrders);
    this.confirmedOrders = this.store.selectSignal(selectConfirmedOrders);
    this.cancelledOrders = this.store.selectSignal(selectCancelledOrders);
    this.DeliveredOrders = this.store.selectSignal(selectDeliveredOrders);

    // payment 
    this.pendingPayment = this.store.selectSignal(selectPendingPayment);
    this.confirmedPayment = this.store.selectSignal(selectConfirmedPayment);
    this.failedPayment = this.store.selectSignal(selectFailedPayment);

    // 
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

      console.log(' confiremed =>  ', this.confirmedOrders())
    if ( isPlatformBrowser(this.platformId)) {
      this.pieChart();
      this.lineChart();
    }
     
    });
  }

  ngOnInit() {
    // Dispatch load action first
    this.store.dispatch(DashboardActions.load());
    
    // this.lineChart();
    // this.pieChart();
  }

  private getMonthlyOrderData() {
  const orders = this.orders();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Get last 6 months
  const now = new Date();
  const labels: string[] = [];
  const orderCounts: number[] = [];
  const revenue: number[] = [];
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    labels.push(`${monthName} ${year}`);
    
    // Count orders and sum revenue for this month
    let count = 0;
    let monthRevenue = 0;
    
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      if (orderDate.getMonth() === date.getMonth() && 
          orderDate.getFullYear() === date.getFullYear()) {
        count++;
        monthRevenue += order.totalAmount || 0; 
      }
    });
    
    orderCounts.push(count);
    revenue.push(monthRevenue);
  }
  
  return { labels, orderCounts, revenue };
}

   pieChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

     this.piedata = {
      labels: ['Confirmed', 'Cancelled', 'Pending', 'Delivered'],
      datasets: [{
        data: [
          this.confirmedOrders(),
          this.cancelledOrders(),
          this.totalOrders() - this.confirmedOrders() - this.cancelledOrders(),
          this.DeliveredOrders()
        ],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-orange-500'),  // Confirmed
          documentStyle.getPropertyValue('--p-red-500'),      // Cancelled (use red)
          documentStyle.getPropertyValue('--p-gray-500') ,     // Pending
          documentStyle.getPropertyValue('--p-green-500')      // Pending
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-orange-400'),
          documentStyle.getPropertyValue('--p-red-400'),
          documentStyle.getPropertyValue('--p-gray-400'),
          documentStyle.getPropertyValue('--p-green-400')
        ]
      }]
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


      this.Paymentpiedata = {
      labels: ['Pending', 'Paid', 'Failed', ],
      datasets: [{
        data: [
          this.pendingPayment(),
          this.confirmedPayment(),
          this.failedPayment(),

        ],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-orange-500'),  // Confirmed
          documentStyle.getPropertyValue('--p-red-500'),      // Cancelled (use red)
          documentStyle.getPropertyValue('--p-gray-500') ,     // Pending
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-orange-400'),
          documentStyle.getPropertyValue('--p-red-400'),
          documentStyle.getPropertyValue('--p-gray-400'),
        ]
      }]
     };

       this.salespiedata = {
      labels: ['Total Revenue', 'Total Sales', 'Average Order Value', 'Pending Renvenue' ],
      datasets: [{
        data: [
          this.totalRevenue(),
          this.totalSales(),
          this.averageOrderValue(),
          this.pendingRevenue(),

        ],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-orange-500'),  // Confirmed
          documentStyle.getPropertyValue('--p-teal-500'),      // Cancelled (use red)
          documentStyle.getPropertyValue('--p-gray-500') ,     // Pending
          documentStyle.getPropertyValue('--p-red-500') ,     // Pending
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-orange-400'),
          documentStyle.getPropertyValue('--p-teal-400'),
          documentStyle.getPropertyValue('--p-gray-400'),
          documentStyle.getPropertyValue('--p-red-400'),
        ]
      }]
     };

      this.Productpiedata = {
      labels: ['Total Product', 'Delete Products', 'Stock Out', 'Stock In ' ],
      datasets: [{
        data: [
          this.totalProducts(),
          this.totalDelete(),
          this.totalStockOut(),
          this.totalStockIN(),

        ],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-orange-500'),  // Confirmed
          documentStyle.getPropertyValue('--p-teal-500'),      // Cancelled (use red)
          documentStyle.getPropertyValue('--p-gray-500') ,     // Pending
          documentStyle.getPropertyValue('--p-red-500') ,     // Pending
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-orange-400'),
          documentStyle.getPropertyValue('--p-teal-400'),
          documentStyle.getPropertyValue('--p-gray-400'),
          documentStyle.getPropertyValue('--p-red-400'),
        ]
      }]
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

      this.cd.markForCheck();
    }
  }

  lineChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
       const chartData = this.getMonthlyOrderData();

       console.log('chartDAta => ', chartData)

      this.linedata = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Orders',
            data: chartData.orderCounts,
            fill: false,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--p-cyan-500')
          },
          {
            label: 'Revenue',
            data: chartData.revenue,
            fill: false,
            borderDash: [5, 5],
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--p-orange-500')
          },
         
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

      this.cd.markForCheck();
    }
  }

 


}