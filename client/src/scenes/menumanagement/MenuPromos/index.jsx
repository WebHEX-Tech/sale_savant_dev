import React, { useEffect, useState } from "react";
import { FlexBetween, Header } from "components";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

const MenuPromos = () => {
  const theme = useTheme();
  const [menuPromo, setMenuPromo] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const fetchMenuPromos = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/menumanagement/menuPromo"
      );
      if (response.ok) {
        const data = await response.json();
        const menuPromoWithId = data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setMenuPromo(menuPromoWithId);
      } else {
        console.error("Failed to fetch menu promo:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  useEffect(() => {
    fetchMenuPromos();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredRows = searchInput
    ? menuPromo.filter((row) =>
        row.promoName.toLowerCase().includes(searchInput.toLowerCase())
      )
    : menuPromo;

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/menumanagement/menuPromo/${selectedItemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log(`Promo with ID ${selectedItemId} deleted successfully`);
        fetchMenuPromos();
      } else {
        console.error("Failed to delete promo:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the delete:", error);
    } finally {
      setDeleteDialogOpen(false);
      setSelectedItemId(null);
    }
  };

  const handleDelete = (_id) => {
    setDeleteDialogOpen(true);
    setSelectedItemId(_id);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedItemId(null);
  };

  const columns = [
    { field: "id", headerName: "Promo ID", width: 80 },
    { field: "promoName", headerName: "Promo Name", width: 200 },
    { field: "applicability", headerName: "Promo Applicability", width: 200 },
    { field: "promoDesc", headerName: "Promo Description", width: 250 },
    {
      field: "promoType",
      headerName: "Promo Type",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.row.promoType === "Percentage"
            ? params.row.promoType
            : params.row.promoType + " Amount"}
        </div>
      ),
    },
    {
      field: "promoValue",
      headerName: "Promo Value",
      type: "number",
      width: 100,
      renderCell: (params) => (
        <div>
          {params.row.promoType === "Percentage"
            ? params.row.promoValue + "%"
            : params.row.promoValue}
        </div>
      ),
    },
    {
      field: "validDate",
      headerName: "Valid Until",
      width: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
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
    { field: "promoUsage", headerName: "Usage", type: "number", width: 50 },
    {
      field: "promoStatus",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor:
              params.row.promoStatus === "Expired"
                ? "#B03021" // Expired
                : "#26B02B", // Active
            color: "#FFF",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          {params.row.promoStatus}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "1em" }}>
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
        <Header title={"Menu Promos"} link={"/menu management"} />
      </Box>

      <Box>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          <FlexBetween>
            <Link
              style={{
                textDecoration: "none",
                color: theme.palette.primary[100],
                marginBottom: "1em",
              }}
              to="/add promo"
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
                  Add Menu Promo
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
                p="0.5rem 1.5rem"
              >
                <InputBase
                  placeholder="Search Promo Name..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                <Search />
              </FlexBetween>
            </Container>
          </FlexBetween>
        </Toolbar>
      </Box>

      <Box
        m="1.5rem 2.5rem"
        height="65vh"
        width="75vw"
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
          rows={filteredRows}
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

      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this promo?
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

export default MenuPromos;
