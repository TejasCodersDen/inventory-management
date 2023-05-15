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

var columns = [
  { field: "PARTID", headerName: "ID", width: 200 },
  {
    field: "DESCRIPTION",
    headerName: "DESCRIPTION",
    width: 150,
    editable: false,
    sortable: true,
  },
  {
    field: "PRICE",
    headerName: "PRICE",
    sortable: true,
    width: 160,
    editable: false
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

export default function Parts() {
  const [open, setOpen] = React.useState(false);
  const [newPart, setNewPart] = React.useState({});
  const handleClickOpen = () =>  setOpen(true);
  const handleClose = () => {  setNewPart({}); setOpen(false); };
  const handleSubmit = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPart),
    };
    fetch("http://localhost:3001/parts", requestOptions)
      .then((res) => {
        handleClose();
        loadMachines();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const [parts, setParts] = React.useState(rows);

  const loadMachines = () => {
    fetch("http://localhost:3001/parts")
      .then((res) => res.json())
      .then((data) => {
        setParts(data);
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
          Parts
        </Typography>
        <IconButton onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Toolbar>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row.PARTID}
          rows={parts}
          columns={columns}
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Part</DialogTitle>
        <DialogContent>
          <DialogContentText>Insert the new parts's data</DialogContentText>
          <TextField
            onChange={(v) => {
              setNewPart({ ...newPart, partId: v.target.value });
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
              setNewPart({ ...newPart, description: v.target.value });
            }}
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            onChange={(v) => {
              setNewPart({ ...newPart, price: v.target.value });
            }}
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 33, pattern:'\d{3}\-\d{3}\-\d{4}'  }}
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
