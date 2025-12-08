import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
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
import { loadProductInitalType, ProductType, SelectOption } from '../../../core/models/product.model';
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
  Orders = signal<any[]>([]);

  Order! : ProductType;
  originalValue ! : ProductType
  

  productDialog: boolean = false;
  isEditOpen = signal(false)
  isAddOpen = signal(false)

  selectedProducts: ProductType[] = [];
  submitted: boolean = false;
  globalFilterValue: string = '';
  



    // table header 
  tableHeaders = [

{ title: "Order id", width: "8rem", icon: "sortIcon", }, 
{ title: "User", width: "12rem", icon: "sortIcon", }, 
{ title: "Total Amount", width: "10rem", icon: "sortIcon", }, 
{ title: "Payment Method", width: "8rem", icon: "sortIcon", }, 
{ title: "Payment Status", width: "10rem", icon: "sortIcon", }, 
{ title: "Order Status", width: "8rem", icon: "sortIcon", }, 
{ title: "Items", width: "8rem", icon: "sortIcon", }, 
{ title: "Shipping Address", width: "8rem", icon: "sortIcon", }, 
{ title: "Delivered", width: "5rem", icon: "sortIcon", }, 
{ title: "Cancelled", width: "5rem", icon: "sortIcon", }, 
{ title: "Created", width: "5rem", icon: "sortIcon", }, 
{ title: "Actions", width: "10rem", icon: null, }, 
]


tableSchema = [
  { element: 'p-tableCheckbox' },

  { element: 'span', class: 'text-sm text-gray-600', field: 'id' },
  { element: 'span', class: 'font-medium', field: 'user' },

  { element: 'span', class: 'font-medium', field: 'totalAmount', type: 'number' },

  { element: 'span', class: 'font-medium', field: 'paymentMethod' },
  { element: 'span', class: 'text-sm', field: 'paymentStatus' },
  { element: 'span', class: 'text-sm text-gray-600', field: 'orderStatus' },

  { element: 'span', class: 'text-sm text-gray-600', field: 'items', type: 'items' },

  { element: 'span', class: 'text-sm text-gray-600', field: 'shippingAddress' },

  { element: 'span', class: 'text-sm text-gray-600', field: 'delivered', type: 'date' },
  { element: 'span', class: 'text-sm text-gray-600', field: 'cancelled', type: 'date' },
  { element: 'span', class: 'text-sm text-gray-600', field: 'created', type: 'date' },
];


 orderForm:FormGroup = new FormGroup({
    orderId: new FormControl('', [Validators.required]),
    user: new FormControl('', [Validators.required]),
    totalAmount: new FormControl('', [Validators.required, Validators.min(0)]),
    paymentMethod: new FormControl('', [Validators.required]),
    paymentStatus: new FormControl('', [Validators.required]),
    orderStatus: new FormControl('', [Validators.required]),
    items: new FormControl('', [Validators.required]),
    shippingAddress: new FormControl('', [Validators.required]),
    isDelivered: new FormControl(false),
    isCancelled: new FormControl(false),
    createdAt: new FormControl('', [Validators.required]),
    });


