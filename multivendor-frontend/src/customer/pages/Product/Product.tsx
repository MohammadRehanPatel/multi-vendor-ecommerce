import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { store, useAppDispatch, useAppSelecter } from "../../../State/Store";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";
import { useParams, useSearchParams } from "react-router-dom";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelecter((store) => store);

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };

  const handlePageChange = (value: any) => {
    setPage(value);
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
    const color = searchParams.get("color");
    const minDiscount = searchParams.get("discount")
      ? Number(searchParams.get("discount"))
      : undefined;
    const pageNumber = page - 1;

    const newFilter = {
      color: color || "",
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minDiscount,
      pageNumber,
      category,
    };
    console.log("category ID", category);
    dispatch(fetchAllProducts(newFilter));
  }, [category, searchParams]);
  return (
    <div className="-z-10 mt-10">
      <div className="">
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
          {category?.replaceAll("_", " ")}
        </h1>
      </div>
      <div className="lg:flex">
        <section className="filter_section hidden lg:block w-[20%]">
          <FilterSection />
        </section>
        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton>
                  <FilterAlt />
                </IconButton>
              )}
              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>
            <FormControl sx={{ width: "200px" }} size="small">
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleSortChange}
              >
                <MenuItem value={"price_low"}>Price: Low-High</MenuItem>
                <MenuItem value={"price_high"}>Price: High-Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />
          <section className="products_section space-x-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-5 px-5 justify-center">
            {product.products.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </section>
          <div className="pagination flex items-center justify-center py-10">
            <Pagination
              onChange={(e, value) => handlePageChange(value)}
              count={page}
              variant="outlined"
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
