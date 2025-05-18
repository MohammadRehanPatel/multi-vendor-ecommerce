import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { User } from "../../types/UserTypes";
import { Order } from "../../types/OrderTypes";
import { Seller } from "../../types/SellerTypes";
import { Transaction } from "../../types/TransactionTypes";

interface TransactionState{
    tranactions:Transaction[];
    transaction:Transaction |null;
    loading:boolean;
    error:string|null
}

const initialState:TransactionState={
    tranactions:[],
    transaction:null,
    loading:false,
    error:null
}


export const fetchTransactionsBySeller = createAsyncThunk<Transaction[],string,{rejectValue:string}>(
    'transactions/fetchTransactionsBySeller', async (jwt,{rejectWithValue}) => {
        try {
            const response = await api.get('/api/transactions/seller',{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            console.log("Fetch TransactionsBy Seller ",response.data);
            return response.data
        } catch (error:any) {
                if(error.response){
                    return rejectWithValue(error.response.data.message);
                }
                return rejectWithValue("falied to fetch Transactions")
        }
    }
 )


 const transactionSlice=createSlice({
    name:"transactions",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchTransactionsBySeller.pending,(state)=>{
            state.loading=true;
            state.error=null
            })
        builder.addCase(
            fetchTransactionsBySeller.fulfilled,(state,action)=>{
                state.loading=false;
                state.tranactions=action.payload;
            }
        )
        builder.addCase(
            fetchTransactionsBySeller.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload as string
            })
        }
 })


 export default transactionSlice.reducer