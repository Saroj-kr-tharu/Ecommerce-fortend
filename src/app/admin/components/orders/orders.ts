import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
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
import { FormSignin, ValidationConfig } from '../../../core/models/auth.model';
import { FormattedOrder, FormattedOrderItem } from '../../../core/models/order.model';
import { ProductType, SelectOption } from '../../../core/models/product.model';
import { AdminService } from '../../../core/services/admin/admin-service';




@Component({
 selector: 'app-orders',
  templateUrl: './orders.html',
  styleUrl: './orders.css',

  standalone: true,
  imports: [
    CommonModule,
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
    
  ],
  providers: [MessageService, ConfirmationService]
})
export class Orders implements OnInit {
  @ViewChild('dt') dt!: Table;

  adminService = inject(AdminService)
  toast = inject(HotToastService)

  //  products = computed(() => this.allState().data ??  []);
  Orders = signal<FormattedOrder[]>([]);

  order! : FormattedOrder;
  originalValue ! : FormattedOrder;
  

  productDialog: boolean = false;
  isEditOpen = signal(false)
  isAddOpen = signal(false)

  selectedProducts: ProductType[] = [];
  submitted: boolean = false;
  globalFilterValue: string = '';
  

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



  // Category options
  categories: SelectOption[] = [];

  // For autocomplete filtering
  filteredCategories: SelectOption[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
  ) { }

    mutableOrders = computed(() => {
    console.log('computed products =>', this.Orders());
    return [...this.Orders()];   
  })


  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {


    this.adminService.getAllOrdersService().subscribe({
      next: (res:any) => {
          console.log('res => ', res.data)

       

        const formattedOrders: FormattedOrder[] = res.data.map((order: any): FormattedOrder => ({
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

          console.log(formattedOrders);
            this.Orders.set(formattedOrders)
      },
      complete: ()=> {this.toast.success('Sucessfully Loading Orders') },
      error: () => {this.toast.error('Fail To load Orders')}
    })

    this.cd.markForCheck();
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

     console.log('edit click ', this.originalValue)
  

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
     const formValue = this.orderForm.value ; 
     const { paymentMethod, paymentStatus, orderStatus } = formValue;

     const data = {
        paymentMethod,
        paymentStatus,
        orderStatus
     }

   

    const isUpdated = !this.areProductFieldsEqual(this.originalValue, data);
    if(!isUpdated) return ;

    this.adminService.updateOrdersService(Number(this.originalValue.itemId) , {...formValue}).subscribe({
      next: (res)=>  {this.toast.success('Updating '); 
        console.log('res => ', res)
      }, 
      complete: () => {this.toast.success('Sucessfully edited orders')},
      error: () => {this.toast.error('Faile to Edit orders')}
    });
 
    
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
        

        if (order.itemId !== undefined) {
          const data = {
            isActive: !order.isActive
          }
          this.adminService.updateOrdersService( order.itemId, data ).subscribe({
            next: (res:any) => { console.log(res.data) },
            complete: ()=> { this.toast.success(`Sucessfully Delete Product id : ${order.itemId}`) },
            error: () => { this.toast.error('Failed to delete Due to Reference Constaints') }
          });
        } 
        
        
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
        // this.products = this.products.filter(p => !this.selectedProducts.includes(p));
        
        // console.log('selected products => ', this.selectedProducts)
        let data = [];
        data = this.selectedProducts.map( (item) =>  item.id )
        // console.log('data => ',data)
        this.adminService.bulkDeleteProductService(data).subscribe({
          next: (res) => {
            console.log('res => ', res)
            this.toast.success('Bulk deleteing')
          },
          complete: () => {
            this.toast.success('Sucessfull Bulk Delete ')
          },
          error: () => { this.toast.error('Failed To Bulk Delete') }
        })
        this.selectedProducts = [];

        
      }
    });
  }





  // Helper: Find product index by ID
  findIndexById(id: string): number {
  //   // return this.products.findIndex(p => p.id === id);
  return 0
  }





}