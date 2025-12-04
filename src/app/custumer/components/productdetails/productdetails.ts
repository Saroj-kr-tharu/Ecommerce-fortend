import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HotToastService } from '@ngxpert/hot-toast';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ClassNamesModule } from 'primeng/classnames';
import { RatingModule } from 'primeng/rating';
import { LoginState } from '../../../core/models/auth.model';
import { CartState } from '../../../core/models/cart.model';
import { ProductType } from '../../../core/models/product.model';
import { CusServices } from '../../../core/services/custumer/cus.services';
import { selectLogin } from '../../../store/auth/auth.selectors';
import { cartsAction } from '../../../store/custumer/cus.action';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbModule, RatingModule, ClassNamesModule],
   templateUrl: './productdetails.html',
  styleUrl: './productdetails.css',
})
export class Productdetails implements OnInit {

  // Signals
  product = signal<ProductType | null>(null);
  selectedImage = signal<string>('');
  quantity = signal<number>(1);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Computed signals
  ratingValue = computed(() => this.product()?.ratings || 0);

  // signal 
  loginState!: Signal<LoginState>;
  toast = inject(HotToastService);
  route = inject(ActivatedRoute)
  productService = inject(CusServices) ;
  router = inject(Router)

  
  breadcrumbItems = computed<MenuItem[]>(() => {
    const prod = this.product();
    if (!prod) return [{ label: 'Home', routerLink: '/' }];
    
    return [
      { label: 'Home', routerLink: '/' },
      { label: prod.category || 'Category', routerLink: '/products' },
      { label: prod.name }
    ];
  });

  constructor(
 
    private store: Store<{ LoginReducer: LoginState }> ,
    private cartStore: Store<{ CartReducer: CartState }>
  ) {
    this.loginState = this.store.selectSignal(selectLogin);

    // Effect to update selected image when product changes
    effect(() => {
      const prod = this.product();
      if (prod && prod.images && prod.images.length > 0) {
        this.selectedImage.set(prod.images[0]);
      }
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID from route:', productId);
    
    if (productId) {
      this.loadProduct(parseInt(productId));
    }
  }

  private loadProduct(id: number): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.productService.getProductByIdService(id).subscribe({
      next: (res:any) => {
        console.log('Product loaded:', res);
        this.product.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.error.set('Failed to load product');
        this.isLoading.set(false);
      }
    });
  }

  selectImage(image: string): void {
    this.selectedImage.set(image);
  }

  increaseQuantity(): void {
    const prod = this.product();
    const currentQty = this.quantity();
    
    if (prod && currentQty < (prod.stock || 99)) {
      this.quantity.set(currentQty + 1);
    }
  }

  decreaseQuantity(): void {
    const currentQty = this.quantity();
    if (currentQty > 1) {
      this.quantity.set(currentQty - 1);
    }
  }

  validateQuantity(): void {
    let currentQty = this.quantity();
    const prod = this.product();
    
    if (currentQty < 1) {
      this.quantity.set(1);
    } else if (prod && currentQty > (prod.stock || 99)) {
      this.quantity.set(prod.stock || 99);
    }
  }

  buyNow(): void {
    const prod = this.product();
    
    if (prod && prod.stock && prod.stock > 0) {
      console.log('Buy now:', prod, 'Quantity:', this.quantity());
       if(!this.loginState().isLogin){
        this.toast.warning(' Please Login  ');
        return;
      }

      this.addToCart()
      this.router.navigateByUrl('/cart')
      
      // this.toast.success(' buying ');
      // Implement buy now logic
    }
  }

  addToCart(): void {
    const prod = this.product();
    if (prod && prod.stock && prod.stock > 0) {

      console.log('Add to cart:', prod, 'Quantity:', this.quantity());
      if(!this.loginState().isLogin){
        this.toast.warning(' Please Login to add in  cart ');
        return;
      }

      const data = {
          id: prod.id,
          name: prod.name,
          price: prod.price,
          quantity: this.quantity(),
          brand:prod.brand,
          category:prod.category,
          selected:false,
          image:prod.images[0]
        }


      this.cartStore.dispatch(cartsAction.addItem({payload: data}))


      this.toast.success(' sucessfully added to Cart ');
      
    }
  }

  addToWishlist(): void {
    const prod = this.product();
    if (prod) {
      console.log('Add to wishlist:', prod);
      if(!this.loginState().isLogin){
        this.toast.warning(' Please Login ');
        return;
      }

      this.toast.success(' sucessfully added to WishList ');
      // Implement add to wishlist logic
    }
  }


}