import { createFeatureSelector } from "@ngrx/store";
import { LoginState, RegisterState } from "../../core/models/auth.model";


export const selectRegister = createFeatureSelector <RegisterState> ('RegisterReducer');
export const selectLogin = createFeatureSelector <LoginState> ('LoginReducer');

