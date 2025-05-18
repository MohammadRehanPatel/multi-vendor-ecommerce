import React, { useState } from "react";
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import { Button } from "@mui/material";
import sellerLogin from "../../../assets/sellerlogin.jpg";
import { useNavigate } from "react-router-dom";

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(true);
  // const navigate = useNavigate()
  const handleShowPage = () => {
    if (isLogin) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };
  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen">
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md ">
        {!isLogin ? <SellerAccountForm /> : <SellerLoginForm />}
        <div className="mt-10 space-y-2">
          <h1 className="text-center text-sm font-medium">have account</h1>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleShowPage}
            sx={{ py: "11px" }}
          >
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </section>
      <section className="hidden md:col-span-1 lg:col-span-2  md:flex justify-center items-center">
        <div className="lg:w-[70%]  px-5 ">
          <div className="space-y-2 font-bold text-center">
            <p className="text-2xl">Join the Marketplace Revolution</p>
            <p className="text-xl text-primary-color">Boost your sales today</p>
          </div>
          <img
            // className="  object-contain object-top"
            // src="https://img.freepik.com/free-vector/hand-drawn-reseller-illustration_52683-87400.jpg?t=st=1740381880~exp=1740385480~hmac=eb0fa8fe0a49d4ae80e4945cb0a7c01c2fb16349acbd3fd513eb60e190d92f87&w=1060"
            src={sellerLogin}
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;
