import * as React from "react";
import PersonIcon from "@mui/icons-material/Person";
import ComputerIcon from "@mui/icons-material/Computer";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MemoryIcon from '@mui/icons-material/Memory';
import ConstructionIcon from '@mui/icons-material/Construction';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Drawer, Divider, List } from "@mui/material";
import {
  ListItemText,
  ListItemButton,
  ListSubheader,
  ListItemIcon,
} from "@mui/material";

export default function SideMenu(props) {
  return (
    <Drawer open={props.open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={props.toggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {" "}
        <ListItemButton onClick={() => props.setPage(0)}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>
        <ListItemButton  onClick={() => props.setPage(1)}>
          <ListItemIcon>
            <ComputerIcon />
          </ListItemIcon>
          <ListItemText primary="Machines" />
        </ListItemButton>

        <ListItemButton  onClick={() => props.setPage(5)}>
          <ListItemIcon>
            <MemoryIcon />
          </ListItemIcon>
          <ListItemText primary="Parts" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
