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
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';

var columns = [
  { field: "MACHINEID", headerName: "ID", width: 200 },
  {
    field: "MAKE",
    headerName: "MAKE",
    width: 150,
    editable: true,
    sortable: true,
  },
  {
    field: "MODEL",
    headerName: "MODEL",
    sortable: true,
    width: 160,
    editable: true,
  },
  {
    field: "YEAR",
    headerName: "YEAR",
    sortable: true,
    width: 160,
    editable: true,
    valueGetter: (params) => new Date(params.row.YEAR).getFullYear(),
  },
  {
    field: "TYPE",
    headerName: "TYPE",
    sortable: true,
    width: 160,
    editable: true,
  },
  {
    field: "size",
    headerName: "SIZE",
    sortable: true,
    width: 160,
    editable: true,
    valueGetter: (params) => (params.row.size > 0 ? params.row.size : "-"),
  },
  {
    field: "PARENTMACHINEID",
    headerName: "Parent Machine",
    sortable: true,
    width: 160,
    editable: true,
  },
];

const rows = [];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Machines() {
  const [open, setOpen] = React.useState(false);
  const [newMachine, setNewMachine] = React.useState({});
  const handleClickOpen = () =>  setOpen(true);
  const handleClose = () => {  setNewMachine({}); setOpen(false); };
  const handleSubmit = () => {
    console.log(newMachine);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMachine),
    };
    fetch("http://localhost:3001/machines", requestOptions)
      .then((res) => {
        handleClose();
        loadMachines();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const [customers, setCustomers] = React.useState(rows);

  const loadMachines = () => {
    fetch("http://localhost:3001/machines")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    loadMachines();
  }, []);

  return (
    <Container>
      <Toolbar style={{ background: "primary" }}>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Machines
        </Typography>
        <IconButton onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Toolbar>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row.MACHINEID}
          rows={customers}
          columns={columns}
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Machine</DialogTitle>
        <DialogContent>
          <DialogContentText>Insert the new customer's data</DialogContentText>
          <TextField
            onChange={(v) => {
              console.log(newMachine);
              setNewMachine({ ...newMachine, MACHINEID: v.target.value });
            }}
            autoFocus
            margin="dense"
            id="Id"
            label="Id"
            type="number"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 11 }}
          />

          <TextField
            onChange={(v) => {
              setNewMachine({ ...newMachine, MAKE: v.target.value });
            }}
            autoFocus
            margin="dense"
            id="MAKE"
            label="Make"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            onChange={(v) => {
              setNewMachine({ ...newMachine, MODEL: v.target.value });
            }}
            autoFocus
            margin="dense"
            id="MODEL"
            label="Model"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 30 }}
          />


          <TextField
            onChange={(v) => {
              setNewMachine({ ...newMachine, YEAR: v.target.value });
            }}
            autoFocus
            margin="dense"
            id="YEAR"
            value={newMachine.year}
            label="Fabrication Data"
            type="date"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 30 }}
          />

          <InputLabel id="Type">Type</InputLabel>
          <Select
            fullWidth
            variant="standard"
            id="Type"
            label="Type"
            onChange={(v) => {setNewMachine({ ...newMachine, TYPE: v.target.value });}}
          >
            <MenuItem value={"D"}>Desktop</MenuItem>
            <MenuItem value={"N"}>Notebook</MenuItem>
            <MenuItem value={"M"}>Monitor</MenuItem>
          </Select>

          <InputLabel id="ParentMachine">Parent</InputLabel>
          <Select
            required
            fullWidth
            variant="standard"
            id="ParentMachine"
            label="Parent Machine"
            onChange={(v) => {
                setNewMachine({ ...newMachine, parentId: v.target.value });
              }}
          >
            <MenuItem value={""}>None</MenuItem>
            {customers.map(c => <MenuItem value={c.MACHINEID}>{c.MACHINEID} - {c.MODEL} - {new Date(c.YEAR).getFullYear()}</MenuItem>)}
          </Select>

          <TextField
            onChange={(v) => {
              setNewMachine({ ...newMachine, Size: v.target.value });
            }}
            autoFocus
            margin="dense"
            id="Size"
            label="Size"
            type="number"
            fullWidth
            variant="standard"
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
