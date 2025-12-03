import { Component, inject, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HotToastService } from '@ngxpert/hot-toast';
import { ProgressSpinner } from 'primeng/progressspinner';
import { FormSignin, LoginState, ValidationConfig } from '../../../core/models/auth.model';
import { AuthServices } from '../../../core/services/auth/auth-services';
import { loginAction } from '../../../store/auth/auth.actions';
import { selectLogin } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-login.component',
  imports: [ReactiveFormsModule,ProgressSpinner ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  toast = inject(HotToastService);
  router = inject(Router);
  authsevice= inject(AuthServices)

  loginState: Signal<LoginState>;

  constructor(private store: Store<{ LoginReducer: LoginState }>) {
    this.loginState = this.store.selectSignal(selectLogin);
  }

  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  signupFormConfig: FormSignin[] = [
    {
      type: 'email',
      id: 'email',
      label: 'Email Address',
      placeholder: 'email ... ',
      autocomplete: 'email',
      validation: { required: 'Email is required', email: 'Please enter a valid email address' },
    },
    {
      type: 'password',
      id: 'password',
      label: 'password',
      placeholder: 'password .. ',
      autocomplete: 'current-password',
      validation: {
        required: 'password is required',
        minlength: 'password must be at least 6 characters long',
      },
    },
  ];

  getValidationKeys(validation: ValidationConfig): string[] {
    return Object.keys(validation);
  }

  onSaveUser() {
    if (this.signupForm.invalid || this.loginState().loading) {
      console.log('form is invalid ');
      return;
    }

    const formValue = this.signupForm.value;

    const data = {
      email: formValue.email,
      password: formValue.password,
    };
    this.signupForm.markAllAsTouched();

 
    
    this.store.dispatch(loginAction.login({ payload: data }));

    this.signupForm.reset();

    

  }
}
