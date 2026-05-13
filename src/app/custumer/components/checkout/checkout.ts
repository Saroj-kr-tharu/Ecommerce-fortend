
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepperModule } from 'primeng/stepper';
import { v4 as uuidv4 } from 'uuid';
import { ValidationConfig } from '../../../core/models/auth.model';
import { orderSummary } from '../../../core/models/order.model';
import { CusServices } from '../../../core/services/custumer/cus.services';
import { Navigation } from '../../../core/services/custumer/navigation';
import { Payment } from '../../../core/services/payment/payment';
import { environment } from '../../../environments/environment.development';


interface FormFieldConfig {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  validation: ValidationConfig;  
}

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
  paymentService = inject(Payment);
  toast = inject(HotToastService);
  navigation = inject(Navigation)

  

  //  Form Config 
billingFormConfig :FormFieldConfig[] = [
  {
    id: 'firstName', label: 'First Name', type: 'text',
    placeholder: 'John',
    validation: {
      required:   'First name is required.',
      minlength:  'Minimum 2 characters.',
      maxlength:  'Maximum 50 characters.',
      pattern:    'Only letters, spaces, hyphens allowed.'
    }
  },
  {
    id: 'lastName', label: 'Last Name', type: 'text',
    placeholder: 'Doe',
    validation: {
      required:  'Last name is required.',
      minlength: 'Minimum 2 characters.',
      maxlength: 'Maximum 50 characters.',
      pattern:   'Only letters, spaces, hyphens allowed.'
    }
  },
  {
    id: 'email', label: 'Email', type: 'email',
    placeholder: 'john@example.com',
    validation: {
      required:  'Email is required.',
      email:     'Enter a valid email.',
      maxlength: 'Maximum 100 characters.',
      pattern:   'Invalid email format.'
    }
  },
  {
    id: 'phone', label: 'Phone', type: 'tel',
    placeholder: '+977-9800000000',
    validation: {
      required:  'Phone number is required.',
      minlength: 'Minimum 7 digits.',
      maxlength: 'Maximum 15 digits.',
      pattern:   'Only digits, +, -, () allowed.'
    }
  },
  {
    id: 'address', label: 'Address', type: 'text',
    placeholder: '123 Main Street',
    validation: {
      required:  'Address is required.',
      minlength: 'Minimum 5 characters.',
      maxlength: 'Maximum 150 characters.',
      pattern:   'Invalid address characters.'
    }
  },
  {
    id: 'city', label: 'City', type: 'text',
    placeholder: 'Kathmandu',
    validation: {
      required:  'City is required.',
      minlength: 'Minimum 2 characters.',
      maxlength: 'Maximum 100 characters.',
      pattern:   'Only letters and spaces allowed.'
    }
  },
  {
    id: 'zip', label: 'ZIP Code', type: 'text',
    placeholder: '44600',
    validation: {
      required:  'ZIP code is required.',
      minlength: 'Minimum 4 digits.',
      maxlength: 'Maximum 10 characters.',
      pattern:   'Enter valid ZIP (e.g. 44600 or 44600-1234).'
    }
  }
];

