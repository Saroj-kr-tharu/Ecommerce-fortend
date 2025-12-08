import { createReducer, on } from "@ngrx/store";
import { loadProductInitalType } from "../../core/models/product.model";
import { getAllProductsAction } from "./cus.action";



const productIntialState: loadProductInitalType = {
    brand: [], 
    category: [], 
    loading: false,
    error: null,
    success: false,
    totalRecords: 0,
    data: [] 
};




export const getProductReducer = createReducer(
    productIntialState, 
    on(getAllProductsAction.load,  (state) => ({
            ...state,
            loading: true,
            error: null,
            totalRecords: 0,
            success: false,
             data: []
    })),

    on(getAllProductsAction.sucessLoading, (state, action) => {

           

          const DisplayData = action?.payload?.rows.filter((item) => item.isActive === true)
            
            const cate = DisplayData.map( (item) =>  item.category   );
            const brand = DisplayData.map( (item) =>  item.brand   );

            console.log('sucess loading => ', DisplayData)
            const data ={ 
            ...state,
            loading: false,
            error: null,
            success: true,
            category: cate , 
            brand: brand,
            totalRecords:action?.payload?.count , 
            data: DisplayData
            }

            if( localStorage.getItem('category') == null ){

                localStorage.setItem('category', JSON.stringify(cate) )
            }

            return data ;

            }),


   
     on(getAllProductsAction.failedLoading,  (state, action) => ({
            ...state,
            loading: false,
            error: 'error occered' ,
            totalRecords: 0,
            success: false,
             data: []
    })),


    
)

