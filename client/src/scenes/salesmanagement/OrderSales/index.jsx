import { Search } from "@mui/icons-material";
import { Box, Button, InputBase, Toolbar, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FlexBetween, Header } from "components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useEffect, useState } from "react";
import { baseUrl } from "state/api";

const OrderSales = () => {
  const theme = useTheme();
  const [orderSales, setOrderSale] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  console.log(orderSales);

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}sales-management/get-orderSales`
        );
        if (response.ok) {
          const data = await response.json();
          const orderSalesWithId = data.map((item, index) => ({
            ...item,
            id: index + 1,
          }));
          setOrderSale(orderSalesWithId);
        } else {
          console.error(
            "Failed to fetch order sales data:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchReceiptData();
  }, []);

  const handleDelete = (_id) => {
    setSelectedItemId(_id);
  };

  const columns = [
    { field: "orderNo", headerName: "Order No.", width: 100 },
    { field: "paymentType", headerName: "Payment Method", width: 140 },
    { field: "paymentCode", headerName: "Payment Code", width: 180 },
    { field: "orderType", headerName: "Order Type", width: 140 },
    { field: "noItems", headerName: "No. of Items/Dishes", width: 140 },
    {
      field: "promoUsed",
      headerName: "Promo Used",
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.promoUsed.map((promo) => promo.promoName).join(", ")}
        </div>
      ),
    },
    { field: "subTotal", headerName: "Sub Total (Php)", width: 140 },
    {
      field: "amountDiscounted",
      headerName: "Amount Discounted (Php)",
      width: 180,
    },
    { field: "totalAmount", headerName: "Total Amount (Php)", width: 140 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
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
      <Header title={"Order Sales"} link={"/sales management"} />

      <Box margin="1em 2em">
        <Toolbar
          width="100%"
          sx={{
            justifyContent: "space-between",
            padding: "0 !important",
            marginBottom: "1em",
          }}
        >
          <Button variant="contained" color="error" size="medium">
            Reset Order Sales
          </Button>

          <FlexBetween
            backgroundColor={theme.palette.secondary[700]}
            borderRadius="9px"
            gap="3rem"
            maxWidth="300px"
            width="100%"
            p="0.5rem 1.5rem"
          >
            <InputBase placeholder="Search Order Number..." />
            <Search />
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
            rows={orderSales}
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

export default OrderSales;
