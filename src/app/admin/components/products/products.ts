import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, Signal, ViewChild } from '@angular/core';
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
import { loadProductInitalType, ProductType } from '../../../core/models/product.model';
import { AdminService } from '../../../core/services/admin/admin-service';
import { getAllProductsAction } from '../../../store/custumer/cus.action';
import { selectGetAllProduct } from '../../../store/custumer/cus.selectors';

interface Product {
  id?: string;
  code?: string;
  name?: string;
  image?: string;
  price?: number;
  category?: string;
  description?: string;
  rating?: number;
  status?: string;
}

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
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
    ReactiveFormsModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class Products implements OnInit {
  @ViewChild('dt') dt!: Table;

  adminService = inject(AdminService)
  toast = inject(HotToastService)

  products : ProductType[] | undefined = []
  allState !: Signal<loadProductInitalType> ;
  productDialog: boolean = false;

  selectedProducts: Product[] = [];
  submitted: boolean = false;
  globalFilterValue: string = '';
  

   first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;


    // table header 
  tableHeaders = [

{ title: "id", width: "8rem", icon: "sortIcon", }, 
{ title: "name", width: "12rem", icon: "sortIcon", }, 
{ title: "image", width: "10rem", icon: null, }, 
{ title: "price", width: "8rem", icon: "sortIcon", }, 
{ title: "category", width: "10rem", icon: "sortIcon", }, 
{ title: "brand", width: "8rem", icon: null, }, 
{ title: "rating", width: "8rem", icon: "sortIcon", }, 
{ title: "stock", width: "8rem", icon: "sortIcon", }, 
{ title: "Actions", width: "10rem", icon: null, }, 
]


 tableSchema = [
    { element: 'p-tableCheckbox' },
    { element: 'span', class: 'text-sm text-gray-600', field: 'id' },
    { element: 'span', class: 'font-medium', field: 'name' },
    { element: 'img', class: 'w-12 h-12 object-cover rounded border', field: 'images', altField: 'images[0]' },
    { element: 'span', class: 'font-medium', field: 'price', pipe: "number:'1.2-2'" },
    { element: 'span', class: 'text-sm', field: 'category' },
    { element: 'span', class: 'text-sm text-gray-600', field: 'brand' },
    { element: 'p-rating', class: 'text-yellow-500', field: 'ratings', readonly: true },
    { element: 'span', class: 'text-sm text-gray-600', field: 'stock' },
  ];



  // Category options
  categories: SelectOption[] = [
    { label: 'Accessories', value: 'Accessories' },
    { label: 'Fitness', value: 'Fitness' },
    { label: 'Clothing', value: 'Clothing' },
    { label: 'Electronics', value: 'Electronics' }
  ];

  // For autocomplete filtering
  filteredCategories: SelectOption[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private store: Store<{GetAllProductsReducer : loadProductInitalType }>
  ) {

      this.allState = this.store.selectSignal(selectGetAllProduct)

             effect(() => {
               
                this.products = this.allState().data

                console.log(this.products)
                
                
            });

  }


  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {
   
    

     const  data = {
              page: 1, 
              limit: 100000, 
            }

    this.store.dispatch(getAllProductsAction.load({payload: data }))

    this.cd.markForCheck();
  }

  

      
  productForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl('', [Validators.required, Validators.minLength(5)]), 
        category: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required,]),
        brand: new FormControl('', [Validators.required,]),
        stock: new FormControl('', [Validators.required,]),
        ratings: new FormControl('', [Validators.required,]),
        totalRatings: new FormControl('', [Validators.required,]),
      });

        
 addProductFormConfig = [
  {
    type: 'text',
    id: 'name',
    label: 'Product Name',
    placeholder: 'Enter product name...',
    validation: {
      required: 'Product name is required',
      minlength: 'Product name must be at least 3 characters'
    },
  },
  {
    type: 'textarea',
    id: 'description',
    label: 'Description',
    placeholder: 'Enter product description...',
    rows: 4,
    validation: {
      required: 'Description is required',
      minlength: 'Description is required'
    },
  },
  {
    type: 'select',
    id: 'category',
    label: 'Category',
    placeholder: 'Select category...',
    options: [
      { value: '', label: 'Select category...' },
      { value: 'Computer Accessories', label: 'Computer Accessories' },
      { value: 'Electronics', label: 'Electronics' },
      { value: 'Office Supplies', label: 'Office Supplies' },
      { value: 'Audio', label: 'Audio' },
      { value: 'Gaming', label: 'Gaming' }
    ],
    validation: {
      required: 'Category is required'
    },
  },
  {
    type: 'number',
    id: 'price',
    label: 'Price (npr)',
    placeholder: '0.00',
    step: 0.01,
    min: 0,
    validation: {
      required: 'Price is required'
    },
  },
  {
    type: 'text',
    id: 'brand',
    label: 'Brand',
    placeholder: 'Enter brand name...',
    validation: {
      required: 'Brand is required'
    },
  },
  {
    type: 'number',
    id: 'stock',
    label: 'Stock Quantity',
    placeholder: '0',
    min: 0,
    validation: {
      required: 'Stock quantity is required'
    },
  },
  {
    type: 'number',
    id: 'ratings',
    label: 'Initial Rating',
    placeholder: '0.0',
    step: 0.1,
    min: 0,
    max: 5,
    validation: {
      required: 'Rating is required'
    },
  },
  {
    type: 'number',
    id: 'totalRatings',
    label: 'Total Ratings Count',
    placeholder: '0',
    min: 0,
    validation: {
      required: 'Total ratings is required'
    },
  }
];


  get mutableProducts() {
  return this.products ? [...this.products] : [];
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

    // this.product
    // this.product = {
    //   status: 'INSTOCK',
    //   rating: 0,
    //   price: 0
    // };
    this.submitted = false;
    this.productDialog = true;
  }

  // Hide the product dialog
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    // this.product = {};
  }

  // Save product (create or update)
  saveProduct() {
    this.submitted = true;

    
  }

  // Edit an existing product
  editProduct(product: Product) {
    console.log('edit click ', product)
    this.submitted = false;
    this.productDialog = true;
  }

  // Delete a single product
  deleteProduct(product: Product) {
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
            parseInt(product.id)
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
        this.selectedProducts = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Products Deleted Successfully',
          life: 3000
        });
      }
    });
  }





  // Helper: Find product index by ID
  findIndexById(id: string): number {
  //   // return this.products.findIndex(p => p.id === id);
  return 0
  }





}