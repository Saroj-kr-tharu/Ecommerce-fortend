import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, effect, inject, OnInit, Signal, signal, ViewChild } from '@angular/core';
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
import { FormSignin, sucessLoginType, ValidationConfig } from '../../../core/models/auth.model';
import { DashboardState } from '../../../core/models/dashboard.model';
import { SelectOption } from '../../../core/models/product.model';
import { AdminService } from '../../../core/services/admin/admin-service';
import { Cardbanner } from "../../../shared/components/cardbanner/cardbanner";
import { selectUsers } from '../../../store/admin/admin.selectors';




@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrl: './users.css',

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
    Cardbanner
],
  providers: [MessageService, ConfirmationService]
})
export class Users implements OnInit {
  @ViewChild('dt') dt!: Table;

  adminService = inject(AdminService)
  toast = inject(HotToastService)

  //  products = computed(() => this.allState().data ??  []);
  Users = signal<sucessLoginType[]>([]);

  user! : sucessLoginType;
  originalValue ! : sucessLoginType
  

  productDialog: boolean = false;
  isEditOpen = signal(false)
  isAddOpen = signal(false)

  selectedProducts: sucessLoginType[] = [];
  submitted: boolean = false;
  globalFilterValue: string = '';
  
  private store = inject(Store<{ DashboardReducer: DashboardState }>);
  usersstate!: Signal<sucessLoginType[]>;



    // table header 
  tableHeaders = [

{ title: "id", width: "8rem", icon: "sortIcon", }, 
{ title: "email", width: "8rem", icon: "sortIcon", }, 
{ title: "username", width: "10rem", icon: "sortIcon", }, 
{ title: "role", width: "8rem", icon: null, }, 
{ title: "isActive", width: "5rem", icon: "sortIcon", }, 
{ title: "Actions", width: "10rem", icon: null, }, 
]


 tableSchema = [
    { element: 'p-tableCheckbox' },
    { element: 'span', class: 'text-sm text-gray-600', field: 'id' },
    { element: 'span', class: 'text-sm text-gray-600', field: 'email' },
    { element: 'span', class: 'text-sm text-gray-600', field: 'username' },
    { element: 'span', class: 'text-sm text-gray-600', field: 'role' },
    { element: 'span', class: 'text-sm text-gray-600', field: 'isActive' },
  ];


    bannerItems = signal<any[]>([]);

  // Category options
  categories: SelectOption[] = [];

  // For autocomplete filtering
  filteredCategories: SelectOption[] = [];


