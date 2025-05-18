import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse, Deal, DealState } from "../../types/DealTypes";
import { api } from "../../config/Api";
import { act } from "react";

const initialState: DealState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
};

export const createDeal = createAsyncThunk(
  "deals/createDeal",
  async (deal: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/deals", deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("create Deal ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Error ", error);
      return rejectWithValue(error.response?.data || "failed to create deal");
    }
  }
);
export const getAllDeals = createAsyncThunk(
  "deals/getAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/deals", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("Get All Deal ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Error ", error);
      return rejectWithValue(
        error.response?.data || "failed to fetch all deal"
      );
    }
  }
);

export const deleteDeal = createAsyncThunk<ApiResponse, number>(
  "deals/deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/deals/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log("Error ", error.response);
      return rejectWithValue(error.response?.data || "failed to delete deal");
    }
  }
);

const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDeal.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.dealCreated = false;
      state.dealUpdated = false;
    });
    builder.addCase(createDeal.fulfilled, (state, action) => {
      state.loading = false;
      state.dealCreated = true;
      state.dealUpdated = false;
      state.deals = action.payload;
      state.error = null;
    });
    builder.addCase(createDeal.rejected, (state, action) => {
      state.loading = false;
      state.dealCreated = false;
      state.dealUpdated = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAllDeals.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.dealCreated = false;
      state.dealUpdated = false;
      state.deals = [];
    });
    builder.addCase(getAllDeals.fulfilled, (state, action) => {
      state.loading = false;
      state.dealCreated = false;
      state.deals = action.payload;
      state.dealUpdated = false;
    });
    builder.addCase(getAllDeals.rejected, (state, action) => {
      state.loading = false;
      state.dealCreated = false;
      state.dealUpdated = false;
      state.error = action.payload as string;
    });
    builder.addCase(deleteDeal.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.dealCreated = false;
      state.dealUpdated = false;
    });
    builder.addCase(deleteDeal.fulfilled, (state, action) => {
      state.loading = false;
      state.dealCreated = false;
      state.dealUpdated = false;
    });
    builder.addCase(deleteDeal.rejected, (state, action) => {
      state.loading = false;
      state.dealCreated = false;
      state.error = action.payload as string;
    });
  },
});

export default dealSlice.reducer;
