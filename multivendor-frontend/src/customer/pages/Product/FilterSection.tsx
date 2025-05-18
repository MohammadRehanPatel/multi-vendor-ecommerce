import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { colors } from "../../../data/Filter/color";
import { useSearchParams } from "react-router-dom";
import { priceRanges } from "../../../data/Filter/price";
import { discounts } from "../../../data/Filter/discount";

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleToggleColor = () => {
    setExpandColor(!expandColor);
  };

  const updateFilterParams = (e: any) => {
    const { value, name } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    console.log("clearAllFilters " + searchParams);
    searchParams.forEach((value: any, key: any) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };

  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          size="small"
          className=" cursor-pointer font-semibold"
          sx={{ color: "#333333", fontWeight: "600" }}
          onClick={clearAllFilters}
        >
          Clear all
        </Button>
      </div>
      <Divider />
      <div className="px-9 space-y-6">
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333333",
                paddingBottom: "14px",
              }}
              className="text-2xl font-semibold"
              id="color"
            >
              Color
            </FormLabel>
            <RadioGroup aria-labelledby="color" defaultValue="" name="color">
              {colors
                .slice(0, expandColor ? colors.length : 5)
                .map((c, index) => (
                  <FormControlLabel
                    key={index}
                    value={c.name}
                    control={<Radio />}
                    name="color"
                    onChange={updateFilterParams}
                    label={
                      <div className="flex items-center gap-3">
                        <p>{c.name}</p>
                        <span
                          style={{ backgroundColor: c.hex }}
                          className={` h-5 w-5 p-2 rounded-full ${
                            c.name === "White" ? "border" : ""
                          } `}
                        ></span>
                      </div>
                    }
                  />
                ))}
            </RadioGroup>
          </FormControl>
          <div className="">
            <button
              onClick={handleToggleColor}
              className="text-primary-color cursor-pointer hover:text-gray-500 flex text-center"
            >
              {expandColor ? "hide" : `+${colors.length - 5} more`}
            </button>
          </div>
        </section>
        <Divider />
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333333",
                paddingBottom: "14px",
              }}
              className="text-2xl font-semibold"
              id="price"
            >
              Price
            </FormLabel>
            <RadioGroup
              aria-labelledby="price"
              onChange={updateFilterParams}
              defaultValue=""
              name="price"
            >
              {priceRanges.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>

        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333333",
                paddingBottom: "14px",
              }}
              className="text-2xl font-semibold"
              id="discount"
            >
              Discount
            </FormLabel>
            <RadioGroup
              aria-labelledby="discount"
              defaultValue=""
              onChange={updateFilterParams}
              name="discount"
            >
              {discounts.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
