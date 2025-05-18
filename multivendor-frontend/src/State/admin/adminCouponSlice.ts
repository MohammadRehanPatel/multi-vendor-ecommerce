import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Coupon, CouponState } from "../../types/CouponTypes";
import { api } from "../../config/Api";

const API_URL = "/api/admin";

export const createCoupon = createAsyncThunk<
  Coupon,
  { coupon: any; jwt: string },
  { rejectValue: string }
>("adminCoupon/createCoupon", async ({ coupon, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.post(`${API_URL}/create`, coupon, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("created coupon ", response.data);
    return response.data;
  } catch (error: any) {
    console.log("Error ", error);
    return rejectWithValue(error.response?.data || "failed to create coupon");
  }
});
export const fetchAllCoupons = createAsyncThunk<Coupon[]>(
  "adminCoupon/fetchAllCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
      });
      console.log("fetched All coupons ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Error ", error);
      return rejectWithValue(
        error.response?.data || "failed to fetch all coupon"
      );
    }
  }
);
export const deleteCoupon = createAsyncThunk<number, number>(
  "adminCoupon/deleteCoupon",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
      });
      console.log("Coupon Deleted ", response.data);
      return id;
    } catch (error: any) {
      console.log("Error ", error);
      return rejectWithValue(error.response?.data || "failed to delete coupon");
    }
  }
);

export interface AdminCouponState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
}
const initialState: AdminCouponState = {
  coupons: [],
  loading: false,
  error: null,
};

const adminCoupon = createSlice({
  name: "adminCoupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons.push(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder.addCase(deleteCoupon.pending, (state) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon.id !== action.payload
        );
      }),
      builder.addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminCoupon.reducer;
