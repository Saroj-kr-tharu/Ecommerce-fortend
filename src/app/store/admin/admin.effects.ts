// admin.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DashboardActions } from './admin.actions';

import { HotToastService } from '@ngxpert/hot-toast';
import { AdminService } from '../../core/services/admin/admin-service';

@Injectable()
export class DashboardEffects {

  private actions$ = inject(Actions);
  private adminService = inject(AdminService);
  private toast = inject(HotToastService);

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.load),
      switchMap(() =>
        forkJoin({
          users: this.adminService.getAllUsersService(),
          products: this.adminService.getAllProductService(),
          orders: this.adminService.getAllOrdersService(),
          
        }).pipe(
          map(({ users, products, orders }) =>
            DashboardActions.loadSuccess({ 
              users: users as any[], 
              products: products as any[], 
              orders: orders as any[] 
            })
          ),
          catchError(error => {
            this.toast.error('Failed to load Dashboard');
            return EMPTY;
          })
        )
      )
    )
  );
}