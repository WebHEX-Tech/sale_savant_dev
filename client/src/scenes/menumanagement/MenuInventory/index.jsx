import React, { useEffect, useState } from "react";
import { FlexBetween, Header } from "components";
import {
  Box,
  Container,
  Divider,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

const MenuInventory = () => {
  const theme = useTheme();
  const [menuInventory, setMenuInventory] = useState([]);

  useEffect(() => {
    const fetchMenuInventory = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/menumanagement/menuInventory"
        );
        if (response.ok) {
          const data = await response.json();
          // Map the data to add an 'id' property to each row
          const menuInventoryWithId = data.map((item, index) => ({
            ...item,
            id: index + 1, // Use a unique identifier here
          }));
          setMenuInventory(menuInventoryWithId);
        } else {
          console.error("Failed to fetch menu inventory:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchMenuInventory();
  }, []);

  const handleDelete = (id) => {
    // Replace this alert with your actual delete logic
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu?"
    );
    if (confirmDelete) {
      // Your delete logic here, e.g., make a fetch request to delete the menu with the given id
      console.log(`Deleting menu with ID: ${id}`);
    }
  };

  const handleEdit = (id) => {};

  const columns = [
    { field: "menuId", headerName: "Menu ID", width: 80 },
    { field: "dateTime", headerName: "Date & Time", width: 160 },
    { field: "menuItem", headerName: "Menu Item", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "price", headerName: "Prices", type: "number", width: 100 },
    {
      field: "salesTarget",
      headerName: "Sales Target",
      type: "number",
      width: 100,
    },
    {
      field: "divider",
      headerName: "",
      width: 20,
      sortable: false,
      renderCell: () => (
        <Divider orientation="vertical" sx={{ marginLeft: "2em" }} />
      ),
    },
    { field: "noSold", headerName: "No. of Sold", type: "number", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor:
              params.row.noSold >= params.row.salesTarget
                ? "#B03021" // Sold Out
                : "#26B02B", // Available
            color: "#FFF",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          {params.row.noSold >= params.row.salesTarget ? "Sold Out" : "Available"}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "1em" }}>
          <EditIcon
            onClick={() => handleEdit(params.row.id)}
            sx={{ color: theme.palette.primary[300], cursor: "pointer", fontSize: "2.5em" }}
          />
          <DeleteForeverIcon
            onClick={() => handleDelete(params.row.id)}
            sx={{ color: theme.palette.secondary[400], cursor: "pointer", fontSize: "2.5em" }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Header title={"Menu Inventory"} />
      </Box>

      <Box>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          <FlexBetween>
            <Link
              style={{
                textDecoration: "none",
                color: theme.palette.primary[100],
              }}
              to="/add inventory"
            >
              <Container
                sx={{
                  display: "flex",
                  gap: "0.5em",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AddCircleIcon sx={{ color: "#35D03B", fontSize: "3em" }} />
                <Typography sx={{ fontSize: "1.5em" }}>
                  Add Menu Inventory
                </Typography>
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
            borderColor: theme.palette.secondary[100],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.secondary[700],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.secondary[700],
            color: theme.palette.secondary[100],
            borderColor: theme.palette.secondary[100],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={menuInventory}
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
