import { Component, inject, Signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators, } from '@angular/forms';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormSignin, RegisterState, ValidationConfig } from '../../../core/models/auth.model';

import { registerAction } from '../../../store/auth/auth.actions';
import { selectRegister } from '../../../store/auth/auth.selectors';

import { ProgressSpinner } from 'primeng/progressspinner';


@Component({
  selector: 'app-register.component',
  imports: [ReactiveFormsModule, ProgressSpinner],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent  {

    rotuer = inject(Router)
    // registerState: Observable<RegisterState>;
    registerState: Signal<RegisterState>;

    constructor(private store: Store<{RegisterReducer : RegisterState }> ) {
      this.registerState = this.store.selectSignal(selectRegister);
    }
    
    
    
    passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const repeatPassword = control.get('repeatpassword');
        
        if (!password || !repeatPassword) {
          console.log(`password => ${password} and repeat => ${repeatPassword} `)
            return null;
        }
        
        return password.value === repeatPassword.value ? null : { passwordMismatch: true };
    };

    // Custom validator for repeat password field
    repeatPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        if (!this.signupForm) return null;
        
        const password = this.signupForm.get('password');
        if (!password) return null;
        
        return password.value === control.value ? null : { passwordMismatch: true };
    };
    
      signupForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]), 
        username: new FormControl('', [Validators.required, Validators.minLength(2)]),
        repeatpassword: new FormControl('', [
            Validators.required, 
            Validators.minLength(6),
            this.repeatPasswordValidator
        ]),
      }, { validators: this.passwordMatchValidator });

        
   signupFormConfig : FormSignin[] = [
    { type: 'email', id: 'email', label: 'email Address', placeholder:'Enter email ... ', autocomplete: 'email', validation: { 'required': 'email is required', 'email': 'Please enter a valid email address' } },
    { type: 'text', id: 'username', label: 'Username', placeholder:'Enter username ..', autocomplete: 'name', validation: {'required': 'username is required', 'minlength':'minlength 2 char '} },
    { type: 'password', id: 'password', label: 'Password', placeholder:'Enter password .. ', autocomplete: 'current-password', validation: { 'required': 'Password is required', 'minlength': 'Password must be at least 6 characters long' } },
    { type: 'password', id: 'repeatpassword', label: 'Repeat Password', placeholder:'Repeat password .. ', autocomplete: 'current-password', validation: { 'required': 'Password is required', 'minlength': 'Password must be at least 6 characters long', 'passwordMismatch': 'Passwords do not match' } },
    
  ];



  get passwordMismatch() {
  return (this.signupForm.hasError('passwordMismatch') || this.signupForm.get('repeatpassword')?.hasError('passwordMismatch')) && 
         (this.signupForm.get('password')?.touched || this.signupForm.get('repeatpassword')?.touched);
  }


  markFormGroupTouched() {
        Object.keys(this.signupForm.controls).forEach(field => {
            const control = this.signupForm.get(field);
            control?.markAsTouched({ onlySelf: true });
        });
    }


  getValidationKeys(validation: ValidationConfig): string[] {
    return Object.keys(validation);
  }

  

    onSaveUser(){
      const formValue = this.signupForm.value;
        const data = {
        email: formValue.email, 
        password: formValue.password,
        username: formValue.username,
      }

      this.store.dispatch(registerAction.register({payload : data}))
      
      this.signupForm.reset();
    
    }

}
