import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { DrawerModule } from 'primeng/drawer';
import { InputNumberModule } from 'primeng/inputnumber';
import type { PaginatorState } from 'primeng/paginator';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { loadProductInitalType, ProductType } from '../../../core/models/product.model';
import { ProducetItem } from "../../../shared/components/producet-item/producet-item";
import { getAllProductsAction } from '../../../store/custumer/cus.action';
import { selectGetAllProduct } from '../../../store/custumer/cus.selectors';

interface CategoryOption {
  name: string;
  value: string;
}

interface FilterOptions {
  categories: CategoryOption[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

interface SortOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginatorModule,
    CheckboxModule,
    AutoCompleteModule,
    ButtonModule,
    CardModule,
    RatingModule,
    DataViewModule,
    DrawerModule,
    RouterLink,
    ProducetItem,
    SelectModule,
    InputNumberModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  
  searchQuery: any = signal('');
  layout: 'grid' | 'list' = 'grid';
  drawerVisible = false;

  router = inject(Router);
  route = inject(ActivatedRoute);

  productState!: Signal<ProductType[]>;
  allState!: Signal<loadProductInitalType>;

  first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;



  
  sortOptions: SortOption[] = [
    { label: 'Best Match', value: 'best' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
  ];
  selectedSort: SortOption = this.sortOptions[0];
  filteredSortOptions: SortOption[] = [];
  
  filterOptions: FilterOptions = {
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 0,
    minRating: 0
  };
  
  selectedCategory: CategoryOption | null = null;
  selectedBrands: string[] = [];
  minPriceInput: number = 0;
  maxPriceInput: number = 0;
  selectedRating: number = 0;
  
  products: ProductType[] | undefined = [];
  keyword: string | null = null;
  sort: string | null = null;
  page: string | null = null;
  category: string | null = null;
  maxPrice: string | null = null;
  minPrice: string | null = null;

  constructor(
    private store: Store<{ GetAllProductsReducer: loadProductInitalType }>
  ) {
    this.allState = this.store.selectSignal(selectGetAllProduct);
    
    effect(() => {
     
      this.products = this.allState().data;

      const categories = Array.from(
        new Set(
          (this.products || [])
            .map(p => (p as any)?.category)
            .filter((c: string | undefined) => !!c)
        )
      ).map((c: string) => ({ name: c, value: c }));

      const brands = Array.from(
        new Set(
          (this.products || [])
            .map(p => (p as any)?.brand)
            .filter((b: string | undefined) => !!b)
        )
      );

       this.filterOptions.categories = categories;
      this.filterOptions.brands = brands;
     
    });
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      this.keyword = params['q'];
      this.category = params['category'] || null;
      this.sort = params['sort'] || 'best';
      this.page = params['page'] || '1';
      this.minPrice = params['min'] || null;
      this.maxPrice = params['max'] || null;

      // Initialize UI filters from query params
      if (this.category) {
          this.selectedCategory = this.filterOptions.categories.find(
          cat => cat.value === this.category
        ) || null;
      }
      if (this.minPrice) this.minPriceInput = Number(this.minPrice);
      if (this.maxPrice) this.maxPriceInput = Number(this.maxPrice);
      if (this.sort) {
        this.selectedSort = this.sortOptions.find(
          opt => opt.value === this.sort
        ) || this.sortOptions[0];
      }
      
      // Load products with filters
      this.loadProducts();
    });

    this.searchQuery.set(this.keyword);

    
  }

  // Single function to load products with all filters
  loadProducts(): void {
    const payload: any = {
      title: this.keyword,
      limit: 10,
      page: Number(this.page) || 1
    };

    // Add optional filters
    if (this.selectedCategory) {
      payload.category = this.selectedCategory.value;
    }
    
    if (this.selectedBrands.length > 0) {
      payload.brand = this.selectedBrands[0];
    }
    
    if (this.minPriceInput > 0) {
      payload.minPrice = this.minPriceInput;
    }
    
    if (this.maxPriceInput > 0) {
      payload.maxPrice = this.maxPriceInput;
    }
    
    if (this.selectedRating > 0) {
      payload.rating = this.selectedRating;
    }
    
    if (this.selectedSort) {
      payload.sort = this.selectedSort.value;
    }

    console.log('Dispatching with payload:', payload);
    this.store.dispatch(getAllProductsAction.load({ payload }));
    effect(() => {
      this.products = this.allState().data;
    });
    
    // Update URL with filter params
    this.updateQueryParams();
  }

  // Update URL query params
  updateQueryParams(): void {
    const queryParams: any = {
      q: this.keyword,
      page: this.page || '1'
    };

    if (this.selectedCategory) {
      queryParams.category = this.selectedCategory.value;
    }
    
    if (this.selectedSort.value !== 'best') {
      queryParams.sort = this.selectedSort.value;
    }
    
    if (this.minPriceInput > 0) {
      queryParams.min = this.minPriceInput;
    }
    
    if (this.maxPriceInput < 5000) {
      queryParams.max = this.maxPriceInput;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      // queryParamsHandling: 'merge'
    });
  }

  // Search/Filter for sort autocomplete
  searchSort(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredSortOptions = this.sortOptions.filter(option => 
      option.label.toLowerCase().includes(query)
    );
  }

  // Handle sort selection
  onSortSelect(event: any): void {
    console.log('Sort Selected:', event.value);
    this.selectedSort = event.value;
    this.loadProducts();
  }

  // Handle category selection
  onCategoryChange(): void {
    console.log('Category Changed:', this.selectedCategory);
    this.loadProducts();
  }

  // Handle brand checkbox change
  onBrandChange(): void {
    console.log('Brands Selected:', this.selectedBrands);
    this.loadProducts();
  }

  // Handle min price change
  onMinPriceChange(): void {
    console.log('Min Price Changed:', this.minPriceInput);
    // if (this.minPriceInput > this.maxPriceInput) {
    //   this.minPriceInput = this.maxPriceInput;
    // }
    this.loadProducts();
  }

  // Handle max price change
  onMaxPriceChange(): void {
    console.log('Max Price Changed:', this.maxPriceInput);
    if (this.maxPriceInput < this.minPriceInput) {
      this.maxPriceInput = this.minPriceInput;
    }
    this.loadProducts();
  }

  // Handle rating selection
  onRatingChange(rating: number): void {
    this.selectedRating = rating;
    console.log('Rating Selected:', rating);
    this.loadProducts();
  }

  // Apply all filters
  applyFilters(): void {
    console.log('Applying Filters...');
    this.loadProducts();
    this.drawerVisible = false; // Close drawer after applying
  }

  // Clear all filters
  clearAllFilters(): void {
    console.log('Clearing All Filters');
    this.selectedCategory = null;
    this.selectedBrands = [];
    this.minPriceInput = this.filterOptions.minPrice;
    this.maxPriceInput = this.filterOptions.maxPrice;
    this.selectedRating = 0;
    this.selectedSort = this.sortOptions[0];
    this.loadProducts();
  }

  // Check if any filters are active
  hasActiveFilters(): boolean {
    return this.selectedCategory !== null || 
           this.selectedBrands.length > 0 ||
           this.minPriceInput !== this.filterOptions.minPrice ||
           this.maxPriceInput !== this.filterOptions.maxPrice ||
           this.selectedRating > 0;
  }

  // Remove category filter
  removeCategory(): void {
    console.log('Removing Category Filter');
    this.selectedCategory = null;
    this.loadProducts();
  }

  // Remove brand filter
  removeBrand(brand: string): void {
    console.log('Removing Brand:', brand);
    this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
    this.loadProducts();
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