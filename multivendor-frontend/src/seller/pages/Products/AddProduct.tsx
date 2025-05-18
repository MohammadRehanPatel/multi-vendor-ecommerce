import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { womenLevelTwo } from "../../../data/category/level-two/womenLevelTwo";
import { menLevelTwo } from "../../../data/category/level-two/menLevelTwo";
import { furnitureLevelTwo } from "../../../data/category/level-two/furnitureLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/level-two/electronicsLevelTwo";
import { menLevelThree } from "../../../data/category/level-three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level-three/womenLevelThree";
import { furnitureLevelThree } from "../../../data/category/level-three/furnitureLevelThree";
import { electronicsLevelThree } from "../../../data/category/level-three/electronicsLevelThree";
import { uploadToCloudinary } from "../../../Util/uploadCloudinary";
import { mainCategory } from "../../../data/category/mainCategory";
import { colors } from "../../../data/Filter/color";
import { useAppDispatch } from "../../../State/Store";
import { createProduct } from "../../../State/seller/sellerProductSlice";

const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};
const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};

const AddProduct = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const initialValues = {
    title: "",
    description: "",
    mrpPrice: "",
    sellingPrice: "",
    quantity: "",
    color: "",
    images: [],
    category: "",
    category2: "",
    category3: "",
    sizes: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(
        createProduct({ request: values, jwt: localStorage.getItem("jwt") })
      );
      resetForm({
        values: initialValues,
      });
    },
  });

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    setUploadImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child: any) => {
      return child.parentCategoryId == parentCategoryId;
    });
  };

  return (
    <div>
      <h2 className="text-center pb-3 font-bold text-primary-color text-2xl">
        Add Product
      </h2>
      <div className="p-5 border">
        <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
          <Grid2 container spacing={2}>
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
                {formik.values.images.map((image, index) => (
                  <div className="relative">
                    <img
                      src={image}
                      className="w-24 h-24 object-cover"
                      key={index}
                      alt={`ProductImage ${index + 1} `}
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
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
                ))}
              </div>
            </Grid2>
            <Grid2 className="flex flex-wrap gap-5" size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                required
              />
            </Grid2>
            <Grid2 className="flex flex-wrap gap-5" size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                required
                rows={4}
                multiline
              />
            </Grid2>
            <Grid2
              className="flex flex-wrap gap-5"
              size={{ xs: 12, md: 4, lg: 3 }}
            >
              <TextField
                fullWidth
                id="mrpPrice"
                name="mrpPrice"
                label="MRP Price"
                value={formik.values.mrpPrice}
                onChange={formik.handleChange}
                error={
                  formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)
                }
                helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
                required
              />
            </Grid2>
            <Grid2
              className="flex flex-wrap gap-5"
              size={{ xs: 12, md: 4, lg: 3 }}
            >
              <TextField
                fullWidth
                id="sellingPrice"
                name="sellingPrice"
                label="Selling Price"
                value={formik.values.sellingPrice}
                onChange={formik.handleChange}
                error={
                  formik.touched.sellingPrice &&
                  Boolean(formik.errors.sellingPrice)
                }
                helperText={
                  formik.touched.sellingPrice && formik.errors.sellingPrice
                }
                required
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, lg: 3 }}>
              <FormControl
                error={formik.touched.color && Boolean(formik.errors.color)}
                fullWidth
                required
              >
                <InputLabel id="color-label">Color</InputLabel>
                <Select
                  id="color"
                  name="color"
                  label="Color"
                  value={formik.values.color || ""}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {colors.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      <div className="flex gap-3">
                        <span
                          style={{ backgroundColor: item.hex }}
                          className="h-5 w-5 rounded-full"
                        ></span>
                        {item.name}
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, lg: 3 }}>
              <FormControl
                error={
                  formik.touched.description && Boolean(formik.errors.sizes)
                }
                fullWidth
                required
              >
                <InputLabel id="sizes-label">Sizes</InputLabel>
                <Select
                  id="sizes"
                  name="sizes"
                  label="Sizes"
                  value={formik.values.sizes || ""}
                  onChange={formik.handleChange}
                >
                  {}
                  <MenuItem value="FREE">FREE</MenuItem>
                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                  <MenuItem value="XL">XL</MenuItem>
                  <MenuItem value="XXL">XXL</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
              <FormControl
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                fullWidth
                required
              >
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  id="category"
                  name="category"
                  label="Category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  {mainCategory.map((item, index) => (
                    <MenuItem value={item.categoryId} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <FormHelperText> {formik.errors.category} </FormHelperText>
                )}
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
              <FormControl
                error={
                  formik.touched.category2 && Boolean(formik.errors.category2)
                }
                fullWidth
                required
              >
                <InputLabel id="category2-label">Category Two</InputLabel>
                <Select
                  id="category2"
                  name="category2"
                  label="Category Two"
                  value={formik.values.category2}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {formik.values.category &&
                    categoryTwo[formik.values.category]?.map((item: any) => (
                      <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                    ))}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <FormHelperText> {formik.errors.category} </FormHelperText>
                )}
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
              <FormControl
                error={
                  formik.touched.category3 && Boolean(formik.errors.category3)
                }
                fullWidth
                required
              >
                <InputLabel id="category3-label">Category Three</InputLabel>
                <Select
                  id="category3"
                  name="category3"
                  label="Category Three"
                  value={formik.values.category3}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {formik.values.category2 &&
                    childCategory(
                      categoryThree[formik.values.category],
                      formik.values.category2
                    )?.map((item: any) => (
                      <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                    ))}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <FormHelperText> {formik.errors.category} </FormHelperText>
                )}
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Button
                sx={{ p: "14px" }}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                {false ? (
                  <CircularProgress
                    size={"small"}
                    sx={{ width: "27px", height: "27px" }}
                  />
                ) : (
                  "Add Product"
                )}
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
