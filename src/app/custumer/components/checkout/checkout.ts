
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepperModule } from 'primeng/stepper';
import { FormSignin, ValidationConfig } from '../../../core/models/auth.model';
import { orderSummary } from '../../../core/models/order.model';
import { CusServices } from '../../../core/services/custumer/cus.services';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyPipe
    
  ],
 templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})



export class Checkout implements OnInit {
  activeStep: number = 1;
  OrderSummaryData: any; 
  router = inject(Router);
  cusService = inject(CusServices);
  toast = inject(HotToastService);


  // Billing Address Form
  billingForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required])
  });

    // Shipping Address Form
  shippingForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required])
  });


    // Payment Form
  paymentForm: FormGroup = new FormGroup({
    paymentMethod: new FormControl('', [Validators.required])
  });

  sameAsBilling: boolean = false;

  paymentMethods = [
    { id: 'esewa', name: 'eSewa', icon: 'pi-wallet' },
    { id: 'khalti', name: 'Khalti', icon: 'pi-credit-card' },
    { id: 'stripe', name: 'Stripe', icon: 'pi-money-bill' },
    { id: 'cod', name: 'Cash on Delivery', icon: 'pi-shopping-bag' }
  ];

  pStepValue = [
    {  name: 'Address', value: 1, icon:'pi-home' },
    {  name: 'Payment', value: 2, icon:'pi-credit-card' },
    {  name: 'Review', value: 3, icon:'pi-check-circle' },
    
  ];

  // signal 
  

  orderSummary = signal<orderSummary>({
    seletectItem: [],
    subtotal: 0,
    itemCount: 0,
    shippingFee: 0,
    total: 0
  });


    billingFormConfig: FormSignin[] = [
      {
        type: 'text',
        id: 'firstName',
        label: 'First Name',
        placeholder: 'First name...',
        autocomplete: 'given-name',
        validation: { required: 'First name is required' },
      },
      {
        type: 'text',
        id: 'lastName',
        label: 'Last Name',
        placeholder: 'Last name...',
        autocomplete: 'family-name',
        validation: { required: 'Last name is required' },
      },
      {
        type: 'email',
        id: 'email',
        label: 'Email Address',
        placeholder: 'Email...',
        autocomplete: 'email',
        validation: { required: 'Email is required', email: 'Please enter a valid email address' },
      },
      {
        type: 'text',
        id: 'phone',
        label: 'Phone',
        placeholder: 'Phone...',
        autocomplete: 'tel',
        validation: { required: 'Phone is required' },
      },
      {
        type: 'text',
        id: 'address',
        label: 'Address',
        placeholder: 'Address...',
        autocomplete: 'street-address',
        validation: { required: 'Address is required' },
      },
      {
        type: 'text',
        id: 'city',
        label: 'City',
        placeholder: 'City...',
        autocomplete: 'address-level2',
        validation: { required: 'City is required' },
      },
      {
        type: 'text',
        id: 'zip',
        label: 'ZIP Code',
        placeholder: 'ZIP...',
        autocomplete: 'postal-code',
        validation: { required: 'ZIP code is required' },
      }
    ];

    constructor(){
      
    }

    ngOnInit(): void {
      let localStr = localStorage.getItem('marketManduAuth');
      let local = localStr ? JSON.parse(localStr) : null;
      
      if (local && local.id) {
         this.cusService.CheckoutCart(local.id).subscribe({
          next: (res:any) => {
            this.toast.success('Geting Cart Data')
            console.log(res?.data)

            this.orderSummary.set({
  seletectItem: res?.data?.items,
  subtotal: res?.data?.totalPrice,
  itemCount: res?.data?.items.length,
  shippingFee: res?.data?.shippingFee,
  total: res?.data?.grandTotal
});


          },
          error: (err) => {
            this.toast.error('Unable to Get Data ')
          },
        })
      }
   
    //  console.log('data ', this.orderSummary)
     
    }


   

      getValidationKeys(validation: ValidationConfig): string[] {
        return Object.keys(validation);
      }



     


  onSameAsBillingChange(): void {
    if (this.sameAsBilling) {
      this.shippingForm.patchValue({
        firstName: this.billingForm.value.firstName,
        lastName: this.billingForm.value.lastName,
        phone: this.billingForm.value.phone,
        address: this.billingForm.value.address,
        city: this.billingForm.value.city,
        zip: this.billingForm.value.zip
      });
    } else {
      this.shippingForm.reset();
    }
  }

  validateStep1(): boolean {
    this.billingForm.markAllAsTouched();
    if (!this.sameAsBilling) {
      this.shippingForm.markAllAsTouched();
      return this.billingForm.valid && this.shippingForm.valid;
    }
    return this.billingForm.valid;
  }

  validateStep2(): boolean {
    this.paymentForm.markAllAsTouched();
    return this.paymentForm.valid;
  }

  onNextStep1(callback: any): void {
    if (this.validateStep1()) {
      callback(2);
    }
  }

  onNextStep2(callback: any): void {
    if (this.validateStep2()) {
      callback(3);
    }
  }

  onSubmit(): void {
    console.log('Order submitted!');
    console.log('Billing:', this.billingForm.value);
    console.log('Shipping:', this.sameAsBilling ? 'Same as billing' : this.shippingForm.value);
    console.log('Payment:', this.paymentForm.value);

    if(this.paymentForm.value?.paymentMethod.toLowerCase() ==='cod' ){
      let local = localStorage.getItem('marketManduAuth');
      let localDa = JSON.parse(local || 'null');
      if(localDa == null ){
        return ;
      }

    let orderItems: { productId: number; quantity: number }[] = [];
    this.orderSummary().seletectItem.map((item: any) => {
      orderItems.push({
        productId: item.id,
        quantity: item.quantity
      });
    });

      let data = {
        userId: localDa.id, 
        shippingAddress: {
          street: this.shippingForm.value.address,
          city: this.shippingForm.value.city,
          zip: this.shippingForm.value.zip,
          country: 'Nepal' 
        },
        billingAddress: {
          street: this.billingForm.value.address,
          city: this.billingForm.value.city,
          zip: this.billingForm.value.zip,
          country: 'Nepal' 
        },
        paymentMethod: this.paymentForm.value.paymentMethod,
        orderItems: orderItems
      };

      console.log('data => ', data )

      this.cusService.placeOrder(data).subscribe({
        next: (res:any) => {
          console.log('response => ', res)
          this.toast.loading(' Placcing Order ..  ')

          this.router.navigate(['/ordersuccess'], {
              queryParams: {
                orderNumber: res.data.orderNumber,
                amount: res.data.totalAmount
              }
            });
          
        },
        complete: () => {
          this.toast.success('Sucess fully Place order ')
        },
        error: (err) => {
          console.log('err => ', err)
          this.toast.error('Failed to Place Orders ')
        }
      })

    }

  }

  getErrorMessage(form: FormGroup, field: string): string {
    const control = form.get(field);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Invalid email format';
    }
    return '';
  }

  isFieldInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control?.invalid && control?.touched);
  }
}