  // Set totalCustumer as a computed signal based on Users
  totalCustumer = computed(() => this.Users().filter(user => user.role === "CUSTOMER").length);
  totaladmin = computed(() => this.Users().filter(user => user.role === "ADMIN").length);
  totalban = computed(() => this.Users().filter(user => user.isActive === true).length);
  

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    
  ) {

     effect(() => {
    this.bannerItems.set([
       
      { title: "Total Users", value: this.usersstate().length, icon: "pi pi-users" },
      { title: "Total Custumer", value: this.totalCustumer(), icon: "pi pi-shopping-bag" },
      { title: "Total Admin", value: this.totaladmin(), icon: "pi pi-shopping-cart" },
      { title: "Total Ban", value: this.totalban(), icon: "pi pi-check-circle" },
  
    ]);
  });


  }

  get mutableProducts() {
  return [...this.Users()];   
}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {

    this.usersstate = this.store.selectSignal(selectUsers);
    this.Users.set(this.usersstate())
    // console.log('userstate -=> ', this.usersstate())

    // this.adminService.getAllUsersService().subscribe({
    //   next: (res:any) => {
    //     console.log('res => ', res)
    //         this.Users.set(res.data)
    //   },
    //   complete: ()=> {this.toast.success('Sucessfully Loading Users') },
    //   error: () => {this.toast.error('Failed To load Users')}
    // })

    

    this.cd.markForCheck();
  }

  

       
  UsersForm : FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.minLength(2), Validators.email]), 
        role: new FormControl('', [Validators.required]),
        isActive: new FormControl('', [Validators.required],),
       
      });

        
  UsersFormConfig: FormSignin[] = [
    { type: 'text', id: 'username', label: 'Username', placeholder: 'Enter username...', autocomplete: '', validation: { required: 'Username is required', minlength: 'Username must be at least 3 characters' } },
    { type: 'text', id: 'email', label: 'Email', placeholder: 'Enter email...', autocomplete: '', validation: { required: 'Email is required', minlength: 'Email must be at least 2 characters', email: 'Please enter a valid email address' } },
    { type: 'select', id: 'role', label: 'Role', placeholder: 'Select role...', autocomplete: '', options: [ { label: 'CUSTOMER', value: 'CUSTOMER' }, { label: 'ADMIN', value: 'ADMIN' } ], validation: { required: 'Role is required' } },
    { type: 'select', id: 'isActive', label: 'Active Status', placeholder: 'Select status...', autocomplete: '', options: [ { label: 'Active', value: true }, { label: 'Inactive', value: false } ], validation: { required: 'Active status is required' } }
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

        this.UsersForm.reset()
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
    a.role === b.role &&
    a.username === b.username &&
    a.email === b.email &&
    a.isActive === b.isActive
  );
}

  // Edit an existing product
  editProduct(user: sucessLoginType) {
        this.isEditOpen.set(true)
        this.originalValue = user;

    console.log('edit click ', this.originalValue)
      this.user = {
        id:user.id,
        isActive: user.isActive, 
        email: user.email,
        username: user.username, 
        role: user.role, 
       
      }

        this.UsersForm.setValue({

          isActive: user.isActive, 
          email: user.email,
          username: user.username, 
          role: user.role, 
        });

      
    this.submitted = false;
    this.productDialog = true;
  }


    // Save product (create or update)
  saveProduct() {
      const formValue = this.UsersForm.value ; 
      const { id, images, ...payload } = formValue;
     
    const isUpdated = !this.areProductFieldsEqual(this.originalValue, formValue);
    
    console.log('Is value updated?', isUpdated);

    if(!isUpdated) return ;

    this.adminService.updateUsersByIdService(this.originalValue.id , {...formValue}).subscribe({
      next: (res)=>  {this.toast.success('Editting'); 
        console.log('res => ', res)
      }, 
      complete: () => {this.toast.success('Sucessfully edited product')},
      error: () => {this.toast.error('Faile to Edit Product')}
    });
 
    


    this.submitted = true;
    console.log(this.UsersForm.value)
    this.hideDialog();

    
  }

  // Delete a single product
  deleteProduct(user:sucessLoginType) {
    this.confirmationService.confirm({
      message: `Are you sure you want to ban "${user.email}"?`,
      header: 'Ban Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
      

        if (user.id !== undefined) {
          this.adminService.updateUsersByIdService(user.id,{isActive: !user.isActive} ).subscribe({
            next: (res:any) => { console.log(res.data) },
            complete: ()=> { this.toast.success(`Sucessfully Ban User email : ${user.email}`) },
            error: () => { this.toast.error('Failed to Ban ') }
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
      message: `Are you sure you want to Ban All ${this.selectedProducts.length} selected Users(s)?`,
      header: 'Ban Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        // this.products = this.products.filter(p => !this.selectedProducts.includes(p));
        
        // console.log('selected products => ', this.selectedProducts)
        let data = [];
        data = this.selectedProducts.map( (item) =>  item.id )
        // console.log('data => ',data)
        this.adminService.BulkUsersUpdateService(data).subscribe({
          next: (res) => {
            console.log('res => ', res)
            this.toast.success('Bulk Baning User')
          },
          complete: () => {
            this.toast.success('Sucessfull Ban Delete Users')
          },
          error: () => { this.toast.error('Failed To Ban Delete Users') }
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