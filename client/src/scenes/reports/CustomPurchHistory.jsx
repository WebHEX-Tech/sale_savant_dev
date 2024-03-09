import React, { useEffect, useState } from "react";
import { FlexBetween, Header } from "components";
import {
  Box,
  Container,
  InputBase,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import DescriptionIcon from '@mui/icons-material/Description';

const CustomPurchHistory = () => {
    const theme = useTheme();
    const [filteredAccount, setFilteredAccount] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    };

    const columns = [
    { field: "transactID", headerName: "Transaction ID", width: 150 },
    {
        field: "validDate",
        headerName: "Date",
        width: 150,
    },
    { field: "product", headerName: "Product", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 140 },
    { field: "modifiers", headerName: "Modifiers", width: 150 },
    { field: "discount", headerName: "Discount", width: 150 },
    { field: "refund", headerName: "Refund", width: 150 },
    { field: "totalAmount", headerName: "Total Amount", width: 150 },
    { field: "payType", headerName: "Payment Type", width: 150 },
    ];

    return (
    <>
        <Box>
            <Header title={"Customer Purchase History"} disp={"none"} />
        </Box>

        <Box display="flex" flexDirection="column" width="100%" maxWidth="70vw">
        <Box>
            <Toolbar sx={{ flexWrap: "wrap", marginLeft: "2em"}}>
            <FlexBetween
                sx={{
                width: "100%",
                flexDirection: {
                    xs: "column-reverse",
                    lg: "row",
                },
                }}
            >
            <Box width="28vw" sx={{ background: theme.palette.grey[300], padding: "1em 1.5em", borderRadius: "20px"}}> 
                <Typography variant="h5" sx={{ color: theme.palette.secondary[400] }}>
                    Total Sales
                </Typography>
                <Typography variant="h2" sx={{ textAlign: "center", margin: ".5em 0", color: "#000" }}>
                    PHP 6969
                </Typography>
            </Box>
            
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

export default CustomPurchHistory;