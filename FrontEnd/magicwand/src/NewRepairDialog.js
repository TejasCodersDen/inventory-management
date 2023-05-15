import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function NewRepairDialog(props) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const handleSubmit = () => {
    newRepair.partsId = selectedParts;
    newRepair.fee = newRepair.serviceType == "S" ? 15 : 10;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRepair),
    };
    fetch("http://localhost:3001/repair", requestOptions)
      .then((res) => {
        props.handleClose();
      })
      .catch((err) => {
        alert(err); 
      });
  };

  const [newRepair, setNewRepair] = React.useState({});
  const [selectedParts, setSelectedParts] = React.useState([]);
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>New Repair</DialogTitle>
      <DialogContent>
        <InputLabel id="Customer">Customer</InputLabel>
        <Select
          required
          fullWidth
          variant="standard"
          id="PhoneNo"
          label="Customer"
          onChange={(v) => {
            setNewRepair({ ...newRepair, phoneNo: v.target.value });
          }}
        >
          {props.customers.map((c) => {
            return <MenuItem value={c.PHONENO}>{c.NAME}</MenuItem>;
          })}
        </Select>
        <InputLabel id="Customer">Machine</InputLabel>
        <Select
          required
          fullWidth
          variant="standard"
          id="ParentMachine"
          label="Parent Machine"
          onChange={(v) => {
            setNewRepair({ ...newRepair, machineId: v.target.value });
          }}
        >
          <MenuItem value={""}>None</MenuItem>
          {props.machines.map((c) => {
            return (
              <MenuItem value={c.MACHINEID}>
                {c.MACHINEID} : {c.MAKE} - {c.MODEL} -{" "}
                {new Date(c.YEAR).getFullYear()}
              </MenuItem>
            );
          })}
        </Select>

        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedParts}
          onChange={(a) => setSelectedParts(a.target.value)}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.parts.map((c) => (
            <MenuItem key={c.DESCRIPTION} value={c.PARTID}>
              {c.DESCRIPTION}
            </MenuItem>
          ))}
        </Select>

        <InputLabel id="Customer">Type of Service</InputLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="H"
          name="radio-buttons-group"
          row
          onChange={(v) =>
            setNewRepair({ ...newRepair, serviceType: v.target.value })
          }
        >
          <FormControlLabel value="H" control={<Radio />} label="Hardware" />
          <FormControlLabel value="S" control={<Radio />} label="Software" />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setNewRepair({});
            setSelectedParts([]);
            props.handleClose();
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
}
