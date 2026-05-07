import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, effect, inject, Input, OnChanges, OnInit, Signal, signal, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { FormSignin, sucessLoginType, ValidationConfig } from '../../../core/models/auth.model';
import { DashboardState } from '../../../core/models/dashboard.model';
import { FormattedOrder, FormattedOrderItem } from '../../../core/models/order.model';
import { ProductType, SelectOption } from '../../../core/models/product.model';
import { AdminService } from '../../../core/services/admin/admin-service';
import { CusServices } from '../../../core/services/custumer/cus.services';
import { Cardbanner } from '../../../shared/components/cardbanner/cardbanner';
import { selectUsers } from '../../../store/admin/admin.selectors';


@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    RatingModule,
    TagModule,
    RippleModule,
    AutoCompleteModule,
    CheckboxModule,
    TooltipModule,
    ReactiveFormsModule,
    Cardbanner],
  templateUrl: './userdetails.html',
  styleUrl: './userdetails.css',
  providers: [MessageService, ConfirmationService]
})
export class Userdetails implements OnInit, OnChanges {
  @ViewChild('dt') dt!: Table;
  @Input() user: sucessLoginType | null = null;

  userSignal = signal<sucessLoginType | null>(null);
  route = inject(ActivatedRoute)
  private store = inject(Store<{ DashboardReducer: DashboardState }>);
  adminService = inject(AdminService) ;
  cusService = inject(CusServices) ;
  router= inject(Router)

  usersstate!: Signal<sucessLoginType[]>; 
  isLoading = signal<boolean>(false);
  isActive = signal<boolean>(false);
  error = signal<string | null>(null);
  bannerItems = signal<any[]>([]);

  Orders = signal<FormattedOrder[]>([]);
  orderState = signal<any[]>([]);
  order! : FormattedOrder;
  originalValue ! : FormattedOrder;
  productDialog: boolean = false;
  isEditOpen = signal(false)
  isAddOpen = signal(false)
  selectedProducts: ProductType[] = [];
  submitted: boolean = false;
  globalFilterValue: string = ''; 

