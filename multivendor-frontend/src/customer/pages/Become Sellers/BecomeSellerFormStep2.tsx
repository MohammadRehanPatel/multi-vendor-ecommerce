import { Box, Grid2, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const BecomeSellerFormStep2 = ({ formik }: any) => {
  // const addressFormScheme = Yup.object().shape({
  //   name: Yup.string().required("Name is Required!"),
  //   mobile: Yup.string()
  //     .required("Mobile Number is Required!")
  //     .matches(/^[6-9]\d{9}$/, "Invalid Number"),
  //   address: Yup.string().required("Address is Required!"),
  //   city: Yup.string().required("City is Required!"),
  //   state: Yup.string().required("State is Required!"),
  //   pincode: Yup.string()
  //     .required("Pincode is Required!")
  //     .matches(/^[1-9][0-9]{6}$/, "Invalid Pin Code"),
  //   locality: Yup.string().required("Locality is Required!"),
  // });

  return (
    <div className="space-y-5">
      <p className="text-xl font-bold text-center  text-primary-color">
        Pickup Address
      </p>
      <form>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="pickupAddress.name"
              label="Name"
              value={formik.values.pickupAddress.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.name &&
                Boolean(formik.errors.pickupAddress?.name)
              }
              helperText={
                formik.touched.pickupAddress?.name &&
                formik.errors.pickupAddress?.name
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="pickupAddress.mobile"
              label="Mobile"
              value={formik.values.pickupAddress.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.mobile &&
                Boolean(formik.errors.pickupAddress?.mobile)
              }
              helperText={
                formik.touched.pickupAddress?.mobile &&
                formik.errors.pickupAddress?.mobile
              }
            />
          </Grid2>

          <Grid2 size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="pickupAddress.pincode"
              label="Pin Code"
              value={formik.values.pickupAddress.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.pincode &&
                Boolean(formik.errors.pickupAddress?.pincode)
              }
              helperText={
                formik.touched.pickupAddress?.pincode &&
                formik.errors.pickupAddress?.pincode
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="pickupAddress.address"
              label="Address"
              value={formik.values.pickupAddress.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.address &&
                Boolean(formik.errors.pickupAddress?.address)
              }
              helperText={
                formik.touched.pickupAddress?.address &&
                formik.errors.pickupAddress?.address
              }
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="pickupAddress.locality"
              label="Locality"
              value={formik.values.pickupAddress.locality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.locality &&
                Boolean(formik.errors.pickupAddress?.locality)
              }
              helperText={
                formik.touched.pickupAddress?.locality &&
                formik.errors.pickupAddress?.locality
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="pickupAddress.city"
              label="City"
              value={formik.values.pickupAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.city &&
                Boolean(formik.errors.pickupAddress?.city)
              }
              helperText={
                formik.touched.pickupAddress?.city &&
                formik.errors.pickupAddress?.city
              }
            />
          </Grid2>

          <Grid2 size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="pickupAddress.state"
              label="State"
              value={formik.values.pickupAddress.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.state &&
                Boolean(formik.errors.pickupAddress?.state)
              }
              helperText={
                formik.touched.pickupAddress?.state &&
                formik.errors.pickupAddress?.state
              }
            />
          </Grid2>
        </Grid2>
      </form>
    </div>
  );
};

export default BecomeSellerFormStep2;
