import { Box, Button, Grid2, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../State/Store";
import { createOrder } from "../../../State/customer/orderSlice";
const addressFormScheme = Yup.object().shape({
  name: Yup.string().required("Name is Required!"),
  mobile: Yup.string()
    .required("Mobile Number is Required!")
    .matches(/^[6-9]\d{9}$/, "Invalid Number"),
  address: Yup.string().required("Address is Required!"),
  city: Yup.string().required("City is Required!"),
  state: Yup.string().required("State is Required!"),
  pincode: Yup.string()
    .required("Pincode is Required!")
    .matches(/^[1-9][0-9]{5}$/, "Invalid Pin Code"),
  locality: Yup.string().required("Locality is Required!"),
});
const AddressForm = ({ paymentGateway }: any) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pinCode: "",
      address: "",
      city: "",
      state: "",
      locality: "",
    },
    validationSchema: addressFormScheme,
    onSubmit: (values) => {
      console.log(values);

      dispatch(
        createOrder({
          address: values,
          jwt: localStorage.getItem("jwt") || "",
          paymentGateway: paymentGateway,
        })
      );
    },
  });
  return (
    <Box sx={{ max: "auto" }}>
      <p className="text-xl font-bold text-center pb-5 text-primary-color">
        Contact Details
      </p>
      <form onSubmit={formik.handleSubmit}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="mobile"
              label="Mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid2>

          <Grid2 size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="pincode"
              label="Pin Code"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="locality"
              label="Locality"
              value={formik.values.locality}
              onChange={formik.handleChange}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
            />
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid2>

          <Grid2 size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Button
              sx={{ py: "12px" }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Add Address
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Box>
  );
};

export default AddressForm;
