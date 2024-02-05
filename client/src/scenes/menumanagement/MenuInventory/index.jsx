import React from "react";
import { FlexBetween, Header } from "components";
import {
  Box,
  Container,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
];

const MenuInventory = () => {
  const theme = useTheme();

  return (
    <>
      <Box>
        <Header title={"Menu Inventory"} />
      </Box>

      <Box>
        <Toolbar sx={{justifyContent:'space-between', flexWrap:'wrap'}}>
          <FlexBetween>
            <Link style={{textDecoration:'none', color:theme.palette.primary[100]}} to="/add inventory">
              <Container sx={{display:'flex', gap:'0.5em', justifyContent:'center', alignItems:'center'}}>
                <AddCircleIcon sx={{ color: "#35D03B", fontSize:'3em' }} />
                <Typography sx={{fontSize:'1.5em'}}>Add Menu Inventory</Typography>
              </Container>
            </Link>
          </FlexBetween>

          <FlexBetween>
            <Container>
              <FlexBetween
                backgroundColor={theme.palette.secondary[700]}
                borderRadius="9px"
                gap="3rem"
                minWidth="300px"
                width="100%"
                p="0.1rem 1.5rem"
              >
                <InputBase placeholder="Search..." />
                <IconButton>
                  <Search />
                </IconButton>
              </FlexBetween>
            </Container>

            <Container></Container>
          </FlexBetween>
        </Toolbar>
      </Box>

      <Box
        m="1.5rem 2.5rem"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.secondary[700],
            color: theme.palette.secondary[100],
            borderColor: theme.palette.secondary[100]
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.secondary[700],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.secondary[700],
            color: theme.palette.secondary[100],
            borderColor: theme.palette.secondary[100]
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      </Box>
    </>
  );
};

export default MenuInventory;
