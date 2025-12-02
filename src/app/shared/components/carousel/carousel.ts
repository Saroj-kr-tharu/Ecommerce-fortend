import { Component, HostListener, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-carousel,',
  imports: [ CarouselModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel implements OnInit {
  offers = [
    {
      url: 'https://img.lazcdn.com/us/domino/07d758f3-7d50-4a82-94e5-abdd2ac9d3fe_NP-1976-688.jpg_2200x2200q80.jpg_.avif',
      title: 'Must buy',

    },
    {
      url: 'https://img.lazcdn.com/us/domino/c6aeb09c-a6ac-47b7-99cb-0782cbbcb43a_NP-1976-688.jpg_2200x2200q80.jpg_.avif',
      title: 'Best Price',
      
    },
    {
      url: 'https://img.lazcdn.com/us/domino/d5bca32c-70ca-4dbd-a8d4-84109f2c70c8_NP-1976-688.jpg_2200x2200q80.jpg_.avif',
      title: 'Fast Sale',
      
    },
    {
      url: 'https://img.lazcdn.com/us/domino/0fa3f0c7-0c45-4069-8035-f75ee6db3910_NP-1976-688.png_2200x2200q80.png_.avif',
      title: 'Free Delivery',
      
    },
    {
      url: 'https://img.lazcdn.com/us/domino/503717d3-d784-4385-81b2-c92982a67958_NP-1976-688.jpg_2200x2200q80.jpg_.avif',
      title: 'Fresh Deal',
      
    },
    {
      url: 'https://img.lazcdn.com/us/domino/93a4f8b1-a6f8-43a3-9c25-e10f7be14a5b_NP-1976-688.jpg_2200x2200q80.jpg_.avif',
      title: 'Early Birds',
      
    },
    {
      url: 'https://img.lazcdn.com/us/domino/5f1ef282-3dc5-4729-8493-6340fcd7d612_NP-1976-688.jpg_2200x2200q80.jpg_.avif',
      title: 'Beauty Station',
      
    },
    {
      url: 'https://img.lazcdn.com/us/domino/fb22e4c3-c283-4dc3-90b6-25cc2137ead8_NP-1976-688.jpg_2200x2200q80.jpg_.avif',
      title: 'Global Collections',
      
    },
  ]

   products: any = [];

  responsiveOptions: any[] = [];

   
    ngOnInit() {
        this.products = this.offers;

       
        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            }
        ]

    }

    isMobile: boolean = window.innerWidth < 640;

@HostListener('window:resize', ['$event'])
onResize(event: any) {
  this.isMobile = event.target.innerWidth < 640;
}
    

    

}
