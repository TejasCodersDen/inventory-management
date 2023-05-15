import * as React from "react";
import { useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

var columns = [
  {
    field: "CONTRACTID",
    headerName: "Contract Id",
    width: 150,
    editable: false,
    sortable: true,
  },
  {
    field: "REPAIRJOB",
    headerName: "Repair Job",
    sortable: true,
    width: 100,
    editable: false
  },
  
  {
    field: "MACHINE",
    headerName: "Machine",
    sortable: true,
    width: 260,
    editable: false,
    valueGetter: (params) => `${params.row.MAKE} - ${params.row.MODEL}`
  },
  {
    field: "PROCESSED_AT",
    headerName: "Processed At",
    sortable: true,
    width: 160,
    editable: false
  },
  {
    field: "DESCRIPTION",
    headerName: "Description",
    sortable: true,
    width: 160,
    editable: false
  },
  {
    field: "SERVICEFEE",
    headerName: "SERVICE FEE",
    sortable: true,
    width: 160,
    editable: false
  },
  
  {
    field: "PRICE",
    headerName: "TOTAL",
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

export default function Invoice(props) {
  const [open, setOpen] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [invoice, setInvoice] = React.useState({});
  const handleClickOpen = () =>  setOpen(true);

  const loadInvoice = () => {
    fetch(`http://localhost:3001/invoice?phoneNo=${props.customer.PHONENO}`)
      .then((res) => res.json())
      .then((data) => {
        var tot = 0;
        data.forEach(element => {
            element.PRICE = parseInt(element.PRICE ?? 0);
            tot += element.PRICE;
        });
        setTotal(tot);
        setInvoice(data.map((a,i) => ({...a,id:i})));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    loadInvoice();
  }, []);

  return (
    <Container>
      <Toolbar style={{ background: "primary" }}>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Invoice - {props.customer.NAME}
        </Typography>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} align="right">
          TOTAL - US${total.toFixed(2)}
        </Typography>
      </Toolbar>
      <Box sx={{ height:800, width: "100%" }}>
        <DataGrid
          rows={invoice}
          columns={columns}
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>

      
    </Container>
  );
}
