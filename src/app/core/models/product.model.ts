export interface ProductType {
    count?:number,
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
    totalRecords: number,
    success: boolean;
    data?: ProductType[] ;
}

export interface sucessProductLoadType {
     count: number,
    rows: ProductType[]
}

export interface sucessProductLoadOriginType {
     
    message: string;
    success: boolean;
    data: ProductType;
    err: Record<string, unknown>;

}