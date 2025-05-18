import React from "react";
import { motion } from "framer-motion";

const CategoryGrid = () => {
  const products = [
    {
      id: 1,
      name: "Stylish Sofa",
      price: "$499",
      img: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Elegant Lamp",
      price: "$79",
      img: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Modern Table",
      price: "$299",
      img: "https://via.placeholder.com/300",
    },
    {
      id: 4,
      name: "Cozy Armchair",
      price: "$399",
      img: "https://via.placeholder.com/300",
    },
    {
      id: 5,
      name: "Wooden Shelf",
      price: "$129",
      img: "https://via.placeholder.com/300",
    },
    {
      id: 6,
      name: "Minimalist Desk",
      price: "$199",
      img: "https://via.placeholder.com/300",
    },
  ];
  return (
    <>
      {/*  */}
      <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-3 row-span-12 text-white "
        >
          <img
            className="w-full h-full hover:scale-105 transition-all ease-in-out duration-300 object-cover object-top rounded-md "
            src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQQemLVtnS8JJTjaHb_XtVInPsOgQ1QOguIUj8pjcFjF8BC1laI-imSCNzBiL4wXJwa9J6gzF8RahpxL6ppfGGT02rOne4ZZorms1eM_EbUjgjNDScy1BXCQA"
            alt=""
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-2 row-span-6 text-white "
        >
          <img
            className="w-full h-full hover:scale-105 transition-all ease-in-out duration-300 object-cover object-top rounded-md "
            src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSjkO89Pqky6qKvouAuIeejieO4VIzUyxL5sPqePGEtzIuzXcTgMmbJY9N9T-22VL4fVGGW1lDMiyiiEZrWkeF8Ru-m6gGVPfe1XvY0Q3pPhLPa-4WenO5LoQ"
            alt=""
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-4 row-span-6 text-white "
        >
          <img
            className="w-full h-full hover:scale-105 transition-all ease-in-out duration-300 object-cover object-top rounded-md "
            src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRFCuA4u5bB9Y8D269CyjWd57OS5AK6km4huo028Y4nSq-kjvrRFStnjCdjwhRXDnZhT8C_hR1gR_-EGIv_RJ5U5je58AL1bXhVt2oIW5v4CsQT_4OH51sF"
            alt=""
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-3 row-span-12 text-white "
        >
          <img
            className="w-full h-full hover:scale-105 transition-all ease-in-out duration-300 object-cover object-top rounded-md "
            src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTxOFDF2i0UG94Hg23cksuiCtAX5wxWZX16o81RqnMHfUzY6fFuR--acKZoUqTBS3Q2gTUsDYxMnJs0HUUm0bGXPE8ztrDy28PEUHygmLVxmJZgU6dBnqe5PQ"
            alt=""
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-4 row-span-6 text-white "
        >
          <img
            className="w-full h-full hover:scale-105 transition-all ease-in-out duration-300 object-cover object-top rounded-md "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWHpQQ-PVzsFYuUh_131q5HaMRQB7PcUlKkQ&s"
            alt=""
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="col-span-2 row-span-6 text-white "
        >
          <img
            className="w-full hover:scale-105 transition-all ease-in-out duration-300 h-full object-cover object-top rounded-md "
            src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT8B6ridzl4M744rb8EyEnNLyFdAHh9-ivdwJa6MuedEGLR0CVSKdaYbJqGjC1j7ibUkVlUeKA4FyXFwGSsKmUb6jKZCkfQ644dFzLX2WhEgFtlhFXoHzJ8jQ"
            alt=""
          />
        </motion.div>
      </div>
    </>
  );
};

export default CategoryGrid;
