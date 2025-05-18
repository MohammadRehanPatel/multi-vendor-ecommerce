import React, { useEffect, useState } from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
import { FavoriteBorder, ChatBubbleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../State/Store";
import { addProductToWishlist } from "../../../State/customer/wishlistSlice";
import { Product } from "../../../types/ProductTypes";

const ProductCard = ({ item }: { item: Product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isHovered, item.images.length]);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.id) {
      dispatch(addProductToWishlist({ productId: item.id }));
    }
  };

  return (
    <div
      onClick={() =>
        navigate(
          `/product-details/${item.category?.categoryId}/${item.title}/${item.id}`
        )
      }
      className="bg-white   rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Image Area */}
      <div
        className="relative w-full h-96 overflow-hidden "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {item.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="product"
            className={`absolute w-full h-full object-cover object-top transition-transform duration-700 ease-in-out ${
              idx === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Action Buttons */}
        {isHovered && (
          <div className="absolute bottom-3 right-4 flex gap-2 z-10">
            <Tooltip title="Add to Wishlist">
              <IconButton
                onClick={handleWishlist}
                className="bg-white shadow-md hover:bg-gray-100"
              >
                <FavoriteBorder color="error" fontSize="medium" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Comment">
              <IconButton className="bg-white shadow-lg border-primary-color  hover:bg-white">
                <ChatBubbleOutline color="primary" fontSize="medium" />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-1">
        <h3 className="text-sm font-medium text-gray-700">
          {item.title.length > 40
            ? item.title.slice(0, 37) + "..."
            : item.title}
        </h3>
        <p className="text-xs text-gray-500">
          {item.seller?.businessDetails.businessName}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-semibold text-gray-800">
            ₹{item.sellingPrice}
          </span>
          <span className="line-through text-gray-400 text-sm">
            ₹{item.mrpPrice}
          </span>
          <span className="text-sm font-medium text-green-500">
            {item.discountPercent}% off
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// import React, { useEffect, useState } from "react";
// import "./ProductCard.css";
// import { Button } from "@mui/material";
// import { Close, Favorite, ModeComment } from "@mui/icons-material";
// import { Product } from "../../../types/ProductTypes";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../../State/Store";
// import { addProductToWishlist } from "../../../State/customer/wishlistSlice";

// const images = [
//   "https://unstd.in/cdn/shop/files/OLIVE-GREEN_d6012f67-1e92-4af3-a6ca-1e6d90fb6ecb.jpg?v=1729851686&width=1000",
//   "https://unstd.in/cdn/shop/files/SAGE-GREEN-2.jpg?v=1734507963&width=1000",
//   "https://unstd.in/cdn/shop/files/NEAVY_bd17d166-21c8-4a70-84e9-024b22b59698.jpg?v=1729851686&width=1000",
//   "https://unstd.in/cdn/shop/files/BLACK_7df11807-93c3-49d9-8347-614a9160f3d7.jpg?v=1729851686&width=1000",
//   "https://unstd.in/cdn/shop/files/ROYAL-BLUE_4c2f1e41-ff29-4189-b548-037fcf57dbdf.jpg?v=1729851686&width=1000",
// ];
// const ProductCard = ({ item }: { item: Product }) => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     let interval: any;
//     if (isHovered) {
//       interval = setInterval(() => {
//         setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
//       }, 1200);
//     } else if (interval) {
//       clearInterval(interval);
//       interval = null;
//     }
//     return () => clearInterval(interval);
//   }, [isHovered]);

//   const handleWishlist = (e: any) => {
//     e.stopPropagation();
//     item.id && dispatch(addProductToWishlist({ productId: item.id }));
//   };

//   return (
//     <>
//       <div
//         onClick={() =>
//           navigate(
//             `/product-details/${item.category?.categoryId}/${item.title}/${item.id}`
//           )
//         }
//         className="group px-4 relative"
//       >
//         <div className="card">
//           {item.images.map((item, index) => (
//             <img
//               key={index}
//               className="card-media object-top"
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//               style={{
//                 transform: `translateX(${(index - currentImage) * 100}%)`,
//               }}
//               src={item}
//               alt=""
//             />
//           ))}

//           {isHovered && (
//             <div className="indicator flex flex-col items-center space-y-2">
//               <div className="flex gap-3">
//                 <Button
//                   onClick={handleWishlist}
//                   className=""
//                   variant="contained"
//                   color="primary"
//                 >
//                   <Favorite sx={{ color: "teal[500]" }} />{" "}
//                 </Button>
//                 <Button variant="contained" color="primary">
//                   <ModeComment sx={{ color: "teal[500]" }} />{" "}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
//           <div className="name">
//             <h1>{item.seller?.businessDetails.businessName}</h1>
//             <p>{item.title}</p>
//           </div>
//           <div className="price flex items-center gap-3">
//             <span className="font-semibold text-gray-800">
//               ₹ {item.sellingPrice}{" "}
//             </span>
//             <span className="thin-line-through  text-gray-400">
//               ₹ {item.mrpPrice}{" "}
//             </span>
//             <span className="text-primary-color font-semibold">
//               {item.discountPercent}%
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductCard;
