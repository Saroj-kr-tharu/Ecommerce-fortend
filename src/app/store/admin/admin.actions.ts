// admin.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const DashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load': emptyProps(), 
    'Load Success': props<{ users: any; products: any; orders: any }>(),
  }
});
