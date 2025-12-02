import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ProductType } from '../../../core/models/product.model';
import { ProducetItem } from '../producet-item/producet-item';

@Component({
  selector: 'app-typecarousel',
  imports: [CarouselModule, ProducetItem, ],
  templateUrl: './typecarousel.html',
  styleUrl: './typecarousel.css',
})
export class Typecarousel  implements OnInit{

  @Input() productsItem: ProductType[] | undefined = [];
   @Input() autoplay: number = 3000; 

  

   products: any = [];

  responsiveOptions: any[] = [];

   
    ngOnInit() {
        this.products = this.productsItem;

       
       this.responsiveOptions = [
    {
      breakpoint: '1024px', 
      numVisible: 4,
      numScroll: 4
    },
    {
      breakpoint: '800px', 
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '640px', 
      numVisible: 2,
      numScroll: 2
    }
  ];

    }

    isMobile: boolean = window.innerWidth < 640;

@HostListener('window:resize', ['$event'])
onResize(event: any) {
  this.isMobile = event.target.innerWidth < 640;
}
    
}
