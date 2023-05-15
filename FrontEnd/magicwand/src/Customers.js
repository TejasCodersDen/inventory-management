import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import NewContractDialog from "./NewContractDialog";
import NewRepairDialog from "./NewRepairDialog";


const rows = [];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Customers(props) {
  const [customers, setCustomers] = React.useState([]);
  const [machines, setMachines] = React.useState([]);
  const [parts, setParts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openNewContract, setOpenNewContract] = React.useState(false);
  const [openNewRepairDialog, setOpenNewRepair] = React.useState(false);
  const [newCustomer, setNewCustomer] = React.useState({});

  
var columns = [
  { field: "PHONENO", headerName: "Phone No", width: 200 },
  {
    field: "NAME",
    headerName: "Name",
    width: 150,
    editable: true,
    sortable: true,
  },
  {
    field: "ADDRESS",
    headerName: "Address",
    sortable: true,
    width: 160,
    editable: true,
  },
  {
    field: "REPAIRS",
    headerName: "On Going Repairs",
    sortable: true,
    width: 160,
    editable: true,
  },

  {
    field: "CONTRACTS",
    headerName: "Active Contracts",
    sortable: true,
    width: 160,
    editable: true,
  },
  {
    field: "Bill",
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => props.setPage(3,cellValues.row)}
        >
          View
        </Button>
      );
    },
  },
];
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setNewCustomer({});
    setOpen(false);
  };

  const handleCloseNewContract = () => {
    loadCustomers();
    setOpenNewContract(false);
  };

  const handleOpenNewContract = () => {
    setOpenNewContract(true);
  };

  const handleCloseNewRepair = () => {
    loadCustomers();
    setOpenNewRepair(false);
  };

  const handleOpenNewRepair = () => {
    setOpenNewRepair(true);
  };
  const handleSubmit = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    };
    fetch("http://localhost:3001/customer", requestOptions)
      .then((res) => {
        handleClose();
        loadCustomers();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const loadCustomers = () => {
    fetch("http://localhost:3001/customer")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const loadMachines = () => {
    fetch("http://localhost:3001/machines")
      .then((res) => res.json())
      .then((data) => {
        setMachines(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const loadParts = () => {
    fetch("http://localhost:3001/parts")
      .then((res) => res.json())
      .then((o) => {
        setParts(o);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    loadCustomers();
    loadMachines();
    loadParts();
  }, []);

  return (
    <Container>
      <Toolbar style={{ background: "primary" }}>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Customers
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            New Customer
          </Button>

          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={handleOpenNewContract}
          >
            New Contract
          </Button>

          <Button
            sx
            variant="contained"
            endIcon={<AddIcon />}
            onClick={handleOpenNewRepair}
          >
            New Repair
          </Button>
        </Stack>
      </Toolbar>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row.PHONENO}
          rows={customers}
          columns={columns}
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>

      <NewContractDialog
        customers={customers}
        machines={machines}
        open={openNewContract}
        onClose={handleCloseNewContract}
        handleClose={handleCloseNewContract}
        handleSubmit={() => console.log("submit")}
      ></NewContractDialog>

      <NewRepairDialog
        customers={customers}
        machines={machines}
        parts={parts}
        open={openNewRepairDialog}
        onClose={handleCloseNewRepair}
        handleClose={handleCloseNewRepair}
      ></NewRepairDialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>Insert the new customer's data</DialogContentText>
          <TextField
            onChange={(v) => {
              setNewCustomer({ ...newCustomer, phoneNo: v.target.value });
            }}
            autoFocus
            margin="dense"
            id="PHONENO"
            label="Phone No"
            type="tel"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 11 }}
          />

          <TextField
            onChange={(v) => {
              setNewCustomer({ ...newCustomer, name: v.target.value });
            }}
            autoFocus
            margin="dense"
            id="NAME"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 30 }}
          />

          <TextField
            onChange={(v) => {
              setNewCustomer({ ...newCustomer, address: v.target.value });
            }}
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 100 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
