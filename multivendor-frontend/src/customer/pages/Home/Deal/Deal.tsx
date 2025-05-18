import React from "react";
import DealCard from "./DealCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelecter } from "../../../../State/Store";
// import Slider from "react-slick";

const Deal = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const { customer } = useAppSelecter((store) => store);

  return (
    <div className="py-5 lg:px-20">
      <div className="flex items-center justify-between ">
        {/* <Slider {...defaultSettings}> */}
        {customer.homePageData?.deals.slice(0, 6).map((item, index) => (
          <DealCard key={index} item={item} />
        ))}
        {/* </Slider> */}
      </div>
    </div>
  );
};

export default Deal;
