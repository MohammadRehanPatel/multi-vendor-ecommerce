import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
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
import { deleteDeal, getAllDeals } from "../../../State/admin/dealSlice";

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
    status: "CLOSEd",
    title: "Closed",
    description: "Account permanently Closed   ",
  },
];

const DealTable = () => {
  const [accountStatus, setAccountStatus] = useState("ACTIVE");
  const dispatch = useAppDispatch();
  const { deal } = useAppSelecter((store) => store);
  const handleChange = (e: any) => {
    setAccountStatus(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllDeals());
  }, []);

  const handleDelete = (id: number) => {
    dispatch(deleteDeal(id));
  };

  return (
    <>
      <div className="pb-5 w-60">
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
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Discount</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deal.deals.map((item, index) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>
                  <img
                    className="w-20 rounded-md"
                    src={item.category.image}
                    alt=""
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.category.categoryId}
                </StyledTableCell>
                <StyledTableCell align="right">{item.discount}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button color="warning">
                    <Edit />
                  </Button>{" "}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    onClick={() => handleDelete(item.id!)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>{" "}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DealTable;
