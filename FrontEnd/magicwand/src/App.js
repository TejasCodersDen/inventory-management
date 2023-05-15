import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SideMenu from "./SideMenu";
import Customer from "./Customers";
import Machines from "./Machines";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Parts from "./Parts";
import Invoice from "./Invoide";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});



export default function EnableColorOnDarkAppBar() {


  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {setOpen(!open);};
  const [page,setPage] = React.useState(0);
  const [customer,setCustomer] = React.useState({});

  const definePage = (c,value) =>{
    setPage(c);
    setCustomer(value);
    setOpen(false);
  }

  const renderPage = () =>{
    switch (page){
    case 0:
      return <Customer setPage={definePage} />;
    case 1:
      return <Machines/>;
    case 5:
      return <Parts/>;
    case 3:
      return <Invoice customer={customer}/>;
    default:
      return Customer(page);
  }

  }


  function appBarLabel(label) {
    return (
      <Toolbar>
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography align="center" variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {label}
        </Typography>
        <AutoFixHighIcon/>
      </Toolbar>
    );
  }
  

  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          {appBarLabel("Magic Wand")}
        </AppBar>
        <SideMenu open={open} toggle={toggleDrawer} setPage={definePage}/>
      </ThemeProvider>
       {renderPage()}
    </Stack>
  );
}
