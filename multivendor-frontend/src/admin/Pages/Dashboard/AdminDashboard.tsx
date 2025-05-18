import React, { useEffect } from "react";
import DrawerList from "../../../components/DrawerList";
import AdminRoutes from "../../../Routes/AdminRoutes";
import AdminDrawerList from "../../components/AdminDrawerList";
import { useAppDispatch } from "../../../State/Store";
import { fetchHomeCategories } from "../../../State/admin/adminSlice";

const Dashboard = () => {
  const toggleDrawer = () => {};
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHomeCategories());
  }, []);
  return (
    <div className="">
      <div className="lg:flex lg:h-[90vh]">
        <section className="hidden lg:block h-full">
          <AdminDrawerList toggleDrawer={toggleDrawer} />
        </section>
        <section className="p-10 w-full lg:w-[80%] overflow-y-auto ">
          <AdminRoutes />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
