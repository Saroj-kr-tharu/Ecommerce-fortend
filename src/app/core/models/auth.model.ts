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