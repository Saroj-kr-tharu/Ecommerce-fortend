export interface CategoryOption {
  name: string;
  value: string;
}

export interface FilterOptions {
  categories: CategoryOption[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

export interface SortOption {
  label: string;
  value: string;
}