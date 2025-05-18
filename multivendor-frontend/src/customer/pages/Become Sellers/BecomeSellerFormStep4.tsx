import { Box, Grid2, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const BecomeSellerFormStep4 = ({ formik }: any) => {
  return (
    <div className="space-y-5">
      <p className="text-xl font-bold text-center  text-primary-color">
        Seller Details
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-4">
          <TextField
            type="text"
            name="businessDetails.businessName"
            label="Business Name"
            value={formik.values.businessDetails?.businessName}
            onChange={formik.handleChange}
            fullWidth
            onBlur={formik.handleBlur}
            error={
              formik.touched.bankDetails?.businessName &&
              Boolean(formik.errors.bankDetails?.businessName)
            }
            helperText={
              formik.touched.bankDetails?.businessName &&
              formik.errors.bankDetails?.businessName
            }
          />

          <TextField
            type="text"
            label="Seller Name"
            name="sellerName"
            value={formik.values.sellerName}
            onChange={formik.handleChange}
            fullWidth
            onBlur={formik.handleBlur}
            error={
              formik.touched.sellerName && Boolean(formik.errors.sellerName)
            }
            helperText={formik.touched.sellerName && formik.errors.sellerName}
          />
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
          <TextField
            type="password"
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            fullWidth
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
      </form>
    </div>
  );
};

export default BecomeSellerFormStep4;
