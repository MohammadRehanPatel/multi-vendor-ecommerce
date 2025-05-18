import { useFormik } from "formik";
import React from "react";
import { useAppDispatch } from "../../../State/Store";
import { sendLoginSignupOtp } from "../../../State/AuthSlice";
import { Button, TextField } from "@mui/material";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      fullName: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handeSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };
  return (
    <div>
      <h1 className="text-center text-primary-color font-bold text-xl pb-8">
        Signup
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
          <div className="space-y-5">
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
            <TextField
              type="text"
              label="Full Name"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              fullWidth
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </div>
        )}

        {false && (
          <Button
            fullWidth
            onClick={handeSendOtp}
            variant="contained"
            sx={{ py: "11px" }}
          >
            sent otp
          </Button>
        )}

        <Button
          onClick={() => formik.handleSubmit()}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ py: "11px" }}
        >
          Signup
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
