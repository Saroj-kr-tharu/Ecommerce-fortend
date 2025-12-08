import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { loginType, sucessLoginType } from '../../core/models/auth.model';


export const registerAction = createActionGroup({
    source: 'auth register api ',
    events: {   
        'register': props<{payload: loginType }>(), 
        'sucess register': emptyProps(),
        'failed register': emptyProps()
    }
})

export const loginAction = createActionGroup({
    source: 'auth login api', 
    events: {   
        'login': props<{payload: loginType }>(), 
        'sucess login': props <{payload: sucessLoginType}> (),
        'failed login': emptyProps()
    }

})

export const restoreSessionAction = createActionGroup({
    source: 'auth login api', 
    events: {   
        'restore session': props<{payload: sucessLoginType }>(), 
    }
})


export const logoutAction = createActionGroup({
    source: 'auth logout api', 
    events: {   
        'logout': emptyProps(), 
        'sucesslogout': emptyProps(),
        'faillogout': emptyProps()
    }

})