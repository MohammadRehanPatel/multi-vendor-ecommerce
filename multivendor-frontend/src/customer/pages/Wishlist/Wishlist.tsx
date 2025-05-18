import React, { useEffect } from "react";
import WishlistProductCard from "./WishlistProductCard";
import { useAppDispatch, useAppSelecter } from "../../../State/Store";
import { getWishlistByUserId } from "../../../State/customer/wishlistSlice";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelecter((store) => store);

  useEffect(() => {
    dispatch(getWishlistByUserId());
  }, []);

  return (
    <div className="h-[85vh] p-5 lg:p-20 ">
      <section>
        <h1>
          <strong>my Wishlist</strong> {wishlist.wishlist?.products.length || 0}{" "}
          Items
        </h1>
        <div className="pt-10 flex flex-wrap gap-5">
          {wishlist.wishlist?.products.map((item) => (
            <WishlistProductCard item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