orderFormConfig: FormSignin[] = [
  { type: 'text', id: 'totalAmount', label: 'Total Amount', placeholder: '', autocomplete: '', disabled: true, validation: {} },
  { type: 'textarea', id: 'items', label: 'Items', placeholder: '', autocomplete: '', disabled: true, validation: {} },
  { type: 'textarea', id: 'shippingAddress', label: 'Shipping Address', placeholder: '', autocomplete: '', disabled: true, validation: {} },
  { type: 'text', id: 'createdAt', label: 'Created At', placeholder: '', autocomplete: '', disabled: true, validation: {} },
  { type: 'select', id: 'paymentMethod', autocomplete: '', label: 'Payment Method', options: ['COD', 'Card', 'Esewa'], validation: { required: 'Payment method is required' } },
  { type: 'select', id: 'paymentStatus', label: 'Payment Status', autocomplete: '', options: ['Paid', 'Pending', 'Failed'], validation: { required: 'Payment status is required' } },
  { type: 'checkbox', id: 'isDelivered', autocomplete: '', label: 'Delivered', validation: {} },
  { type: 'checkbox', id: 'isCancelled', label: 'Cancelled', autocomplete: '', validation: {} }
];



  // Category options
  categories: SelectOption[] = [];

  // For autocomplete filtering
  filteredCategories: SelectOption[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private store: Store<{GetAllProductsReducer : loadProductInitalType }>
  ) {
      
  }

  get mutableProducts() {

    console.log('calling muteable => ', [...this.Orders()])
  return [...this.Orders()];   
}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {


    this.adminService.getAllOrdersService().subscribe({
      next: (res:any) => {
          console.log('res => ', res.data)

        interface FormattedOrderItem {
          productName: string;
          quantity: number;
          price: number;
          total: number;
        }

        interface FormattedOrder {
          id: string;
          user: string | null;
          totalAmount: number;
          paymentMethod: string;
          paymentStatus: string;
          orderStatus: string;
          items: FormattedOrderItem[];
          shippingAddress: string | null;
          delivered: string | null;
          cancelled: string | null;
          created: string | null;
        }

        const formattedOrders: FormattedOrder[] = res.data.map((order: any): FormattedOrder => ({
          id: order.id,
          user: order.user?.email || order.user?.username || null ,
          totalAmount: order.totalAmount,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          orderStatus: order.orderStatus,
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
    this.isAddOpen.set(false)
  }


  areProductFieldsEqual(a: any, b: any): boolean {
  return (
    a.name === b.name &&
    a.description === b.description &&
    a.category === b.category &&
    a.price === b.price &&
    a.brand === b.brand &&
    a.stock === b.stock &&
    a.ratings === b.ratings &&
    (a.totalRatings ?? 0) === (b.totalRatings ?? 0) &&
    JSON.stringify(a.images) === JSON.stringify(b.images)
  );
}

  // Edit an existing product
  editProduct(product: ProductType) {
        this.isEditOpen.set(true)
        this.originalValue = product;

    console.log('edit click ', this.originalValue)
    //   this.product = {
    //     isActive: product.isActive, 
    //     brand: product.brand,
    //     category: product?.category, 
    //     description: product.description, 
    //     id: product.id , 
    //     images: product.images, 
    //     name: product.name, 
    //     price: product.price, 
    //     stock: product.stock, 
    //     ratings: product.ratings,
    //   }

    //     this.productForm.setValue({
    //       name: product.name,
    //       description: product.description,
    //       category: product.category,
    //       price: product.price,
    //       brand: product.brand,
    //       stock: product.stock,
    //       ratings: product.ratings,
    //       totalRatings: product.totalRatings ?? 0 ,
    //       images: product.images
    //     });

     
      
    this.submitted = false;
    this.productDialog = true;
  }


    // Save product (create or update)
  saveProduct() {
     const formValue = this.orderForm.value ; 
      const { id, images, ...payload } = formValue;


    if(this.isAddOpen()){
      // console.log('product add btn is click')
      
      this.adminService.addProductService({...payload, images: [images]}).subscribe({
      next: (res)=>  {this.toast.success('Adding Product'); 
        // console.log('res => ', res)
      }, 
      complete: () => {this.toast.success('Sucessfully Added product')},
      error: () => {this.toast.error('Faile to Add Product')}
    });
    }

    if(this.isEditOpen()){
     
    const isUpdated = !this.areProductFieldsEqual(this.originalValue, formValue);
    
    // console.log('Is value updated?', isUpdated);

    if(!isUpdated) return ;

    this.adminService.updateProductService(this.originalValue.id , {...formValue, images: [images]}).subscribe({
      next: (res)=>  {this.toast.success('Editting'); 
        console.log('res => ', res)
      }, 
      complete: () => {this.toast.success('Sucessfully edited product')},
      error: () => {this.toast.error('Faile to Edit Product')}
    });
 
    }


    this.submitted = true;
    this.hideDialog();

    
  }

  // Delete a single product
  deleteProduct(product: ProductType) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${product.name}"?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        // this.products = this.products.filter(p => p.id !== product.id);
        // console.log('delete btn => ', product)

        if (product.id !== undefined) {
          this.adminService.deleteProductService(
            product.id
          ).subscribe({
            next: (res:any) => { console.log(res.data) },
            complete: ()=> { this.toast.success(`Sucessfully Delete Product id : ${product.id}`) },
            error: () => { this.toast.error('Failed to delete Due to Reference Constaints') }
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product ID is missing.',
            life: 3000
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