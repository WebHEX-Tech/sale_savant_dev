import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FlexBetween, Header } from "components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "state/api";

const Supplier = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchSupplier();
  }, []);

  const fetchSupplier = async () => {
    try {
      const response = await fetch(
        `${baseUrl}supply-management/get-supplier`
      );
      if (response.ok) {
        const data = await response.json();
        const supplierWithId = data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setSupplier(supplierWithId);
      } else {
        console.error("Failed to fetch supplier:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredRows = supplier.filter(
    (row) =>
      row.supplierName.toLowerCase().includes(searchInput.toLowerCase()) ||
      row.contactPerson.toLowerCase().includes(searchInput.toLowerCase())
  );

  const sortedRows =
    selectedCategory === "All"
      ? filteredRows
      : [...filteredRows].sort((a, b) => {
          const nameA = a.category.toLowerCase();
          const nameB = b.category.toLowerCase();
          if (selectedCategory === "Ascending") {
            return nameA.localeCompare(nameB);
          } else {
            return nameB.localeCompare(nameA);
          }
        });

  const handleDelete = (_id) => {
    setDeleteDialogOpen(true);
    setSelectedItemId(_id);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedItemId(null);
  };

  const handleEdit = (_id) => {
    setSelectedItemId(_id);
    navigate(`/edit supplier/${_id}`);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${baseUrl}supply-management/delete-supplier/${selectedItemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log(`Supplier with ID ${selectedItemId} deleted successfully`);
        fetchSupplier();
      } else {
        console.error("Failed to delete suppplier:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the delete:", error);
    } finally {
      setDeleteDialogOpen(false);
      setSelectedItemId(null);
    }
  };

  const columns = [
    { field: "id", headerName: "Supplier ID", width: 140 },
    { field: "supplierName", headerName: "Supplier Name", width: 220 },
    { field: "category", headerName: "Item Category", width: 140 },
    { field: "contactPerson", headerName: "Contact Person", width: 200 },
    { field: "email", headerName: "Email", width: 240 },
    { field: "contactNo", headerName: "Contact #", width: 180 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "1em" }}>
          <EditIcon
            onClick={() => handleEdit(params.row._id)}
            sx={{
              color: theme.palette.primary[300],
              cursor: "pointer",
              fontSize: "2.5em",
            }}
          />
          <DeleteForeverIcon
            onClick={() => handleDelete(params.row._id)}
            sx={{
              color: theme.palette.secondary[400],
              cursor: "pointer",
              fontSize: "2.5em",
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <Box>
        <Header title={"Supplier Management"} disp={"none"} />
      </Box>

      <Box display="flex" flexDirection="column" width="100%" padding="1em 3em">
        <Toolbar
          sx={{
            flexWrap: "wrap",
            padding: "0 !important",
            marginBottom: "2em",
          }}
        >
          <FlexBetween
            sx={{
              width: "100%",
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row",
              },
              gap: "1em",
            }}
          >
            <Container sx={{ margin: "0 !important", padding: "0 !important" }}>
              <FlexBetween
                backgroundColor={theme.palette.secondary[700]}
                borderRadius="9px"
                width={{ xs: "80%", sm: "60%", md: "100%", lg: "60%" }}
                p="0.5rem 1.5rem"
              >
                <InputBase
                  sx={{ width: "100%" }}
                  placeholder="Search Supplier Name/Contact Person..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                <Search />
              </FlexBetween>
            </Container>

            <Box
              sx={{
                display: "flex",
                gap: "3em",
                flexWrap: {
                  xs: "wrap",
                  sm: "wrap",
                  md: "nowrap",
                  lg: "nowrap",
                },
              }}
            >
              <FormControl color="secondary">
                <InputLabel
                  id="products/services-label"
                  sx={{ color: theme.palette.primary[200] }}
                >
                  Products/Services
                </InputLabel>
                <Select
                  label="Products/Services"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  sx={{
                    width: "180px",
                    border: theme.palette.secondary[300],
                    color: theme.palette.primary[200],
                  }}
                >
                  <MenuItem value="Ascending">A-Z (Alphabetical)</MenuItem>
                  <MenuItem value="Descending">Z-A (Alphabetical)</MenuItem>
                </Select>
              </FormControl>

              <Link
                to="/add supplier"
                style={{ display: "flex", textDecoration: "none" }}
              >
                <Button variant="contained" color="success">
                  Add Supplier
                </Button>
              </Link>
            </Box>
          </FlexBetween>
        </Toolbar>

        <Box
          height="67vh"
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
            rows={sortedRows}
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

      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this supplier?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} sx={{ color: "#000" }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} sx={{ color: "#26B02B" }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Supplier;
