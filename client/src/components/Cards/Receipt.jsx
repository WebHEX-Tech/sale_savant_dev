import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { FlexBetween } from "components";
import { Add, Remove } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

const Receipt = ({ OrderType, OrderNo, addedDishes, setAddedDishes, menuData }) => {
  const theme = useTheme();

  const handleAddDish = (dish) => {
    setAddedDishes([...addedDishes, dish]);
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
  
  const createReceipt = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/cashier/create-receipt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: menuData.map((menu) => ({
              menuItem: menu._id,
              quantity: menu.quantity,
              price: menu.price,
            })),
            tableNo: 0, 
            orderNo: OrderNo,
            orderType: OrderType,
            totalAmount: calculateTotalAmount(),
          }),
        }
      );

      if (response.ok) {
        console.log("Receipt created successfully");
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
              <span
                style={{
                  background: theme.palette.primary[800],
                  color: theme.palette.secondary[300],
                  fontWeight: "600",
                  padding: "0 1em",
                  borderRadius: "2px",
                }}
              >
                10
              </span>
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
            <Button variant="contained">Select Table</Button>
            <Button variant="contained" color="success">
              Submit Order
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Receipt;
