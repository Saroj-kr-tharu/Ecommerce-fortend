
import { Component, effect, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import type { PaginatorState } from 'primeng/paginator';
import { PaginatorModule } from 'primeng/paginator';
import { loadProductInitalType, ProductType } from '../../../core/models/product.model';
import { Carousel } from "../../../shared/components/carousel/carousel";
import { ProducetItem } from "../../../shared/components/producet-item/producet-item";
import { getAllProductsAction, getcartsAction } from '../../../store/custumer/cus.action';
import { selectGetAllProduct } from '../../../store/custumer/cus.selectors';



@Component({
  selector: 'app-cus.home',
  imports: [Carousel, ProducetItem,PaginatorModule, RouterLink],
  templateUrl: './cus.home.html',
  styleUrl: './cus.home.css',
})
export class CusHome implements OnInit  {

  
  
  products :ProductType[] |undefined =[]
  
    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;
    

    allState !: Signal<loadProductInitalType> ;

    bannerOffers = [
                  {title: 'Best Seller', items: this.products , },
                  {title: 'Popular Items', items: this.products , },
                  {title: 'Categories', items: this.products , },
                ]
    
     constructor(private store: Store<{GetAllProductsReducer : loadProductInitalType }> ) {


            this.allState = this.store.selectSignal(selectGetAllProduct)

             effect(() => {
                console.log('products updated => ', this.allState().data);
                this.products = this.allState().data;
                this.totalRecords = this.allState().totalRecords;
                
            });


        }

        ngOnInit(): void {
            
          
          const  data = {
              limit: this.rows, 
              page: 1, 
            }
            this.store.dispatch( getAllProductsAction.load({payload : data}))
            const localStr = localStorage.getItem('marketManduAuth');
            let local: { id?: number } | null = null;

            local = localStr ? JSON.parse(localStr) : null;

            if (local && local.id) {
              let user = { userId: local.id };
              this.store.dispatch(getcartsAction.getCart({ payload: user }));
            }

           

        }

   onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    const page = Math.floor(this.first / this.rows) + 1;
 
    const data = {
      limit: this.rows, 
      page: page,       
    };

    this.store.dispatch(getAllProductsAction.load({ payload: data }));
  }

    
  
  


}
