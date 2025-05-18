import React from "react";
import ReviewCard from "./ReviewCard";
import { Box, Grid, Grid2, LinearProgress, Rating } from "@mui/material";

const Review = () => {
  return (
    <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20  ">
      <section className=" w-full md:w-1/2 lg:w-[30%] ">
        <img
          src="https://cdn-media.powerlook.in/catalog/product/1/1/11176621.jpg?aio=w-768"
          alt=""
        />
        <div className="">
          <div className="">
            <p className="font-bold text-xl">Z-Clothing</p>
            <p className="text-lg text-gray-600">Men's Shirt</p>
          </div>
          <div className="price flex gap-3 items-center mt-4">
            <span className="text-2xl text-primary-color font-sans">₹ 799</span>
            <span className="text-xl line-through text-gray-400  ">₹ 988</span>
            <span className="text-primary-color text-2xl font-semibold">
              39% off
            </span>
          </div>
        </div>
      </section>
      <section className="space-y-5">
        <section>
          {" "}
          <h2 className="text-4xl text-primary-color">Review & Ratings</h2>
          <div className="my-4 space-y-5 py-5 border px-4">
            <div className="rating flex items-center pt-4 ">
              <Rating size="large" defaultValue={3} precision={0.5} />
              <span className="text-gray-300 pl-2 text-sm">Ratings</span>
            </div>
            <Box className="mt-5 space-y-3 py-4">
              <Grid2 container alignItems={"center"} gap={2}>
                <Grid2 size={{ xs: 2 }}>
                  <p>Excellent</p>
                </Grid2>
                <Grid2 size={{ xs: 7 }}>
                  <LinearProgress
                    sx={{ bgcolor: "#d5f8f1", borderRadius: 4, height: 7 }}
                    variant="determinate"
                    value={40}
                    // color="success"
                  />
                </Grid2>
              </Grid2>
              <Grid container alignItems={"center"} gap={2}>
                <Grid item xs={2}>
                  <p>Very Good</p>
                </Grid>
                <Grid item xs={7}>
                  <LinearProgress
                    sx={{
                      bgcolor: "#d0d0d0",
                      borderRadius: 4,
                      height: 7,
                    }}
                    variant="determinate"
                    value={30}
                    color="secondary"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems={"center"} gap={2}>
                <Grid item xs={2}>
                  <p>Good</p>
                </Grid>
                <Grid item xs={7}>
                  <LinearProgress
                    sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                    variant="determinate"
                    value={60}
                    color="info"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems={"center"} gap={2}>
                <Grid item xs={2}>
                  <p>Average</p>
                </Grid>
                <Grid item xs={7}>
                  <LinearProgress
                    sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                    variant="determinate"
                    value={20}
                    color="warning"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems={"center"} gap={2}>
                <Grid item xs={2}>
                  <p>Poor</p>
                </Grid>
                <Grid item xs={7}>
                  <LinearProgress
                    sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                    variant="determinate"
                    value={10}
                    color="error"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>
        </section>
        {[1, 1].map((item) => (
          <div className="space-y-3 ">
            <ReviewCard />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Review;
