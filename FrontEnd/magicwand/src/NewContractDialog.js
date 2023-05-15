import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function NewRepairDialog(props) {
  const handleSubmit = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContract),
    };
    fetch("http://localhost:3001/contracts", requestOptions)
      .then((res) => {
        props.handleClose();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [newContract, setNewContract] = React.useState({});
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>New Contract</DialogTitle>
      <DialogContent>
      <TextField
            onChange={(v) => {
              setNewContract({ ...newContract, contractId: parseInt(v.target.value) });
            }}
            autoFocus
            margin="dense"
            id="CotnractId"
            label="Contract Id"
            type="number"
            fullWidth
            variant="standard"
          />

        <InputLabel id="Customer">Customer</InputLabel>
          <Select
            required
            fullWidth
            variant="standard"
            id="ParentMachine"
            label="Parent Machine"
            onChange={(v) => {
                setNewContract({ ...newContract, phoneNo: v.target.value });
              }}
          >
            {props.customers.map(c => { return <MenuItem value={c.PHONENO}>{c.NAME}</MenuItem>})}
          </Select>
          <InputLabel id="Customer">Machine</InputLabel>
          <Select
            required
            fullWidth
            variant="standard"
            id="ParentMachine"
            label="Parent Machine"
            onChange={(v) => {
                setNewContract({ ...newContract, machineId: v.target.value });
              }}
          >
            <MenuItem value={""}>None</MenuItem>
            {props.machines.map(c => { return <MenuItem value={c.MACHINEID}>{c.MACHINEID} : {c.MAKE} - {c.MODEL} - {new Date(c.YEAR).getFullYear()}</MenuItem>})}
          </Select>


          <TextField
            onChange={(v) => {
              setNewContract({ ...newContract, startDate: v.target.value });
            }}
            autoFocus
            margin="dense"
            id="StartDate"
            value={newContract.startDate}
            label="Start Date"
            type="date"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            onChange={(v) => {
              setNewContract({ ...newContract, endDate: v.target.value });
            }}
            autoFocus
            margin="dense"
            id="EndDate"
            value={newContract.endDate}
            label="Start Date"
            type="date"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 30 }}
          />

          <TextField
            onChange={(v) => {
              setNewContract({ ...newContract, serviceFee: v.target.value });
            }}
            autoFocus
            margin="dense"
            id="ServiceFee"
            value={newContract.serviceFee}
            label="Service Fee"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 30 }}
          />

<InputLabel id="Customer">Type of Service</InputLabel>
<RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
    row
    onChange={(v) => setNewContract({ ...newContract, serviceType: v.target.value })}
  >
    <FormControlLabel value="H" control={<Radio />} label="Hardware" />
    <FormControlLabel value="S" control={<Radio />} label="Software" />
  </RadioGroup>
          

      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
}
