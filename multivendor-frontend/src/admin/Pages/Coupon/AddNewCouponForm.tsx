import { useFormik } from "formik";
import React from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, Grid2, TextField } from "@mui/material";
import { useAppDispatch } from "../../../State/Store";
import { createCoupon } from "../../../State/admin/adminCouponSlice";

interface CouponFormValues {
  code: string;
  discountPercentage: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
}

const AddNewCouponForm = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik<CouponFormValues>({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        validityStartDate: values.validityStartDate
          ? values.validityStartDate.format("YYYY-MM-DD") // Format to local time
          : null,
        validityEndDate: values.validityEndDate
          ? values.validityEndDate.format("YYYY-MM-DD") // Format to local time
          : null,
      };
      console.log("form Submitted ", values, formattedValues);
      dispatch(
        createCoupon({
          coupon: formattedValues,
          jwt: localStorage.getItem("jwt") || "",
        })
      );
    },
  });

  const handleDateChange =
    (field: keyof CouponFormValues) => (date: Dayjs | null) => {
      formik.setFieldValue(field, date);
    };
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-color pb-5 text-center">
        Create New Coupon
      </h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="code"
                label="Coupon Code"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="discountPercentage"
                label="Discount Percentage"
                type="number"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                error={
                  formik.touched.discountPercentage &&
                  Boolean(formik.errors.discountPercentage)
                }
                helperText={
                  formik.touched.discountPercentage &&
                  formik.errors.discountPercentage
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <DatePicker
                onChange={handleDateChange("validityStartDate")}
                name="validityStartDate"
                sx={{ width: "100%" }}
                label="Validity Start Date"
                value={formik.values.validityStartDate}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <DatePicker
                onChange={handleDateChange("validityEndDate")}
                name="validityEndDate"
                sx={{ width: "100%" }}
                label="Validity End Date"
                value={formik.values.validityEndDate}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="minimumOrderValue"
                label="Minimum Order Value"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                type="number"
                error={
                  formik.touched.minimumOrderValue &&
                  Boolean(formik.errors.minimumOrderValue)
                }
                helperText={
                  formik.touched.minimumOrderValue &&
                  formik.errors.minimumOrderValue
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Button
                type="submit"
                fullWidth
                sx={{ py: ".8rem" }}
                variant="contained"
              >
                Create Coupon
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default AddNewCouponForm;
