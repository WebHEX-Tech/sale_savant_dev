import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { FlexBetween } from "components";
import { Add, Remove } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Receipt = ({
  OrderType,
  OrderNo,
  addedDishes,
  setAddedDishes,
  menuData,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTables, setSelectedTables] = useState([]);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/cashier/get-table"
        );
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

    fetchTableData();
  }, []);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCheckboxChange = (tableName) => {
    if (selectedTables.includes(tableName)) {
      setSelectedTables(selectedTables.filter((table) => table !== tableName));
    } else {
      if (selectedTables.length < 2) {
        setSelectedTables([...selectedTables, tableName]);
      } else {
        console.log("You can only select two tables.");
      }
    }
  };

  const handleConfirmTables = async () => {
    try {
      const updatedTables = tables.map((table) => {
        if (selectedTables.includes(table.tableNo)) {
          return { ...table, status: "Occupied" };
        }
        return table;
      });

      const response = await fetch(
        "http://localhost:3001/cashier/update-table-status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTables),
        }
      );

      if (response.ok) {
        console.log("Table status updated successfully");
        console.log("Selected Tables:", selectedTables);
        handleCloseDialog();
      } else {
        console.error("Failed to update table status:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during table status update:", error);
    }
  };

  // eslint-disable-next-line
  const handleAddDish = (dish) => {
    setAddedDishes([...addedDishes, { ...dish, _id: dish.menuId }]);
  };

  const handleQuantityChange = (index, action) => {
    const updatedDishes = [...addedDishes];
    const dish = updatedDishes[index];

    if (action === "increment") {
      dish.quantity++;
    } else if (action === "decrement") {
      if (dish.quantity > 1) {
        dish.quantity--;
      }
    }

    dish.total = dish.price * dish.quantity;
    setAddedDishes(updatedDishes);
  };

  const handleRemoveDish = (index) => {
    const updatedDishes = [...addedDishes];
    updatedDishes.splice(index, 1);
    setAddedDishes(updatedDishes);
  };

  const calculateTotalAmount = () => {
    if (addedDishes.length === 0) {
      return {
        vatable: 0,
        vat: 0,
        subTotal: 0,
      };
    }

    const totalAmount = addedDishes.reduce(
      (acc, dish) => {
        acc.total += dish.price * dish.quantity;
        return acc;
      },
      { total: 0, vatable: 0, vat: 0, subTotal: 0 }
    );

    totalAmount.vatable = totalAmount.total / 1.12;
    totalAmount.vat = totalAmount.total - totalAmount.vatable;
    totalAmount.subTotal = totalAmount.vatable + totalAmount.vat;

    return totalAmount;
  };

  const handleSubmitOrder = async () => {
    const orderDetails = {
      items: addedDishes.map((dish) => ({
        menuItemId: dish._id,
        menuItem: dish.menuName,
        quantity: dish.quantity,
        price: dish.price,
        totalPrice: dish.total,
      })),
      orderType: OrderType,
      tableNo: selectedTables.join(", "),
      orderNo: OrderNo,
      totalAmount: calculateTotalAmount().subTotal.toFixed(2),
    };

    try {
      const response = await fetch(
        "http://localhost:3001/cashier/create-receipt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        }
      );

      if (response.ok) {
        console.log("Order submitted successfully");
        navigate(`/order-placed/${OrderNo}`);
      } else {
        console.error("Failed to create receipt:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during receipt creation:", error);
    }
  };

  return (
    <>
      <Box
        margin="4em 1em"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "80vw", md: "20vw" },
          height: "90vh",
          zIndex: 2,
          boxShadow: { xs: "none", md: "0px 4px 6px rgba(0, 0, 0, 0.2)" },
          borderRadius: "6px",
        }}
      >
        <Box
          sx={{
            background: theme.palette.grey[800],
            borderRadius: "6px 6px 0 0",
            color: "#fff",
            padding: "1em",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>
              Table No.{" "}
              {selectedTables.length === 0 ? (
                <span
                  style={{
                    background: theme.palette.primary[800],
                    color: theme.palette.secondary[300],
                    fontWeight: "600",
                    padding: "0 1em",
                    borderRadius: "2px",
                  }}
                >
                  0
                </span>
              ) : (
                <span
                  style={{
                    background: theme.palette.primary[800],
                    color: theme.palette.secondary[300],
                    fontWeight: "600",
                    padding: "0 1em",
                    borderRadius: "2px",
                    marginRight: "0.5em",
                  }}
                >
                  {selectedTables.join(", ")}
                </span>
              )}
            </Typography>
            <Typography>
              Order No.{" "}
              <span
                style={{
                  background: theme.palette.primary[800],
                  color: theme.palette.secondary[300],
                  fontWeight: "600",
                  padding: "0 1em",
                  borderRadius: "2px",
                }}
              >
                {OrderNo}
              </span>
            </Typography>
          </div>
          <Typography sx={{ color: "#1CDE75", marginTop: "0.5em" }}>
            {OrderType}
          </Typography>
        </Box>
        <Box
          sx={{
            maxHeight: "60vh",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "0.2em",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "0.5em",
            },
          }}
        >
          {addedDishes.map((dish, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{ borderRadius: "0", background: "#fff", color: "#000" }}
            >
              <CardContent sx={{ padding: "0 !important" }}>
                <FlexBetween position="relative">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 60, height: 80 }}
                      alt={dish.menuName}
                      src={`http://localhost:3001/assets/${dish.img}`}
                      loading="lazy"
                    />
                    <div
                      style={{
                        width: "20vw",
                        margin: "0.5em",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5em",
                      }}
                    >
                      <Typography variant="body1" fontWeight={600}>
                        {dish.menuName}
                      </Typography>
                      <Typography variant="body1">{`Php ${dish.price}`}</Typography>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "0.7em",
                      marginTop: "0.7em",
                      gap: "0.4em",
                    }}
                  >
                    <Typography
                      variant="body1"
                      style={{
                        fontWeight: "600",
                        color: theme.palette.secondary[400],
                      }}
                    >{`Php ${dish.total}`}</Typography>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5em",
                      }}
                    >
                      <IconButton
                        sx={{
                          background: theme.palette.secondary[700],
                          fontSize: "0.8em",
                          padding: "5px",
                          "&:hover": {
                            background: theme.palette.secondary[500],
                          },
                        }}
                        onClick={() => handleQuantityChange(index, "decrement")}
                      >
                        <Remove fontSize="0.8em" />
                      </IconButton>
                      <Typography variant="body1">{dish.quantity}</Typography>
                      <IconButton
                        sx={{
                          background: theme.palette.secondary[700],
                          fontSize: "0.8em",
                          padding: "5px",
                          "&:hover": {
                            background: theme.palette.secondary[500],
                          },
                        }}
                        onClick={() => handleQuantityChange(index, "increment")}
                      >
                        <Add fontSize="0.8em" />
                      </IconButton>
                    </div>
                  </div>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "0.1px",
                      right: "0.1px",
                      padding: "1px",
                      fontSize: "1em",
                    }}
                    onClick={() => handleRemoveDish(index)}
                  >
                    <ClearIcon fontSize="1em" />
                  </IconButton>
                </FlexBetween>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box
          sx={{
            background: theme.palette.grey[800],
            borderRadius: "0 0 6px 6px",
            color: "#fff",
            padding: "1em",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.2em",
              padding: "0 0.5em",
            }}
          >
            <FlexBetween>
              <Typography sx={{ fontWeight: "200" }}>VATable</Typography>
              <Typography sx={{ fontWeight: "200" }}>
                {calculateTotalAmount().vatable.toFixed(2)}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography sx={{ fontWeight: "200" }}>VAT</Typography>
              <Typography sx={{ fontWeight: "200" }}>
                {calculateTotalAmount().vat.toFixed(2)}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography sx={{ fontWeight: "600" }}>Subtotal</Typography>
              <Typography sx={{ fontWeight: "600" }}>
                {calculateTotalAmount().subTotal.toFixed(2)}
              </Typography>
            </FlexBetween>
          </div>
          <Divider />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "2em",
              margin: "1em",
            }}
          >
            <Button variant="contained" onClick={handleOpenDialog}>Select Table</Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleSubmitOrder();
                handleConfirmTables();
              }}
            >
              Submit Order
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{background:theme.palette.primary[800], borderBottom:"solid black 1px"}}>
          <FlexBetween>
            <Typography>Select Tables (Maximum Tables: 2)</Typography>
            <div style={{display:"flex", justifyContent:"center", alignItems:'center', gap:'0.3em'}}>
              <div style={{width:'15px', height:'15px',border:"#B03021 solid 2px", borderRadius:"2px"}}></div>
            <Typography> Occupied</Typography>
            </div>
          </FlexBetween>
        </DialogTitle>
        <DialogContent>
          {tables.map((table, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedTables.includes(table.tableNo)}
                  onChange={() => handleCheckboxChange(table.tableNo)}
                  color={table.status === "Occupied" ? "default" : "secondary"}
                  disabled={table.status === "Occupied"}
                  sx={{
                    color: table.status === "Occupied" ? "#B03021" : undefined,
                  }}
                />
              }
              label={`Table ${table.tableNo} (Pax: ${table.pax})`}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleCloseDialog}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Receipt;
