import { createReducer, on } from "@ngrx/store";
import { LoginState, RegisterState } from '../../core/models/auth.model';
import { loginAction, logoutAction, registerAction } from './auth.actions';


const registerIntialState : RegisterState  = {
    loading: false,
    success: false,
    error: null,
}

const logoutIntialState : RegisterState  = {
    loading: false,
    success: false,
    error: null,
}

const loginIntialState : LoginState = {
        loading: false,
        success: false,
        error: null,

        isAdmin: false, 
        isLogin: false, 
        users: null 

}

export const registerReducer = createReducer(
    registerIntialState, 
    on(registerAction.register,  (state) => ({
            ...state,
            loading: true,
            error: null,
            success: false
    })),

    on(registerAction.sucessRegister,  (state) => ({
            ...state,
            loading: false,
            error: null,
            success: true
    })),

     on(registerAction.failedRegister,  (state, action) => ({
            ...state,
            loading: false,
            error: 'error occered' ,
            success: false
    })),


    
)


export const loginReducer = createReducer(
    loginIntialState, 

    on(loginAction.login,  (state) => ({
            ...state,
            loading: true,
            error: null,
            success: false,

            isAdmin: false, 
            isLogin: false, 
            users: null 
    })),

    on(loginAction.sucessLogin,  (state, action ) => {

        console.log('successfull => ', action?.payload)

        
        
        const data = {
            loading: false,
            error: null,
            success: true,
            isAdmin: action?.payload.role?.toLowerCase() === 'admin' ? true : false,                 
            isLogin: true, 
            users: action?.payload 
        }

        localStorage.setItem('marketManduAuth', JSON.stringify(action?.payload))

        return data 

    }),

     on(loginAction.failedLogin,  (state, action) => ({
            ...state,
            loading: false,
            error: 'error occered' ,
            success: false,
            isAdmin: false, 
            isLogin: false, 
            users: null 
    })),


    on(logoutAction.logout,  (state ) => {

        const data = {
            loading: false,
            error: null,
            success: true,
            isAdmin: false,                 
            isLogin: false, 
            users: null 
        }
       localStorage.removeItem('marketManduAuth');

        return data 

    }),


    
)




