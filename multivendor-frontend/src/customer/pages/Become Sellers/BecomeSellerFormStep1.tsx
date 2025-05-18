import { Box, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep1 = ({ formik }: any) => {
  return (
    <div className="space-y-5">
      <p className="text-xl font-bold text-primary-color  text-center">
        Contact Details
      </p>
      <form>
        <div className="flex flex-col space-y-4">
          <TextField
            type="phone"
            name="mobile"
            label="Mobile"
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
            onBlur={formik.handleBlur}
            error={formik.touched?.name && Boolean(formik.errors?.name)}
            helperText={formik.touched?.name && formik.errors?.name}
          />

          <TextField
            type="text"
            label="GSTIN"
            name="gstin"
            value={formik.values.gstin}
            onChange={formik.handleChange}
            fullWidth
            onBlur={formik.handleBlur}
            error={formik.touched?.gstin && Boolean(formik.errors?.gstin)}
            helperText={formik.touched?.gstin && formik.errors?.gstin}
          />
        </div>
      </form>
    </div>
  );
};

export default BecomeSellerFormStep1;
