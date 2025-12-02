
import { Component, effect, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import type { PaginatorState } from 'primeng/paginator';
import { PaginatorModule } from 'primeng/paginator';
import { loadProductInitalType, ProductType } from '../../../core/models/product.model';
import { Carousel } from "../../../shared/components/carousel/carousel";
import { ProducetItem } from "../../../shared/components/producet-item/producet-item";
import { Typecarousel } from "../../../shared/components/typecarousel/typecarousel";
import { getAllProductsAction } from '../../../store/custumer/cus.action';
import { selectGetAllProduct } from '../../../store/custumer/cus.selectors';


@Component({
  selector: 'app-cus.home',
  imports: [Carousel, Typecarousel, ProducetItem,PaginatorModule],
  templateUrl: './cus.home.html',
  styleUrl: './cus.home.css',
})
export class CusHome   {


  
  products :ProductType[] |undefined =[]
  
    first: number = 0;

    rows: number = 10;

    productState !: Signal<ProductType[]>;
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

                
            });
        }

        ngOnInit(): void {
            const  data = {
              limit: 10, 
              page: 1, 
            }
            this.store.dispatch( getAllProductsAction.load({payload : data}))

           

        }

   onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    // calculate current page number
    const page = Math.floor(this.first / this.rows) + 1;

    const data = {
      limit: this.rows, // rows per page
      page: page,       // current page
    };

    this.store.dispatch(getAllProductsAction.load({ payload: data }));
  }

    
  
  


}
