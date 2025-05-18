import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button } from "@mui/material";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center h-[90vh] items-center">
      <div className="max-w-md h-[85vh] shadow-lg">
        {/* <img
          className="w-full rounded-t-md "
          src="https://img.freepik.com/free-vector/gradient-metaverse-twitch-banner_23-2149433360.jpg?t=st=1742043575~exp=1742047175~hmac=5e4278238517e214cab9bad41df2f27ef0512175a19301afe3d82badff5a529d&w=1380"
          alt=""
        /> */}
        <div className="mt-8 px-10">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="flex items-center gap-1 justify-center  mt-5">
            <p>{isLogin && "Don't "} have Account</p>
            <Button size="small" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create Account" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
