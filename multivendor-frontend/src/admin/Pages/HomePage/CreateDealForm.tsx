import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useAppDispatch, useAppSelecter } from "../../../State/Store";
import { createDeal } from "../../../State/admin/dealSlice";
import { uploadToCloudinary } from "../../../Util/uploadCloudinary";
import { AddPhotoAlternate, Close } from "@mui/icons-material";

const CreateDealForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useAppDispatch();
  const { customer } = useAppSelecter((store) => store);
  const formik = useFormik({
    initialValues: {
      discount: 0,
      category: "",
      image: "",
    },
    validationSchema: Yup.object({
      discount: Yup.number()
        .required("Discount is required")
        .min(0, "Discount must be a positive number"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: (values) => {
      console.log("Submit " + values);
      const reqData = {
        discount: values.discount,
        category: {
          id: values.category,
          image: values.image,
        },
      };
      dispatch(createDeal(reqData));
    },
  });

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    setUploadImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("image", [...formik.values.image, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.image];
    updatedImages.splice(index, 1);
    formik.setFieldValue("image", updatedImages);
  };

  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      className="space-y-6"
    >
      <Typography variant="h4" className="text-center">
        Create Deal
      </Typography>
      <Grid2 className="flex flex-wrap gap-5" size={{ xs: 12 }}>
        <input
          type="file"
          accept="image/*"
          className=""
          style={{ display: "none" }}
          id="fileInput"
          onChange={handleImageChange}
        />
        <label className=" relative " htmlFor="fileInput">
          <span className="w-24 h-24 flex cursor-pointer justify-center items-center  p-5 border border-gray-300 rounded-lg">
            <AddPhotoAlternate className="text-primary-color" />
          </span>
          {uploadImage && (
            <div className="absolute top-0 right-0 bottom-0 left-0 flex h-24 w-24 justify-center items-center">
              <CircularProgress />
            </div>
          )}
        </label>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <img src={formik.values.image} className="w-24 h-24 object-cover" />
            <IconButton
              onClick={() => handleRemoveImage(0)}
              className=""
              size="small"
              color="error"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                outline: "none",
              }}
            >
              <Close sx={{ fontSize: "1rem" }} />
            </IconButton>
          </div>
        </div>
      </Grid2>
      <TextField
        fullWidth
        name="discount"
        label="Discount"
        type="number"
        value={formik.values.discount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.discount && Boolean(formik.errors.discount)}
        helperText={formik.touched.discount && formik.errors.discount}
      />
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={formik.values.category}
          label="Category"
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
        >
          {customer.homePageData?.dealCategories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {formik.touched.category && formik.errors.category && (
        <Typography color="error">{formik.errors.category}</Typography>
      )}
      <Button variant="contained" type="submit" sx={{ py: "12px" }} fullWidth>
        Create Deal
      </Button>
    </Box>
  );
};

export default CreateDealForm;
