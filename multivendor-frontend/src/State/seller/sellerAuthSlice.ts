import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";


export const sellerLogin=createAsyncThunk<any,any>("/sellers/sellerLogin", async(loginRequest,{rejectWithValue})=>{
    try {
        const response = await api.post("/sellers/login",loginRequest)
        console.log("Login ",response.data);
        const {jwt} = response.data;
        console.log("Jwt " +jwt);
        localStorage.setItem("jwt",jwt)
    } catch (error) {
        console.log("error--> ",error);
    }
}
 )