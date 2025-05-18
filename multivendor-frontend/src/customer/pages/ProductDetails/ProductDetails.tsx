import {
  Add,
  AddShoppingCart,
  FavoriteBorder,
  LocalShipping,
  MilitaryTech,
  PlusOne,
  Remove,
  Shield,
  Star,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Review from "../Review/Review";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import { useAppDispatch, useAppSelecter } from "../../../State/Store";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../State/customer/ProductSlice";
import { addItemToCart } from "../../../State/customer/cartSlice";
import { addProductToWishlist } from "../../../State/customer/wishlistSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  // const [size, setSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const { product } = useAppSelecter((store) => store);

  useEffect(() => {
    dispatch(fetchProductById(Number(productId)));
  }, [productId]);
  const handleActiveImage = (value: number) => () => {
    setActiveImage(value);
  };

  const handleBag = () => {
    dispatch(
      addItemToCart({
        jwt: localStorage.getItem("jwt") || "",
        request: {
          productId: Number(productId),
          size: String(product?.product?.sizes),
          quantity: quantity,
        },
      })
    );
  };
  const handleWishlist = (e: any) => {
    // e.stopPropagation();
    productId &&
      dispatch(addProductToWishlist({ productId: Number(productId) }));
  };

  return (
    <div className="px-5 lg:px-20 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product.product?.images.map((item, index) => (
              <img
                key={index}
                onClick={handleActiveImage(index)}
                className={`w-[50px] cursor-pointer hover:opacity-80 ${
                  activeImage == index ? "opacity-100" : "opacity-40"
                }  transition-all ease-in-out lg:w-full rounded-md`}
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md"
              src={product.product?.images[activeImage]}
              alt=""
            />
          </div>
        </section>
        <section>
          <h1 className="font-bold text-lg text-primary-color">
            {product.product?.seller?.businessDetails.businessName}
          </h1>
          <p className="text-gray-500 font-semibold">
            {product.product?.title}
          </p>
          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5 ">
            <div className="flex items-center gap-1 justify-center">
              <span>4</span>
              <Star sx={{ fontSize: "17px" }} color="primary" />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>234 Ratings</span>
          </div>
          <div className="price flex gap-3 items-center mt-4">
            <span className="text-2xl text-primary-color font-sans">
              ₹ {product.product?.sellingPrice}
            </span>
            <span className="text-xl line-through text-gray-400  ">
              ₹ {product.product?.mrpPrice}
            </span>
            <span className="text-primary-color text-2xl font-semibold">
              {product.product?.discountPercent}% off
            </span>
          </div>
          <p className="text-gray-500 text-sm my-3">
            Inclusive of all taxes. Free shipping above ₹1500
          </p>
          <div className="flex gap-2 flex-col  mt-7 space-y-3">
            <div className="flex gap-3 items-center">
              <Shield color="primary" />
              <span className="text-gray-500 text-md">
                Authentic & Quality Assured
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <WorkspacePremium color="primary" />
              <span className="text-gray-500 text-md">
                100% money back Gaurantee
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <LocalShipping color="primary" />
              <span className="text-gray-500 text-md">
                Free Shipping and Return
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <Wallet color="primary" />
              <span className="text-gray-500 text-md">
                Pay On Delivery might be available
              </span>
            </div>
          </div>

          <div className="mt-7 space-y-2">
            <h2 className="text-2xl ">Size</h2>
            <div className="flex gap-2 items-center py-2  w-[140px] justify-between">
              <span
                onChange={(e: any) => setQuantity(e.target.value)}
                className="block w-[32px] px-3 py-2 rounded-md text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-primary-color [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              >
                {product.product?.sizes}
              </span>
            </div>
          </div>

          <div className="mt-7 space-y-2">
            <h2 className="text-2xl ">Quantity:</h2>
            <div className="flex gap-2 items-center py-2  w-[140px] justify-between">
              <button
                className="border  py-1 px-2 rounded text-primary-color
               hover:text-primary-color"
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity === 1}
              >
                <Remove />
              </button>
              <span
                onChange={(e: any) => setQuantity(e.target.value)}
                className="block w-[32px] px-3 py-2 rounded-md text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-primary-color [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              >
                {quantity}
              </span>
              <button
                className="  py-1 px-2 rounded text-primary-color hover:text-primary-color border"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Add />
              </button>
            </div>
          </div>
          <div className=" mt-12 flex items-center gap-8 my-10">
            <Button
              fullWidth
              sx={{ py: "1rem" }}
              startIcon={<AddShoppingCart />}
              className="text-white"
              variant="contained"
              onClick={() => handleBag()}
            >
              Add to Bag
            </Button>

            <Button
              fullWidth
              sx={{ py: "1rem" }}
              startIcon={<FavoriteBorder />}
              variant="outlined"
              color="primary"
              onClick={handleWishlist}
            >
              Add to Wishlist
            </Button>
          </div>
          <div className="mt-5">{product.product?.description}</div>
        </section>
      </div>
      <div className="flex flex-col my-10 py-5">
        {[1, 1, 1].map((item, index) => (
          <ReviewCard key={index} />
        ))}
      </div>
      <SimilarProduct />
    </div>
  );
};

export default ProductDetails;
