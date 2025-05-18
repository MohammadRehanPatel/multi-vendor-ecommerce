import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Cart } from "../../types/CartTypes";
import { CouponState } from "../../types/CouponTypes";

const API_URL = "/api";

export const applyCoupon = createAsyncThunk<
  Cart,
  {
    apply: string;
    code: string;
    orderValue: number;
    jwt: string;
  },
  {
    rejectValue: string;
  }
>(
  "coupon/applyCoupon",
  async ({ apply, code, orderValue, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/apply`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          apply,
          code,
          orderValue,
        },
      });
      console.log("Coupon Apply ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.message);
      return rejectWithValue(
        error.response?.data.error || "Failed to Apply Coupon "
      );
    }
  }
);
const initialState: CouponState = {
  coupons: [],
  cart: null,
  loading: false,
  error: null,
  couponCreated: false,
  couponApplied: false,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applyCoupon.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.couponApplied = false;
    });
    builder.addCase(applyCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.cart = action.payload;
      if (action.meta.arg.apply == "true") {
        state.couponApplied = true;
      }
    });
  },
});

export default couponSlice.reducer;
