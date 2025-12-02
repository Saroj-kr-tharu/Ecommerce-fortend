export  interface ValidationConfig {
  [key: string]: string;
}


export interface FormSignin {
      type: string;
  id: string;
  label: string;
  autocomplete: string;
  placeholder?: string;
  validation?: ValidationConfig;
}


export interface registerType {
  email: string;
  password: string;
  role?: string;
  username?: string;
}

export interface loginType {
  email: string;
  password: string;
}



export interface RegisterState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export interface sucessLoginType {
  email: string, 
  id: number , 
  role ?: string, 
  username?: string , 
  jwt: string 
}


export interface LoginState {
  loading: boolean;
  success: boolean;
  error: string | null;

  isAdmin : boolean, 
  isLogin: boolean, 
  users: sucessLoginType | null 
}


export interface errorType {
    
}