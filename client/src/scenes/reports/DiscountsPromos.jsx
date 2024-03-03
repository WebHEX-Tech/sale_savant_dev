import React, { useEffect, useState } from "react";
import { FlexBetween, Header } from "components";
import {
  Box,
  Container,
  InputBase,
  Toolbar,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

const DiscountsPromos = () => {
  const theme = useTheme();
  const [account, setAccount] = useState([]);
  const [filteredAccount, setFilteredAccount] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAccounts = async () => {
    try {
      const response = await fetch("");
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

  useEffect(() => {
    const filtered = account.filter(
      (acc) =>
        acc.role === "Manager" &&
        acc.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAccount(filtered);
  }, [account, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
    { field: "_id", headerName: "Name", width: 250 },
    { field: "userName", headerName: "ID No.", width: 200 },
    { field: "role", headerName: "Discount Applied", width: 300 },
    { field: "createdAt", headerName: "Discount %", width: 200 },
    { field: "userNumber", headerName: "Amount Discounted", width: 200 },
  ];

  return (
    <>
    
      <Box>
        <Header title={"DISCOUNT AND PROMOS"} disp={"none"} />
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
            </FlexBetween>
          </Toolbar>
        </Box>

        <Box
          m="1.5rem 2.5rem"
          height="47vh"
          width="100%"
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

export default DiscountsPromos;
