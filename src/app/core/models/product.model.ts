export interface ProductType {
   
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    brand: string;
    stock: number;
    images: string[];
    ratings?: number | null;
    totalRatings?: number | null;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}


export interface loadProductType {
    limit?:number, 
    page?:number, 
    category?:string, 
    minPrice?:number, 
    maxPrice?:number, 
    brand?:string, 
    rating?:number, 
}

export interface loadProductInitalType {
    loading: boolean;
    error: string | null;
    success: boolean;
    data?: ProductType[] ;
}