  orderForm: FormGroup = new FormGroup({
  orderId: new FormControl({ value: '', disabled: false }, [Validators.required]),
  user: new FormControl({ value: '', disabled: false }, [Validators.required]),
  totalAmount: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.min(0)]),
  paymentMethod: new FormControl({ value: '', disabled: false }, [Validators.required]),
  paymentStatus: new FormControl({ value: '', disabled: false }, [Validators.required]),
  orderStatus: new FormControl({ value: '', disabled: false }, [Validators.required]),
  items: new FormControl({ value: '', disabled: true }, [Validators.required]),
  shippingAddress: new FormControl({ value: '', disabled: true }, [Validators.required]),
  isDelivered: new FormControl({ value: false, disabled: true }),
  isCancelled: new FormControl({ value: false, disabled: true }),
  isActive: new FormControl({ value: '', disabled: false }),
  createdAt: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });

  orderFormConfig: FormSignin[] = [
    { type: 'text', id: 'totalAmount', label: 'Total Amount', placeholder: '', autocomplete: '', disabled: true, validation: {} },
    { type: 'text', id: 'items', label: 'Items', placeholder: '', autocomplete: '', disabled: true, validation: {} },
    { type: 'text', id: 'shippingAddress', label: 'Shipping Address', placeholder: '', autocomplete: '', disabled: true, validation: {} },
    { type: 'text', id: 'createdAt', label: 'Created At', placeholder: '', autocomplete: '', disabled: true, validation: {} },
    { type: 'select', id: 'paymentMethod', autocomplete: '', label: 'Payment Method', options: ['COD', 'Khalti', 'Stripe' , 'Esewa'], validation: { required: 'Payment method is required' } },
    { type: 'select', id: 'paymentStatus', label: 'Payment Status', autocomplete: '', options: ['paid', 'pending', 'failed'], validation: { required: 'Payment status is required' } },
    { type: 'select', id: 'orderStatus', label: 'order Status', autocomplete: '', options: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'], validation: { required: 'Payment status is required' } },
    { type: 'checkbox', id: 'isDelivered', autocomplete: '', label: 'Delivered',disabled: true, validation: {} },
    { type: 'checkbox', id: 'isCancelled', label: 'Cancelled', autocomplete: '', disabled: true, validation: {} }
  ];
  tableHeaders = [
  { title: "Order id", field: "id", icon: "sortIcon", width: "10rem" },
  { title: "User", field: "username", icon: "sortIcon", width: "10rem" },
  { title: "Total Amount", field: "totalAmount", icon: "sortIcon", width: "8rem" },
  { title: "Payment Method", field: "paymentMethod", icon: "sortIcon", width: "8rem" },
  { title: "Payment Status", field: "paymentStatus", icon: "sortIcon", width: "8rem" },
  { title: "Order Status", field: "orderStatus", icon: "sortIcon", width: "8rem" },
  { title: "Shipping Address", field: "street", icon: "sortIcon", width: "8rem" },
  { title: "Delivered", field: "deliveredAt", icon: "sortIcon", width: "5rem" },
  { title: "Cancelled", field: "cancelledAt", icon: "sortIcon", width: "5rem" },
  { title: "isActive", field: "isActive", icon: "sortIcon", width: "5rem" },
  { title: "Actions", field: null, icon: null, width: "10rem" }
];

tableSchema = [
  

  { element: 'span', class: 'text-sm text-gray-600', field: 'id' },
  { element: 'span', class: 'font-medium', field: 'user' },

  { element: 'span', class: 'font-medium', field: 'totalAmount', type: 'number' },

  { element: 'span', class: 'font-medium', field: 'paymentMethod' },
  { element: 'span', class: 'text-sm', field: 'paymentStatus' },
  { element: 'span', class: 'text-sm text-gray-600', field: 'orderStatus' },


  { element: 'span', class: 'text-sm text-gray-600', field: 'shippingAddress' },

  { element: 'span', class: 'text-sm text-gray-600', field: 'delivered', type: 'date' },
  { element: 'span', class: 'text-sm text-gray-600', field: 'cancelled', type: 'date' },
  { element: 'span', class: 'text-sm text-gray-600', field: 'isActive' },
];

  // Category options
  categories: SelectOption[] = [];

  // For autocomplete filtering
  filteredCategories: SelectOption[] = [];


  displayName = computed(() => {
    const u = this.userSignal();
    return u?.username || u?.email?.split('@')[0] || 'Unknown User';
  }); 

  initials = computed(() => {
    const name = this.displayName();
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });

  memberSince = computed(() => {
    const u = this.userSignal();
    if (!u?.createdAt) return '—';
    return new Date(u.createdAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  });

  lastUpdated = computed(() => {
  const d = this.userSignal()?.updatedAt;
  return d ? new Date(d).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: '2-digit', 
    hour: 'numeric', minute: '2-digit'
  }).toLowerCase() : '—';
});
  totalOrders = computed(() => this.Orders().length);
  totalConfirmOrders = computed(() => this.Orders().filter(order => order.orderStatus === 'confirmed').length);
  totalPendingOrders = computed(() => this.Orders().filter(order => order.orderStatus === 'pending').length);
  totalDeliveredOrders = computed(() => this.Orders().filter(order => order.orderStatus === 'delivered').length);
  totalCancelledOrders = computed(() => this.Orders().filter(order => order.orderStatus === 'cancelled').length);
  totalPendingPayment = computed(() => this.Orders().filter(order => order.paymentStatus === 'pending').length);
  totalConfirmendPaymnet = computed(() => this.Orders().filter(order => order.paymentStatus === 'paid').length);
  toalFailedPaymnet = computed(() => this.Orders().filter(order => order.paymentStatus === 'failed').length);

  

  constructor( 
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
   ) {
     effect(() => {
      this.bannerItems.set([

      { title: "UserName",            value: this.displayName(),           icon: "pi pi-user" },
      { title: "Ban",                 value: this.isActive(),              icon: "pi pi-ban" },
      { title: "MemberSince",         value: this.memberSince(),           icon: "pi pi-calendar-plus" },
      { title: "LastUpdated",         value: this.lastUpdated(),           icon: "pi pi-calendar-clock" },
      { title: "Total Orders",        value: this.totalOrders(),           icon: "pi pi-list" },
      { title: "Confirm Orders",      value: this.totalConfirmOrders(),    icon: "pi pi-check-square" },
      { title: "Pending Orders",      value: this.totalPendingOrders(),    icon: "pi pi-hourglass" },
      { title: "Delivered Orders",    value: this.totalDeliveredOrders(),  icon: "pi pi-truck" },
      { title: "Cancelled Orders",    value: this.totalCancelledOrders(),  icon: "pi pi-times-circle" },
      { title: "Pending Payment",     value: this.totalPendingPayment(),   icon: "pi pi-clock" },
      { title: "Confirmed Payment",   value: this.totalConfirmendPaymnet(), icon: "pi pi-credit-card" },
      { title: "Failed Payment",      value: this.toalFailedPaymnet(),     icon: "pi pi-exclamation-circle" },
    
      ]);
    });
  }

  mutableOrders = computed(() => {
    console.log('computed orders  =>', this.Orders());
    return [...this.Orders()];   
    })

  ngOnInit(): void {
    const UserId = this.route.snapshot.paramMap.get('id'); 
    this.usersstate = this.store.selectSignal(selectUsers);
    const userDetails = this.usersstate().find(item => `${item.id}` == UserId); 
    // console.log('user Details => ', this.usersstate())
    this.userSignal.set(userDetails ?? null);
    this.loadOrders(UserId)

    if(userDetails?.isActive){
      this.isActive.set(true);
    }

    if (UserId) {
      this.loadUsers(UserId);
      this.loadOrders(UserId)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
        this.userSignal.set(this.user);
    }
  }

  private loadUsers(id: string): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.adminService.getUserByUserId(id).subscribe({
      next: (res:any) => {
        // console.log('User loaded:', res?.data);
        this.userSignal.set(res?.data ?? null);
        this.isLoading.set(false);
      },
      error: (err) => {
        // console.error('Error loading product:', err);
        this.error.set('Failed to load product');
        this.isLoading.set(false);
      }
    });
  }
  private loadOrders(id: any): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.cusService.GetOrdersByUserId(id, 1, 10).subscribe({
      next: (res:any) => {
        this.orderState.set(res?.data || []);
            const formattedOrders: FormattedOrder[] = this.orderState().map((order: any): FormattedOrder => ({
                  itemId: order.id,
                  id: order.orderNumber,
                  user: order.user?.email || order.user?.username || null ,
                  totalAmount: order.totalAmount,
                  paymentMethod: order.paymentMethod,
                  paymentStatus: order.paymentStatus,
                  orderStatus: order.orderStatus,
                  isActive: order.isActive,
                  itemslength:order.OrderItems.length,
                  items: order.OrderItems.map((item: any): FormattedOrderItem => ({
                    productName: item.productName,
                    quantity: item.quantity,
                    price: item.productPrice,
                    total: item.total
                  })),
                  shippingAddress: order.shippingAddress
                    ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.zip}, ${order.shippingAddress.country}`
                    : null,
                  delivered: order.deliveredAt ? new Date(order.deliveredAt).toISOString() : null,
                  cancelled: order.cancelledAt ? new Date(order.cancelledAt).toISOString() : null,
                  created: order.createdAt ? new Date(order.createdAt).toISOString() : null
                }));
            this.Orders.set(formattedOrders);
            // console.log("orders => ", this.Orders())
            this.cd.markForCheck();
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load orders');
        this.isLoading.set(false);
      }
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // console.log('Copied:', text); 
    });
  }


  // for table 

  navigateToOrder(product: any) {
      // console.log('order => ', product) 
      this.router.navigate(['/admin/orders',  product.id]);
    }
  
  
    formatItems(items: any[]): string {
    if (!items) return '';
    try {
      // If items are objects with productName and quantity, show name (qty)
      if (Array.isArray(items) && items.length > 0 && items[0].productName !== undefined) {
        return items.map(i => `${i.productName}${i.quantity !== undefined ? ` (${i.quantity})` : ''}`).join(', ');
      }
      // fallback: just show count
      return `${items.length} item${items.length > 1 ? 's' : ''}`;
    } catch {
      return '';
    }
    }
  
  
    // Autocomplete filter for Category
    filterCategory(event: any) {
      const query = event.query.toLowerCase();
      this.filteredCategories = this.categories.filter(category => 
        category.label.toLowerCase().includes(query)
      );
    }
  
    // Global search filter
    onGlobalFilter(event: Event) {
      const input = event.target as HTMLInputElement;
      this.dt.filterGlobal(input.value, 'contains');
    }
  
    // Clear global filter
    clear() {
      this.globalFilterValue = '';
      this.dt.clear();
    }
  
    // Open dialog to create new product
    openNew() {
           this.isAddOpen.set(true)
          this.submitted = false;
          this.productDialog = true;
          this.orderForm.reset()
    }
  
    // Hide the product dialog
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
      this.isEditOpen.set(false)
    }
  
  
    areProductFieldsEqual(a: any, b: any): boolean {
    return (
      a.id === b.id &&
      a.user === b.user &&
      a.totalAmount === b.totalAmount &&
      a.paymentMethod === b.paymentMethod &&
      a.paymentStatus === b.paymentStatus &&
      a.orderStatus === b.orderStatus &&
      JSON.stringify(a.items) === JSON.stringify(b.items) &&
      a.shippingAddress === b.shippingAddress &&
      a.delivered === b.delivered &&
      a.cancelled === b.cancelled &&
      a.created === b.created
    );
  }
  
    // Edit an existing product
    editProduct(order: FormattedOrder ) {
          this.isEditOpen.set(true)
          this.originalValue = order;
          // console.log('edit click ', this.originalValue)
          this.orderForm.setValue({
            orderId: order.id ,
            user: order.user ,
            totalAmount: order.totalAmount ,
            paymentMethod: order.paymentMethod ,
            paymentStatus: order.paymentStatus,
            orderStatus: order.orderStatus,
            items: order.items ,
            shippingAddress: order.shippingAddress ,
            isDelivered: !!order.delivered,
            isCancelled: !!order.cancelled,
            isActive: order.isActive,
            createdAt: order.created
          });
  
      this.submitted = false;
      this.productDialog = true;
    }
  
  
    // Save product (create or update)
    saveProduct() {
      this.submitted = true;
      this.hideDialog();
    }
  
    // Delete a single product
    deleteProduct(order:FormattedOrder ) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete "${order.id}"?`,
        header: 'Delete Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass: 'p-button-danger',
        accept: () => {         
        }
      });
    }
  
    getValidationKeys(validation: ValidationConfig): string[] {
        return Object.keys(validation);
      }
  
    // Delete multiple selected products
    deleteSelectedProducts() {
      if (!this.selectedProducts || this.selectedProducts.length === 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Please select products to delete',
          life: 3000
        });
        return;
      }
  
      this.confirmationService.confirm({
        message: `Are you sure you want to delete ${this.selectedProducts.length} selected product(s)?`,
        header: 'Delete Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass: 'p-button-danger',
        accept: () => {
          console.log('selected products => ', this.selectedProducts)
        }
      });
    }
  
    findIndexById(id: string): number {
    return 0
    }
  
}