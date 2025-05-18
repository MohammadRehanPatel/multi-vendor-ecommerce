import { Divider } from "@mui/material";
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Orders from "./Orders";
import OrderDetail from "./OrderDetail";
import UserDetails from "./UserDetails";
import Address from "./Address";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../State/Store";
import { logout } from "../../../State/AuthSlice";

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleClick = (item: any) => {
    if (item === "/") {
      dispatch(logout(navigate));
    }
    navigate(item);
  };
  const menu = [
    {
      name: "Orders",
      path: "/account/orders",
    },
    {
      name: "Profile",
      path: "/account/",
    },
    {
      name: "Saved Cards",
      path: "/account/saved-cards",
    },
    {
      name: "Addresses",
      path: "/account/addresses",
    },
    {
      name: "Logout",
      path: "/",
    },
  ];

  return (
    <div className="px-5 lg:px-52 min-h-screen mt-10">
      <div className="">
        <h1 className="pb-5 text-xl font-bold">John</h1>
      </div>
      <Divider />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]">
        <section className="col-span-1 lg:border-r  lg:pr-5 py-5 h-full fl">
          {menu.map((item) => (
            <div
              onClick={() => handleClick(item.path)}
              key={item.name}
              className={` ${
                item.path === location.pathname
                  ? "bg-primary-color text-white"
                  : ""
              } py-4 px-5  space-y-4 rounded-md cursor-pointer hover:text-white hover:bg-primary-color hover:border hover:bg-opacity-90`}
            >
              <p className="">{item.name}</p>
            </div>
          ))}
        </section>
        <section className=" right lg:col-span-2 lg:pl-5 py-5">
          <Routes>
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<UserDetails />} />
            <Route
              path="/orders/:orderId/:orderItemId"
              element={<OrderDetail />}
            />
            <Route path="/addresses" element={<Address />} />
          </Routes>

          {/* <Orders /> */}
          {/* <OrderDetail /> */}
          {/* <UserDetails /> */}
        </section>
      </div>
    </div>
  );
};

export default Account;
