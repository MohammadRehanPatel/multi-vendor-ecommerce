import { Delete } from "@mui/icons-material";
import { Avatar, Box, Divider, Grid2, IconButton, Rating } from "@mui/material";
import React from "react";

const ReviewCard = () => {
  return (
    <div className="py-4">
      <div className="flex justify-between gap-3 space-y-2">
        <Grid2 container spacing={6} gap={3}>
          <Box>
            <Avatar
              className="h-12 w-12 object-cover rounded-full"
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
            >
              Z
            </Avatar>
          </Box>
          <Grid2 size={{ xs: 9 }}>
            <div className="">
              <h2 className="font-semibold text-lg">Emily Selman</h2>
              <p className="opacity-70">12:20PM</p>
              <Rating defaultValue={4} readOnly />
            </div>
            <p className="py-4 font-serif text-gray-500">
              This is the bag of my dreams. I took it on my last vacation and
              was able to fit an absurd amount of snacks for the many long and
              hungry flights.
            </p>
            <img
              className="h-24 w-24 object-cover"
              src="https://i.ebayimg.com/images/g/giMAAOSwyKxXg705/s-l1600.jpg"
            />
          </Grid2>
        </Grid2>
        <div className="">
          <IconButton>
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </div>
      </div>
      <Divider className="pt-2" />
    </div>
  );
};

export default ReviewCard;
