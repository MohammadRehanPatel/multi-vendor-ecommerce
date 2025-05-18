import {
  AccountBalanceWallet,
  AccountBox,
  Add,
  Dashboard,
  Inventory,
  Logout,
  Receipt,
  ShoppingBag,
} from "@mui/icons-material";
import React from "react";
import DrawerList from "../../../components/DrawerList";

const menu1 = [
  {
    name: "Dashboard",
    path: "/seller",
    icon: <Dashboard color="primary" className="text-primary-color" />,
    activeIcon: <Dashboard className="text-white" />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBag color="primary" className="text-primary-color" />,
    activeIcon: <ShoppingBag className="text-white" />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <Inventory color="primary" className="text-primary-color" />,
    activeIcon: <Inventory className="text-white" />,
  },
  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: <Add color="primary" className="text-primary-color" />,
    activeIcon: <Add className="text-white" />,
  },
  {
    name: "Payment",
    path: "/seller/payment",
    icon: (
      <AccountBalanceWallet color="primary" className="text-primary-color" />
    ),
    activeIcon: <AccountBalanceWallet className="text-white" />,
  },
  {
    name: "Transaction",
    path: "/seller/transaction",
    icon: <Receipt color="primary" className="text-primary-color" />,
    activeIcon: <Receipt className="text-white" />,
  },
];
const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox color="primary" className="text-primary-color" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout color="primary" className="text-primary-color" />,
    activeIcon: <Logout className="text-white" />,
  },
];

const SellerDrawerList = ({ toggleDrawer }: { toggleDrawer: any }) => {
  return <DrawerList menu1={menu1} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default SellerDrawerList;
