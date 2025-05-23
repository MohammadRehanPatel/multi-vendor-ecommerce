import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../types/CartTypes";
import { api } from "../../config/Api";
import { sumCartItemMrpPrice } from "../../Util/sumCartItemMrpPrice";
import { sumCartItemSellingPrice } from "../../Util/sumCartItemSellingPrice";
import { applyCoupon } from "./couponSlice";


interface CartState{
    cart:Cart | null;
    loading:boolean;
    error:string|null;
}

const initialState :CartState={
cart:null,
loading:false,
error:null
}

const API_URL = "/api/cart";

export const fetchUserCart = createAsyncThunk<Cart,string>(
    "cart/fetchUserCart",
    async (jwt:string,{rejectWithValue})=>{
        try {
            const response = await api.get(API_URL,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            })
            console.log("Cart Fetched ",response.data);
            return response.data;
        } catch (error:any) {
            console.log("error " , error.message);
            return rejectWithValue("Failed to fetch User Cart ")
        }
    }
)
interface AddItemRequest{
    productId:number|undefined;
    size:string;
    quantity:number;
}

export const addItemToCart = createAsyncThunk<
CartItem, {jwt: string|null; request: AddItemRequest} 
>(
    "cart/addItemToCart", async({jwt,request},{rejectWithValue})=>{
        try {
            const response = await api.put(`${API_URL}/add`,request,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            })
            console.log("Cart Added ",response.data);
            return response.data;
        } catch (error:any) {
            console.log("error ",error.message);
            return rejectWithValue("Failed to add item to Cart ")
        }
    }
)

export const deleteCartItem = createAsyncThunk<
any, {jwt: string; cartItemId: number} 
>(
    "cart/deleteCartItem", async({jwt,cartItemId},{rejectWithValue})=>{
        try {
            const response = await api.delete(`${API_URL}/item/${cartItemId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            })
            return response.data;
        } catch (error:any) {
            console.log("error ",error.message);
            return rejectWithValue( error.response.data.message ||"Failed to delete item from Cart ")
        }
    }
)
export const updateCartItem = createAsyncThunk<
any, {jwt: string|null; cartItemId: number,cartItem:any} 
>(
    "cart/updateCartItem", async({jwt,cartItemId,cartItem},{rejectWithValue})=>{
        try {
            const response = await api.put(`${API_URL}/item/${cartItemId}`,cartItem ,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            })
            return response.data;
        } catch (error:any) {
            console.log("error ",error.message);
            return rejectWithValue( error.response.data.message ||"Failed to Update  Cart Item ")
        }
    }
)

const cartSlice =  createSlice({
    name:"cart",
    initialState,
    reducers:{
        resetCartState:(state)=>{
            state.cart=null;
            state.loading=false;
            state.error=null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUserCart.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(fetchUserCart.fulfilled,(state,action:PayloadAction<Cart>)=>{
            state.cart=action.payload
            state.loading=false
        })
        builder.addCase(fetchUserCart.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload as string
        })
        builder.addCase(addItemToCart.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(addItemToCart.fulfilled,(state,action:PayloadAction<CartItem>)=>{
            if(state.cart){
                state.cart.cartItems.push(action.payload)
            }
                state.loading=false

        
        })
        builder.addCase(addItemToCart.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload as string
        })
        builder.addCase(deleteCartItem.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(deleteCartItem.fulfilled,(state,action)=>{
            if(state.cart){
                state.cart.cartItems = state.cart.cartItems.filter(
                    (item:CartItem) => item.id !==action.meta.arg.cartItemId
                );
                const mrpPrice = sumCartItemMrpPrice(state.cart.cartItems||[])
                const sellingPrice = sumCartItemSellingPrice(state.cart.cartItems||[])
                state.cart.totalSellingPrice=sellingPrice
                state.cart.totalMrpPrice=mrpPrice
            }
                state.loading=false
        })
        builder.addCase(updateCartItem.pending,(state)=>{
            state.loading=true,
            state.error=null

        })
        builder.addCase(updateCartItem.fulfilled,(state,action)=>{
            if(state.cart){
                const updatedCartItem = action.payload
                state.cart.cartItems = state.cart.cartItems.map((item:CartItem) => {
                    if(item.id === updatedCartItem.id) return updatedCartItem
                    return item
                    })
                    const mrpPrice = sumCartItemMrpPrice(state.cart.cartItems||[])
                    const sellingPrice = sumCartItemSellingPrice(state.cart.cartItems||[])
                    state.cart.totalSellingPrice=sellingPrice
                    state.cart.totalMrpPrice=mrpPrice
                }
                state.loading=false

        })
        builder.addCase(updateCartItem.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload as string

        })        
 
        builder.addCase(deleteCartItem.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload as string
        })
        builder.addCase(applyCoupon.fulfilled,(state,action)=>{
            state.loading= false
            state.cart=action.payload
        })
    }

})


export default cartSlice.reducer

export const {resetCartState}= cartSlice.actions