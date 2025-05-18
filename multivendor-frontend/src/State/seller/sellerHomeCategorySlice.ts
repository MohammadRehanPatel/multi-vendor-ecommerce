import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { HomeCategory, HomeData } from "../../types/HomeCategoryTypes";

// export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory>(
//   "home/createHomeCategories",
//   async (id, homeCategory, { rejectWithValue }) => {
//     try {
//       const response = await api.patch(
//         `/admin/home/categories/${id}`,
//         homeCategory,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//         }
//       );
//       console.log("home categories", response.data);
//       return response.data;
//     } catch (error: any) {
//       const errorMessage =
//         error?.response.data?.message ||
//         error.message ||
//         "Failed to create Home Categories";
//       console.log("error ", errorMessage, error);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );
