import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wishlist, WishlistState } from "../../types/WishlistTypes";
import { api } from "../../config/Api";

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

export const getWishlistByUserId = createAsyncThunk(
  "wishlist/getWishlistByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/wishlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("wish list fetched  ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error);
      return rejectWithValue(
        error.response?.data.message || "Falied to Fetch Wishlist"
      );
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async ({ productId }: { productId: number }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/wishlist/add-product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log("add product to wishlist  ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error);
      return rejectWithValue(
        error.response?.data.message || "Falied to add product to  Wishlist"
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlist: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getWishlistByUserId.fulfilled,
        (state, action: PayloadAction<Wishlist>) => {
          state.wishlist = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        getWishlistByUserId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
    builder
      .addCase(addProductToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addProductToWishlist.fulfilled,
        (state, action: PayloadAction<Wishlist>) => {
          state.wishlist = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        addProductToWishlist.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      );
  },
});


export const {resetWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;