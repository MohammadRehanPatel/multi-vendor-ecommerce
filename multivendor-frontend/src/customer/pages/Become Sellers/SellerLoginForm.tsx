import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { sendLoginSignupOtp, signin } from "../../../State/AuthSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../State/Store";
import { sellerLogin } from "../../../State/seller/sellerAuthSlice";

const SellerLoginForm = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      dispatch(sellerLogin({ email: values.email, otp: values.otp }));
      console.log(values);
    },
  });

  const handeSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

  const handleLogin = () => {};

  return (
    <div className="">
      <h1 className="text-center font-bold text-xl text-primary-color pb-5">
        Login As Seller
      </h1>
      <div className="space-y-5">
        <TextField
          type="email"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          fullWidth
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        {true && (
          <div className="space-y-2">
            <p className="font-medium text-sm opacity-60">
              Enter OTP sent to your email
            </p>
            <TextField
              type="otp"
              label="OTP"
              name="otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              fullWidth
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />
          </div>
        )}

        <Button
          fullWidth
          onClick={handeSendOtp}
          variant="contained"
          sx={{ py: "11px" }}
        >
          sent otp
        </Button>

        <Button
          onClick={() => formik.handleSubmit()}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ py: "11px" }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default SellerLoginForm;
