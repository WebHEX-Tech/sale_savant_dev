import React, { useEffect, useState } from "react";
import { FlexBetween, Header } from "components";
import {
  Box,
  Container,
  InputBase,
  Toolbar,
  Divider,
  Button,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import DescriptionIcon from '@mui/icons-material/Description';

const SalesDeliveries = () => {
  const theme = useTheme();
  const [filteredAccount, setFilteredAccount] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const columns = [
    { field: "deliveryDate", headerName: "Delivery Date", width: 150 },
    { field: "supplierName", headerName: "Supplier", width: 150 },
    { field: "contactPerson", headerName: "Contact Person", width: 180 },
    {
      field: "divider",
      headerName: "",
      width: 20,
      sortable: false,
      renderCell: () => (
        <Divider orientation="vertical" sx={{ marginLeft: "2em" }} />
      ),
    },
    { field: "contactNo", headerName: "Contact Number", width: 160 },
    { field: "totalCost", headerName: "Total Cost (php)", width: 160 },
    { field: "received", headerName: "Received By", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    { field: "itemsDelivered", headerName: "Items Delivered", width: 180 },
  ];

  return (
    <>
      <Box>
          <Header title={"Supplier Deliveries"} disp={"none"} />
      </Box>

      <Box display="flex" flexDirection="column" width="100%" maxWidth="70vw">
        <Box>
          <Toolbar sx={{ justifyContent: "flex-end", flexWrap: "wrap" }}>
            <FlexBetween
              sx={{
                flexDirection: {
                  xs: "column-reverse",
                  lg: "row",
                },
              }}
            >
              <Container>
                <FlexBetween
                  backgroundColor={theme.palette.secondary[700]}
                  borderRadius="9px"
                  gap="3rem"
                  minWidth="300px"
                  width="100%"
                  p="0.1rem 1.5rem"
                >
                  <InputBase
                    placeholder="Search Name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <Search />
                </FlexBetween>
              </Container>
              
              <Button variant="contained" startIcon={<DescriptionIcon color="success"/>} sx={{ fontSize: "1em" }}>
                Export to Excel
              </Button>
            </FlexBetween>
          </Toolbar>
        </Box>

        <Box
          m="1.5rem 2.5rem"
          height="47vh"
          width="100%"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.secondary[700],
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              color: "black",
            },
            "& .MuiDataGrid-virtualScroller": {
              color: "black",
            },
            "& .MuiDataGrid-footerContainer": {
              color: "black",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.grey[200]} !important`,
            },
          }}
        >
          <DataGrid
            rows={filteredAccount}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </Box>
      </Box>

    </>
  );
};

export default SalesDeliveries;