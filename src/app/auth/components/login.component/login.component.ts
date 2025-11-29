import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { FormSignin, ValidationConfig } from '../../../core/models/auth.model';


@Component({
  selector: 'app-login.component',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  
  toast = inject(HotToastService)
  router = inject(Router)
  
   signupForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), ]), 

      });

        
   signupFormConfig : FormSignin[] = [
    { type: 'email', id: 'email', label: 'Email Address', placeholder:'email ... ', autocomplete: 'email', validation: { 'required': 'Email is required', 'email': 'Please enter a valid email address' } },
    { type: 'password', id: 'password', label: 'password', placeholder:'password .. ', autocomplete: 'current-password', validation: { 'required': 'password is required', 'minlength': 'password must be at least 6 characters long' } },
  ];

  getValidationKeys(validation: ValidationConfig): string[] {
    return Object.keys(validation);
}

    onSaveUser(){

     

      const formValue = this.signupForm.value;
      console.log('form value ', formValue)
      
    }
}