//  Billing Form 
billingForm: FormGroup = new FormGroup({
  firstName: new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(50),  Validators.pattern(/^[a-zA-Z\s'-]+$/)]),
  lastName:  new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(50),  Validators.pattern(/^[a-zA-Z\s'-]+$/)]),
  email:     new FormControl('', [Validators.required, Validators.email,         Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/)]),
  phone:     new FormControl('', [Validators.required, Validators.minLength(7),  Validators.maxLength(15),  Validators.pattern(/^\+?[0-9\s\-().]{7,15}$/)]),
  address:   new FormControl('', [Validators.required, Validators.minLength(5),  Validators.maxLength(150), Validators.pattern(/^[a-zA-Z0-9\s,.\-#/]+$/)]),
  city:      new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(100), Validators.pattern(/^[a-zA-Z\s\-'.]+$/)]),
  zip:       new FormControl('', [Validators.required, Validators.minLength(4),  Validators.maxLength(10),  Validators.pattern(/^[0-9]{4,6}(-[0-9]{4})?$/)])
});

//  Shipping Form 
shippingForm: FormGroup = new FormGroup({
  firstName: new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(50),  Validators.pattern(/^[a-zA-Z\s'-]+$/)]),
  lastName:  new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(50),  Validators.pattern(/^[a-zA-Z\s'-]+$/)]),
  phone:     new FormControl('', [Validators.required, Validators.minLength(7),  Validators.maxLength(15),  Validators.pattern(/^\+?[0-9\s\-().]{7,15}$/)]),
  address:   new FormControl('', [Validators.required, Validators.minLength(5),  Validators.maxLength(150), Validators.pattern(/^[a-zA-Z0-9\s,.\-#/]+$/)]),
  city:      new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(100), Validators.pattern(/^[a-zA-Z\s\-'.]+$/)]),
  zip:       new FormControl('', [Validators.required, Validators.minLength(4),  Validators.maxLength(10),  Validators.pattern(/^[0-9]{4,6}(-[0-9]{4})?$/)])
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
  isBuyNow = signal(false)
  orderSummary = signal<orderSummary>({
    seletectItem: [],
    subtotal: 0,
    itemCount: 0,
    shippingFee: 0,
    total: 0
  });



    constructor(private route: ActivatedRoute){
      this.orderSummary.set(this.cusService.getOrderSummary() ) ;
      const buyNow = this.route.snapshot.paramMap.get('buynow'); 
      if(buyNow == 'BuyNow'){
        this.isBuyNow.set(true);
      }

    }

    ngOnInit(): void {
      this.orderSummary.set(this.cusService.getOrderSummary() ) ;
      // console.log('order=> ',this.orderSummary());
    }

      getValidationKeys(validation: ValidationConfig): string[] {
        return Object.keys(validation).filter(key => validation[key] !== undefined);
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
  
  canNavigateToStep(targetStep: number): boolean {
    if (targetStep <= this.activeStep) return true; 

    if (targetStep >= 2 && !this.validateStep1()) return false;
    if (targetStep >= 3 && !this.validateStep2()) return false;

    return true;
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
    if (
      !this.billingForm.value.firstName &&
      !this.billingForm.value.lastName &&
      !this.billingForm.value.email &&
      !this.billingForm.value.phone &&
      !this.billingForm.value.address &&
      !this.billingForm.value.city &&
      !this.billingForm.value.zip
    ) {
      this.toast.error('Billing form is empty');
      return;
    }
    if (
      !this.sameAsBilling &&
      !this.shippingForm.value.firstName &&
      !this.shippingForm.value.lastName &&
      !this.shippingForm.value.phone &&
      !this.shippingForm.value.address &&
      !this.shippingForm.value.city &&
      !this.shippingForm.value.zip
    ) {
      this.toast.error('Shipping form is empty');
      return;
    }
    if (!this.paymentForm.value.paymentMethod) {
      this.toast.error('Payment method is not selected');
      return;
    }

      let local = localStorage.getItem('marketManduAuth');
      let localDa = JSON.parse(local || 'null');
      if(localDa == null ) return ; 

    let orderItems: { productId: number; quantity: number }[] = [];
    this.orderSummary().seletectItem.map((item: any) => {
          orderItems.push({
            productId:   item.productId,
            quantity: item.quantity
          });

        });

      const idempotencyKey = uuidv4();
      let data = {
        idempotencyKey: idempotencyKey,
        userId: localDa.id, 
        userEmail: localDa.email,
        gateway: this.paymentForm.value.paymentMethod,
        paymentMethod: this.paymentForm.value.paymentMethod,
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
        orderItems: orderItems,
  
      };

    if(this.paymentForm.value?.paymentMethod.toLowerCase() ==='cod' ){   
      this.cusService.placeOrder(data).subscribe({
        next: (res:any) => {
          this.toast.loading(' Placcing Order ..  ')
          const url = res?.data.data;
          window.location.href = url;
        },
       
        error: (err) => {
          console.log('err => ', err)
          this.toast.error('Failed to Place Orders ')
        }
      })
    }

    if(this.paymentForm.value?.paymentMethod.toLowerCase() ==='stripe' ){   
      this.paymentService.paymentIntialize(data)
      .subscribe({
        next: (res:any) => {
          this.toast.loading(' Placcing Order ..  ')
          
          const url = res?.data.data;
             window.location.href = url;
        },
       
        error: (err) => {
          console.log('err => ', err)
          this.toast.error('Failed to Place Orders ')
        }
      })
    }


    if(this.paymentForm.value?.paymentMethod.toLowerCase() ==='khalti' ){   
      this.paymentService.paymentIntialize(data)
      .subscribe({
        next: (res:any) => {
          const url = res?.data.data.payment_url;
          window.location.href = url;
        },
      
        error: (err) => {
          console.log('err => ', err)
          this.toast.error('Failed to Place Orders ')
        }
      })
    }



    if(this.paymentForm.value?.paymentMethod.toLowerCase() ==='esewa' ){  
      
      // Create and submit a form programmatically 
       const   submitPayment = (data: any): void =>  {
          const form = document.createElement('form');
          form.method = 'POST'; 
          form.action = environment.esewa_url; 
          form.target = '_blank';
          
          Object.keys(data).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
          });
 
          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);
        }

       this.paymentService.paymentIntialize(data).subscribe({
        next: (res:any) => {
          let initalizeEsewadata = res?.data?.data;
          this.toast.loading('Placing Order ... ')

           let finalDataesewa = {
            amount: initalizeEsewadata?.amount, 
            tax_amount: 0,
            total_amount:initalizeEsewadata?.amount , 
            transaction_uuid: initalizeEsewadata.transactionId,  
            product_code: 'EPAYTEST' ,
            product_service_charge: 0,
            product_delivery_charge: 0,  
            success_url: `${environment.PAYMENT_BACKEND_URL}/complete-payment`,
            failure_url: "https://developer.esewa.com.np/failure", 
            signed_field_names:  "total_amount,transaction_uuid,product_code", 
            signature: initalizeEsewadata.hash.signature,
            secret: environment.esewa_secret, 
           }
          //  console.log('final => ', finalDataesewa)
           submitPayment(finalDataesewa)
          
          
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