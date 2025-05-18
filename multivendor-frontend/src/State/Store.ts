import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sellerSlice from "./seller/sellerSlice";
import sellerProductSlice from "./seller/sellerProductSlice";
import productSlice from "./customer/ProductSlice";
import authSlice from "./AuthSlice";
import cartSlice from "./customer/cartSlice";
import orderSlice from "./customer/orderSlice";
import wishlistSlice from "./customer/wishlistSlice";
import sellerOrderSlice from "./seller/sellerOrderSlice";
import transactionSlice from "./seller/transactionSlice";
import customerSlice from "./customer/Customer/customerSlice";
import adminSlice from "./admin/adminSlice";
import couponSlice from "./customer/couponSlice";
import dealSlice from "./admin/dealSlice";
import adminCouponSlice from "./admin/adminCouponSlice";

const rootReducer = combineReducers({
  seller: sellerSlice,
  sellerProduct: sellerProductSlice,
  product: productSlice,
  auth: authSlice,
  cart: cartSlice,
  order: orderSlice,
  wishlist: wishlistSlice,
  customer: customerSlice,
  // seller slice
  sellerOrder: sellerOrderSlice,
  transactions: transactionSlice,
  // admin slice
  admin: adminSlice,
  adminCoupon: adminCouponSlice,
  deal: dealSlice,
  coupon: couponSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelecter: TypedUseSelectorHook<RootState> = useSelector;
