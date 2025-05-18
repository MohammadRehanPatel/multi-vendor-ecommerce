import { Box, Grid2, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const BecomeSellerFormStep3 = ({ formik }: any) => {
  return (
    <div className="space-y-5">
      <p className="text-xl font-bold text-center  text-primary-color">
        Bank Details
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-4">
          <TextField
            type="text"
            name="bankDetails.accountNumber"
            label="Account Number"
            value={formik.values.bankDetails.accountNumber}
            onChange={formik.handleChange}
            fullWidth
            onBlur={formik.handleBlur}
            error={
              formik.touched.bankDetails?.accountNumber &&
              Boolean(formik.errors.bankDetails?.accountNumber)
            }
            helperText={
              formik.touched.bankDetails?.accountNumber &&
              formik.errors.bankDetails?.accountNumber
            }
          />

          <TextField
            type="text"
            label="IFSC Code"
            name="bankDetails.ifscCode"
            value={formik.values.bankDetails.ifscCode}
            onChange={formik.handleChange}
            fullWidth
            onBlur={formik.handleBlur}
            error={
              formik.touched.bankDetails?.ifscCode &&
              Boolean(formik.errors.bankDetails?.ifscCode)
            }
            helperText={
              formik.touched.bankDetails?.ifscCode &&
              formik.errors.bankDetails?.ifscCode
            }
          />
          <TextField
            type="text"
            label="Account Holder Name"
            name="bankDetails.accountHolderName"
            value={formik.values.bankDetails.accountHolderName}
            onChange={formik.handleChange}
            fullWidth
            onBlur={formik.handleBlur}
            error={
              formik.touched.bankDetails?.accountHolderName &&
              Boolean(formik.errors.bankDetails?.accountHolderName)
            }
            helperText={
              formik.touched.bankDetails?.accountHolderName &&
              formik.errors.bankDetails?.accountHolderName
            }
          />
        </div>
      </form>
    </div>
  );
};

export default BecomeSellerFormStep3;
