import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, signal, Signal, ViewChild } from '@angular/core';
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
import { selectGetAllProduct } from '../../../store/custumer/cus.selectors';




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

  //  products = computed(() => this.allState().data ??  []);
  products = signal<ProductType[]>([]);

  product! : ProductType;
  originalValue ! : ProductType
  
  allState !: Signal<loadProductInitalType> ;
  productDialog: boolean = false;
  isEditOpen = signal(false)
  isAddOpen = signal(false)

  selectedProducts: ProductType[] = [];
  submitted: boolean = false;
  globalFilterValue: string = '';
  




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
{ title: "isActive", width: "5rem", icon: "sortIcon", }, 
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
    { element: 'span', class: 'text-sm text-gray-600', field: 'isActive' },
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
      this.allState = this.store.selectSignal(selectGetAllProduct)
  }

  get mutableProducts() {
  return [...this.products()];   
}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {


    this.adminService.getAllProductService().subscribe({
      next: (res:any) => {
            this.products.set(res.data)
      },
      complete: ()=> {this.toast.success('Sucessfully Loading Data') },
      error: () => {this.toast.error('Fail To Load All Data')}
    })

    this.cd.markForCheck();
  }

  

       
  productForm : FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl('', [Validators.required, Validators.minLength(5)]), 
        category: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required,  Validators.min(0)],),
        brand: new FormControl('', [Validators.required,]),
        stock: new FormControl('', [Validators.required, Validators.min(0)]),
        ratings: new FormControl('', [Validators.required,  Validators.min(0), Validators.max(5)],),
        totalRatings: new FormControl('', [Validators.required,Validators.min(0)], ),
        images: new FormControl('', [Validators.required], ),
      });

        
 addProductFormConfig:FormSignin[] = [
   {
    type: 'text',
    id: 'name',
    label: 'Product Name',
    placeholder: 'Enter product name...',
    autocomplete: '',
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
    autocomplete: '',
    validation: {
      required: 'Description is required',
      minlength: 'Description is required'
    },
  },
  {
    type: 'text',
    id: 'category',
    label: 'Category',
    placeholder: 'Select or enter category...',
    autocomplete: '',

    validation: {
      required: 'Category is required'
    },
  },
  {
    type: 'number',
    id: 'price',
    label: 'Price (npr)',
    placeholder: '0.00',
    autocomplete: '',
    validation: {
      required: 'Price is required',
       min: 'min value is 0'
    },
  },
  {
    type: 'text',
    id: 'brand',
    label: 'Brand',
    placeholder: 'Enter brand name...',
    autocomplete: '',
    validation: {
      required: 'Brand is required',
       min: 'min value is 0'
    },
  },
  {
    type: 'number',
    id: 'stock',
    label: 'Stock Quantity',
    placeholder: '0',
    autocomplete: '',
    validation: {
      required: 'Stock quantity is required',
       min: 'min value is 0'
    },
  },
  {
    type: 'number',
    id: 'ratings',
    label: 'Rating',
    placeholder: '0.0',
    autocomplete: '',
    validation: {
      required: 'Rating is required',
       min: 'min value is 0'
    },
  },
  {
    type: 'number',
    id: 'totalRatings',
    label: 'Total Count',
    placeholder: '0',
    autocomplete: '',
    validation: {
      required: 'Total ratings is required',
       min: 'min value is 0'
    },
  },

  {
  type: 'text',
  id: 'images',
  label: 'Images',
  placeholder: "Enter image URLs separated by commas...",
  autocomplete: '',
  validation: {
    required: 'At least one image URL is required'
  },
  transform: (value: string) => value.split(',').map(url => url.trim()).filter(url => url)
},
];





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

        this.productForm.reset()
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
      this.product = {
        isActive: product.isActive, 
        brand: product.brand,
        category: product?.category, 
        description: product.description, 
        id: product.id , 
        images: product.images, 
        name: product.name, 
        price: product.price, 
        stock: product.stock, 
        ratings: product.ratings,
      }

        this.productForm.setValue({
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          brand: product.brand,
          stock: product.stock,
          ratings: product.ratings,
          totalRatings: product.totalRatings ?? 0 ,
          images: product.images
        });

      // this.product = {...product, id: product.id};
      
    this.submitted = false;
    this.productDialog = true;
  }


    // Save product (create or update)
  saveProduct() {
     const formValue = this.productForm.value ; 
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
    console.log(this.productForm.value)
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



loadProducts(event: any) {
  const page = event.first / event.rows + 1;
  const limit = event.rows;

  console.log('Lazy load triggered: ', event);
  console.log('Page: ', page);
  console.log('Limit: ', limit);
}



}