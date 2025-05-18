import { Delete } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../../State/Store";
import {
  deleteCoupon,
  fetchAllCoupons,
} from "../../../State/admin/adminCouponSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const accountStatu = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description: "Account is Pending For Verification",
  },
  {
    status: "ACTIVE",
    title: "Active",
    description: "Account is active and in good state",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description: "Account is temporarily suspended ",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description: "Account is Deactivated ",
  },
  {
    status: "BANNED",
    title: "Banned",
    description: "Account permanently bannded due to  ",
  },
  {
    status: "CLOSED",
    title: "Closed",
    description: "Account permanently Closed   ",
  },
];

const Coupon = () => {
  const [accountStatus, setAccountStatus] = useState("ACTIVE");
  const { adminCoupon } = useAppSelecter((store) => store);
  const dispatch = useAppDispatch();
  const handleChange = (e: any) => {
    setAccountStatus(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchAllCoupons());
  }, []);

  const deleteCouponHandler = (id: number) => {
    dispatch(deleteCoupon(id));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Coupon Code</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell align="right">Min Order Value</StyledTableCell>
              <StyledTableCell align="right">Discount %</StyledTableCell>
              {/* <StyledTableCell align="right">Status</StyledTableCell> */}
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminCoupon.coupons.map((coupon) => (
              <StyledTableRow key={coupon.id}>
                <StyledTableCell component="th" scope="row">
                  {coupon.code}
                </StyledTableCell>
                <StyledTableCell>{coupon.validityStartDate}</StyledTableCell>
                <StyledTableCell align="right">
                  {coupon.validityEndDate}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {coupon.minimumOrderValue}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {coupon.discountPercentage}
                </StyledTableCell>
                {/* <StyledTableCell align="right">
                  <FormControl fullWidth>
                    <InputLabel id="color-label">Account Status</InputLabel>
                    <Select
                      label="Account Status"
                      value={accountStatus}
                      onChange={handleChange}
                    >
                      {accountStatu.map((item, index) => (
                        <MenuItem value={item.status} key={index}>
                          <div className="flex gap-2">{item.title}</div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </StyledTableCell> */}
                <StyledTableCell align="right">
                  <Button
                    onClick={() => deleteCouponHandler(coupon.id)}
                    color="error"
                  >
                    <Delete />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Coupon;
