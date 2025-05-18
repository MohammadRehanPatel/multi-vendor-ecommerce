import { Add } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { Address } from "../../../types/UserTypes";

const AddressCard = ({
  item,
  isSelected,
  onSelect,
}: {
  item: Address;
  isSelected: any;
  onSelect: any;
}) => {
  return (
    <div
      className="border flex p-5 rounded-md cursor-pointer"
      onClick={onSelect}
    >
      <div>
        <Radio
          checked={isSelected} // Check if this address is selected
          onChange={onSelect} // Call onSelect when the radio button is changed
          color="primary"
          value={item.id} // Assuming item has an id
          name="radio-button"
        />
      </div>
      <div className="space-y-3 pt-2">
        <h1>{item.name}</h1>
        <p className="w-[320px]">
          {item.city} {item.address}
        </p>
        <p className="w-[320px]">
          {item.locality} {item.state}
        </p>
        <p>
          <strong>Mobile:</strong> {item.mobile}{" "}
          {/* Assuming item has a mobile field */}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
