import { createTheme } from "@mui/material";

const customTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#37474F",
      // main: "#546E7A",
      contrastText: "#fff",
      
    },
    secondary: {
      main: "#FAE3D9",
      contrastText: "#FAE3D9",
    },
  },
});


export default customTheme