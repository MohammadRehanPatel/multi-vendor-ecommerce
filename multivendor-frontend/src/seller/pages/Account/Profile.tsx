import React from "react";
import { useAppSelecter } from "../../../State/Store";

const Profile = () => {
  const { seller } = useAppSelecter((store) => store);
  return (
    <div>
      {" "}
      <div className="border flex  p-5 rounded-md">
        <div className="space-y-3 ">
          <h1>{seller.profile.sellerName}</h1>
          <p className="w-[320px]">{seller.profile.pickupAddress?.city} </p>
          <p className="w-[320px]">{seller.profile.pickupAddress?.address}</p>
          <p>
            <strong>Mobile:</strong> {seller.profile.mobile}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
