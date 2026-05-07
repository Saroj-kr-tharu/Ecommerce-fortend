import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { AdminService } from '../../../core/services/admin/admin-service';


@Component({
  selector: 'app-carousel,',
  imports: [ CarouselModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel implements OnInit {
  adminService = inject(AdminService)
  router = inject(Router)
 
  products = signal<any[]>([]);;
  responsiveOptions: any[] = [];

   
    ngOnInit() {
        this.loadInitialData();
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
    loadInitialData() {
    this.adminService.getAllBanner().subscribe({
           next: (res: any) => {
              const now = new Date();
              const activebanners = res?.data?.filter((banner: any) => 
                banner.isActive === true &&
                new Date(banner.startDate) <= now &&
                new Date(banner.endDate) >= now
              );
              this.products.set(activebanners);
              
            },
            error: () => {
             console.log("Failed to get banners")
           }
      });
    }
    isMobile: boolean = window.innerWidth < 640;


     navigate(redirectUrl: string) {
    if (!redirectUrl) return;

    try {
      const url = new URL(redirectUrl);
      // Same origin → use Angular router to avoid full page reload
      if (url.origin === window.location.origin) {
        this.router.navigateByUrl(url.pathname + url.search);
      } else {
        window.open(redirectUrl, '_blank', 'noopener');
      }
    } catch {
      // Relative URL fallback
      this.router.navigateByUrl(redirectUrl);
    }
  }

  

@HostListener('window:resize', ['$event'])
onResize(event: any) {
  this.isMobile = event.target.innerWidth < 640;
}
    

    

}
