
import { Component } from '@angular/core';
import type { PaginatorState } from 'primeng/paginator';
import { PaginatorModule } from 'primeng/paginator';
import { ProductType } from '../../../core/models/product.model';
import { Carousel } from "../../../shared/components/carousel/carousel";
import { ProducetItem } from "../../../shared/components/producet-item/producet-item";
import { Typecarousel } from "../../../shared/components/typecarousel/typecarousel";


@Component({
  selector: 'app-cus.home',
  imports: [Carousel, Typecarousel, ProducetItem,PaginatorModule],
  templateUrl: './cus.home.html',
  styleUrl: './cus.home.css',
})
export class CusHome   {

  products :ProductType[] = [
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },
    {
      brand: 'watch'  , 
      category : 'Electronics'  , 
      description:'Fire-Boltt Gladiator + 1.96” AMOLED Display Luxury Smartwatch with Silicone Strap, Rotating Crown, 115+ Sports Modes & Bluetooth Calling, AI Voice Assistant, Gaming' , 
      id:1 , 
      images:['https://img.drz.lazcdn.com/static/np/p/630f5773e948955019d08dfc5257cf5e.jpg_400x400q80.jpg_.avif'] , 
      isActive:true , 
      name: 'Fire-Boltt Gladiator', 
      price: 1299.99 , 
      stock: 12, 
      totalRatings: 10 , 
      ratings:3 , 
      
    },

  ]
  
  
 
  
    first: number = 0;

    rows: number = 10;

    // productState: Signal<ProductType[]>;

    
    //  constructor(private store: Store<{GetAllProductsReducer : loadProductInitalType }> ) {
    //         this.productState = this.store.selectSignal(selectGetAllProduct)
    //         console.log('products => ', this.productState())
    //     }

    //     ngOnInit(): void {
    //         const  data = {
    //           limit: 5, 
    //           page: 1, 
    //         }
    //         this.store.dispatch( getAllProductsAction.load({payload : data}))

    //     }

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;

        console.log('pagination occured => ', )
    }

    
  
  


}
