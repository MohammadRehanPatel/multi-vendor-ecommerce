import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  AddShoppingCart,
  FavoriteBorder,
  Login,
  Storefront,
} from "@mui/icons-material";
import CategorySheet from "./CategorySheet";
import { mainCategory } from "../../../data/category/mainCategory";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Navbar.css";

import logo from "../../../assets/vendora-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { store, useAppSelecter } from "../../../State/Store";

// FF6F61
// FAE3D9
const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAppSelecter((store) => store);

  useEffect(() => {}, [auth.isLoggedIn]);

  return (
    <>
      <Box sx={{ zIndex: 2 }} className="sticky top-0 right-0 left-0 bg-white">
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b ">
          <div className="flex items-center  gap-9 justify-center">
            <div className="flex items-center ">
              {!isLarge && (
                <IconButton>
                  <MenuIcon />
                </IconButton>
              )}
              <h1
                onClick={() => navigate("/")}
                className=" flex items-center logo cursor-pointer text-lg md:text-2xl text-primary-color"
              >
                <img src={logo} className="h-12 w-12" alt="" />
                Vendora
              </h1>
            </div>
            <ul className="menu flex items-center font-medium text-primary-color ">
              {mainCategory.map((item, index) => (
                <li
                  key={index}
                  onMouseLeave={() => setShowCategorySheet(false)}
                  onMouseEnter={() => {
                    setShowCategorySheet(true);
                    setSelectedCategory(item.categoryId);
                  }}
                  className="mainCategory menu-item transition-colors duration-300 hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center "
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-1 lg:gap-6 items-center">
            <IconButton>
              <SearchIcon color="primary" />
            </IconButton>
            {auth.user ? (
              <Button
                onClick={() => navigate("/account/orders")}
                className="flex items-center gap-2"
              >
                {" "}
                <Avatar
                  sx={{ width: 29, height: 29 }}
                  src={
                    "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_640.png"
                  }
                />{" "}
                <h1 className="font-semibold hidden lg:block">
                  {auth.user?.fullName}
                </h1>
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  component="span"
                >
                  {" "}
                  Login
                  <IconButton>
                    <Login className="text-white" />
                  </IconButton>{" "}
                </Button>
              </>
            )}
            <IconButton onClick={() => navigate("/wishlist")}>
              <FavoriteBorder color="primary" sx={{ fontSize: 29 }} />
            </IconButton>
            <IconButton onClick={() => navigate("/cart")}>
              <AddShoppingCart
                className="text-primary-color"
                sx={{ fontSize: 29 }}
              />
            </IconButton>
            {isLarge ? (
              <>
                <Button
                  startIcon={<Storefront />}
                  className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-primary-color hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                  variant="outlined"
                  onClick={() => navigate("/become-seller")}
                >
                  Become Seller
                  <svg
                    className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                    viewBox="0 0 16 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                      className="fill-primary-color group-hover:fill-primary-color"
                    ></path>
                  </svg>
                </Button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        {showCategorySheet && (
          <motion.div
            onMouseLeave={() => setShowCategorySheet(false)}
            onMouseEnter={() => setShowCategorySheet(true)}
            className="categorySheet absolute top-[4.41rem] left-20 right-20 transition-all ease-out duration-200"
          >
            <CategorySheet selectedCategory={selectedCategory} />
          </motion.div>
        )}
      </Box>
    </>
  );
};

export default Navbar;
