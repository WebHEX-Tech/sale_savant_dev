import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import ClearIcon from "@mui/icons-material/Clear";
import { FlexBetween } from "components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTableDialog from "./AddModule/AddTable";

const ModifyTable = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleButtonClick = (link) => {
    navigate(link);
  };

  const fetchTableData = async () => {
    try {
      const response = await fetch("http://localhost:3001/cashier/get-table");
      if (response.ok) {
        const data = await response.json();
        setTables(data);
      } else {
        console.error("Failed to fetch table data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleSubmit = async (values, actions) => {
    try {
      const response = await fetch("http://localhost:3001/cashier/add-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add table");
      }
      console.log("Table added successfully");
      fetchTableData();
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding table:", error.message);
    }
  };

  const handleOpenDeleteDialog = (table) => {
    setSelectedTable(table);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedTable(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteTable = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/cashier/delete-table/${selectedTable._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log(`Table ${selectedTable.tableNo} deleted successfully`);
        fetchTableData();
      } else {
        console.error("Failed to delete table:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the delete:", error);
    } finally {
      handleCloseDeleteDialog();
    }
  };

  return (
    <Box margin="3em">
      <FlexBetween
        sx={{
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: "1em",
        }}
      >
        <div style={{ display: "flex", gap: "1em" }}>
          <Button
            variant="contained"
            sx={{background:theme.palette.primary[500]}}
            onClick={() => handleButtonClick("/take-order")}
          >
            Take Order
          </Button>
          <Button
            variant="contained"
            onClick={() => handleButtonClick("/checkout-list")}
          >
            Checkout
          </Button>
          <Button variant="contained">Refunds</Button>
        </div>

        <div style={{ display: "flex", gap: "2em" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5em",
            }}
          >
            <CircleIcon sx={{ color: "#1BD7EC", fontSize: "2.5em" }} />
            <Typography variant="h4"> Vacant</Typography>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5em",
            }}
          >
            <CircleIcon sx={{ color: "#B03021", fontSize: "2.5em" }} />
            <Typography variant="h4"> Occupied</Typography>
          </div>

          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenDialog(true)}
          >
            Add Table
          </Button>
        </div>
      </FlexBetween>

      <Box
        display="flex"
        flexWrap="wrap"
        sx={{
          background: theme.palette.secondary[800],
          margin: "1.5em 0",
          padding: "1em",
          borderRadius: "5px",
        }}
      >
        {/* Table Container */}
        {tables.map((table, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="0.5em"
            sx={{
              background: table.status === "Occupied" ? "#B03021" : "#1BD7EC",
              color: "#000",
              padding: "1em",
              borderRadius: "8px",
              margin: "0.5em",
              maxWidth: `${table.pax * 58}px`,
              maxHeight: `${table.pax * 60}px`,
              width: "100%",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Delete Table */}
            <IconButton
              onClick={() => handleOpenDeleteDialog(table)}
              sx={{
                position: "absolute",
                top: "2%",
                right: "2%",
                padding: "0.2em",
                fontSize: "1em",
              }}
            >
              <ClearIcon sx={{ fontSize: "1em" }} />
            </IconButton>
            <div>
              <Typography variant="h5">Table</Typography>
              <Typography variant="h2">{table.tableNo}</Typography>
            </div>
            <Typography variant="body1">Pax: {table.pax}</Typography>
          </Box>
        ))}
      </Box>
      <AddTableDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleSubmit={handleSubmit}
      />

      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle color="error">Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete table {selectedTable?.tableNo}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} sx={{ color: "#000" }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteTable} variant="outlined" color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModifyTable;
