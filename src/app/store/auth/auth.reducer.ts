import { createReducer, on } from '@ngrx/store';
import { LoginState, RegisterState } from '../../core/models/auth.model';
import { loginAction, logoutAction, registerAction, restoreSessionAction } from './auth.actions';

const registerIntialState: RegisterState = {
  loading: false,
  success: false,
  error: null,
};



const loginIntialState: LoginState = {
  loading: false,
  success: false,
  error: null,

  isAdmin: false,
  isLogin: false,
  users: null,
};

export const registerReducer = createReducer(
  registerIntialState,
  on(registerAction.register, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: false,
  })),

  on(registerAction.sucessRegister, (state) => ({
    ...state,
    loading: false,
    error: null,
    success: true,
  })),

  on(registerAction.failedRegister, (state, action) => ({
    ...state,
    loading: false,
    error: 'error occered',
    success: false,
  }))
);

export const loginReducer = createReducer(
  loginIntialState,

  on(loginAction.login, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: false,

    isAdmin: false,
    isLogin: false,
    users: null,
  })),

  on(loginAction.sucessLogin, (state, action) => {
    // console.log('successfull => ', action?.payload)

    const data = {
      loading: false,
      error: null,
      success: true,
      isAdmin: action?.payload.role?.toLowerCase() === 'admin' ? true : false,
      isLogin: true,
      users: action?.payload,
    };

    localStorage.setItem('marketManduAuth', JSON.stringify(action?.payload));

    return data;
  }),

  on(loginAction.failedLogin, (state, action) => ({
    ...state,
    loading: false,
    error: 'error occered',
    success: false,
    isAdmin: false,
    isLogin: false,
    users: null,
  })),


  on(restoreSessionAction.restoreSession, (state, action) => {
    console.log('Restore session reducer fired', action);
    // console.log('action => ', action?.payload)
    const data = {
      ...state,
      users: action?.payload,
      loading: false,
      error: null,

      success: true,
      isAdmin: action?.payload.role?.toLowerCase() === 'admin' ? true : false,
      isLogin: true,
    };

    return data;
  }),


   on(logoutAction.sucesslogout, (state) => {
    console.log('hhelo => ', )
    console.log("Logout sucess reducer fired");

    localStorage.removeItem('marketManduAuth');
    const data = {
      ...state, 
      loading: false,
      error: null,
      success: true,
      isAdmin: false,
      isLogin: false,
      users: null,
    };

    return data;
  }),

   on(logoutAction.logout, (state) => {
   
    console.log("Logout reducer fired");

    
    const data = {
      ...state,
      loading: true
    };

    return data;
  }),
   


);
