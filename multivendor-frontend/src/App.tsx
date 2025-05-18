import { ThemeProvider } from "@mui/material";
import "./App.css";
import Navbar from "./customer/components/Navbar/Navbar";
import customTheme from "./Theme/customTheme";
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/ProductDetails/ProductDetails";
import Review from "./customer/pages/Review/Review";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Account from "./customer/pages/Account/Account";
import Wishlist from "./customer/pages/Wishlist/Wishlist";
import { Route, Routes, useNavigate } from "react-router-dom";
import BecomeSeller from "./customer/pages/Become Sellers/BecomeSeller";
import SelllerDashboard from "./seller/pages/SellerDashboard/SelllerDashboard";
import AdminDashboard from "./admin/Pages/Dashboard/AdminDashboard";
import { useAppDispatch, useAppSelecter } from "./State/Store";
import { useEffect } from "react";
import { fetchSellerProfile } from "./State/seller/sellerSlice";
import Auth from "./customer/pages/Auth/Auth";
import { fetchUserProfile } from "./State/AuthSlice";
import PaymentSuccess from "./customer/pages/PaymentSuccess";
import { createHomeCategories } from "./State/customer/Customer/customerSlice";
import { homesCategories } from "./data/homeCategories";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { seller, auth } = useAppSelecter((store) => store);

  useEffect(() => {
    dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""));
    dispatch(createHomeCategories(homesCategories));
  }, []);

  useEffect(() => {
    if (seller.profile) {
      navigate("/seller");
    }
  }, [seller.profile]);

  useEffect(() => {
    dispatch(
      fetchUserProfile({ jwt: auth.jwt || localStorage.getItem("jwt") || "" })
    );

    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/");
    }
    if (auth.user?.role === "ROLE_ADMIN") {
      navigate("/admin");
    }
  }, [auth.jwt]);

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Navbar />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />

            <Route path="/products/:category" element={<Product />} />

            <Route
              path="/product-details/:categoryId/:name/:productId"
              element={<ProductDetails />}
            />

            <Route path="/reviews/:productId" element={<Review />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/payment-success/:orderId"
              element={<PaymentSuccess />}
            />

            <Route path="/account/*" element={<Account />} />

            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/become-seller" element={<BecomeSeller />} />

            <Route path="/seller/*" element={<SelllerDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
