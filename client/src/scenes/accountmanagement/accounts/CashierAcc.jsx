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
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

const CashierAcc = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [account, setAccount] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const fetchAccounts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/accountManagement/accounts"
      );
      if (response.ok) {
        const data = await response.json();
        const accountWithId = data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setAccount(accountWithId);
      } else {
        console.error("Failed to fetch account:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/menumanagement/menuPromo/${selectedItemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log(`Account with ID ${selectedItemId} deleted successfully`);
        fetchAccounts();
      } else {
        console.error("Failed to delete account:", response.statusText);
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
    { field: "id", headerName: "ID", width: 220 },
    { field: "userName", headerName: "Name", width: 220 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    { field: "userNumber", headerName: "Unique No.", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
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
        <Header title={"Account Management"} link={"/account management"} />
        <Typography variant="h2" fontWeight="400" marginLeft="2em">
          Accounts
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" width="100%" maxWidth="70vw">
        <Box>
          <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
            <FlexBetween
              sx={{
                marginLeft: "3em",
                marginBottom: { xs: "2em", lg:'0' },
                gap: "2em",
              }}
            >
              <Link to="/manager accounts">
                <Button
                  variant="contained"
                  sx={{
                    background: theme.palette.primary[400],
                    fontSize: "1.2em",
                  }}
                >
                  Manager
                </Button>
              </Link>

              <Link to="/cashier accounts">
                <Button
                  variant="contained"
                  sx={{
                    background: theme.palette.primary[400],
                    fontSize: "1.2em",
                  }}
                >
                  Cashier
                </Button>
              </Link>
            </FlexBetween>

            <FlexBetween
              sx={{
                flexDirection: {
                  xs: "column-reverse",
                  lg: "row",
                },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: theme.palette.primary[100],
                  width: "100%",
                }}
                to="/add account"
              >
                <Container
                  sx={{
                    display: "flex",
                    gap: "0.5em",
                    alignItems: "center",
                    marginTop: {
                      xs: "1em",
                      lg: "0"
                    },
                  }}
                >
                  <AddCircleIcon sx={{ color: "#35D03B", fontSize: "3em" }} />
                  <Typography sx={{ fontSize: "1.5em" }}>
                    Add Account
                  </Typography>
                </Container>
              </Link>

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
            </FlexBetween>
          </Toolbar>
        </Box>

        <Box
          m="1.5rem 2.5rem"
          height="67vh"
          width="100%"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.grey[400],
              color: "black",
              borderColor: theme.palette.grey[100],
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.grey[300],
              color: "black",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.grey[400],
              color: "black",
              borderColor: theme.palette.grey[100],
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.grey[200]} !important`,
            },
          }}
        >
          <DataGrid
            rows={account}
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
          Are you sure you want to delete this account?
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

export default CashierAcc;
