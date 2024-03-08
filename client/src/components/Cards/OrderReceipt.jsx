import {
  Card,
  Box,
  Button,
  CardContent,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { FlexBetween } from "components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "state/api";

const OrderReceipt = ({
  orderId,
  tableNo,
  orderNo,
  orderType,
  items,
  amountDiscounted,
  subtotal,
  totalAmount,
  promos,
  status,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [transactionCode, setTransactionCode] = useState("N/A");
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const [amountPaid, setAmountPaid] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  console.log(promos);

  const changeReceiptStatus = async (newStatus) => {
    try {
      const response = await fetch(
        `${baseUrl}cashier/update-receipt-status/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        console.log("Order status updated successfully");
      } else {
        console.error("Failed to update order status:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while updating order status:", error);
    }
  };

  const addOrderSale = async () => {
    try {
      const requestBody = {
        orderNo,
        paymentType: selectedPaymentType,
        paymentCode: transactionCode,
        orderType,
        noItems: items.length,
        promoUsed: promos.map((promo) => ({
          promoName: promo.promoName,
        })),
        subTotal: subtotal,
        amountDiscounted,
        totalAmount,
        amountPaid: amountPaid,
      };

      const response = await fetch(`${baseUrl}cashier/add-orderSale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { _id } = responseData;
        console.log("Payment confirmed successfully");
        navigate(`/checkout-order/${_id}`);
      } else {
        console.error("Failed to confirm payment:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during payment confirmation:", error);
    }
  };

  const handlePaymentClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmPayment = () => {
    if (amountPaid < totalAmount) {
      setAlertOpen(true);
      return;
    }
    addOrderSale();
    changeReceiptStatus("Paid");
    setDialogOpen(false);
  };

  const handlePaymentTypeChange = (event) => {
    setSelectedPaymentType(event.target.value);
  };

  const handleTransactionCodeChange = (event) => {
    setTransactionCode(event.target.value);
  };

  const handleAmountPaidChange = (event) => {
    setAmountPaid(event.target.value);
  };
  return (
    <>
      <Box
        position={isDesktop ? "fixed" : "relative"}
        margin={isDesktop ? "1em" : "4em 1em"}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "80vw", md: "21vw" },
          height: "87vh",
          zIndex: 2,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          borderRadius: "6px",
          background: "#fff",
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
                  padding: "0 0.2em",
                  borderRadius: "2px",
                  whiteSpace: "nowrap",
                  marginRight: "0.5em",
                }}
              >
                {tableNo}
              </span>
            </Typography>
            <Typography>
              Order No.{" "}
              <span
                style={{
                  background: theme.palette.primary[800],
                  color: theme.palette.secondary[300],
                  fontWeight: "600",
                  padding: "0 0.2em",
                  borderRadius: "2px",
                }}
              >
                {orderNo}
              </span>
            </Typography>
          </div>
          <Typography sx={{ color: "#1CDE75", marginTop: "0.5em" }}>
            {orderType}
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
          {items.map((dish, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                borderRadius: "0",
                background: "#fff",
                color: "#000",
                padding: "1em 0.5em",
              }}
            >
              <CardContent sx={{ padding: "0 !important" }}>
                <FlexBetween position="relative" gap="3em">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        margin: "0.5em",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5em",
                      }}
                    >
                      <Typography variant="body1" fontWeight={600}>
                        {dish.menuItem}
                      </Typography>
                      <Typography variant="body1">{`Php ${dish.price.toFixed(
                        2
                      )}`}</Typography>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      marginRight: "0.7em",
                      marginTop: "0.7em",
                      gap: "0.4em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography>Quantity: {dish.quantity}</Typography>
                    <Typography
                      variant="body1"
                      style={{
                        fontWeight: "600",
                        color: theme.palette.secondary[400],
                      }}
                    >{`Php ${dish.totalPrice.toFixed(2)}`}</Typography>
                  </div>
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
              gap: "0.8em",
              padding: "0 0.5em",
            }}
          >
            <FlexBetween>
              <Typography sx={{ fontWeight: "200" }}>Includes Vat</Typography>
              <Typography sx={{ fontWeight: "200" }}> --------- </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography sx={{ fontWeight: "200" }}>Subtotal</Typography>
              <Typography sx={{ fontWeight: "200" }}>{subtotal}</Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography sx={{ fontWeight: "200" }}>Discount</Typography>
              <Typography sx={{ fontWeight: "200", color: "#FF97A1" }}>
                -{amountDiscounted}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography sx={{ fontWeight: "600" }}>Total</Typography>
              <Typography sx={{ fontWeight: "600" }}>
                Php {totalAmount}
              </Typography>
            </FlexBetween>
          </div>
          <Divider sx={{ marginTop: "1em" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5em",
              margin: "1em",
            }}
          >
            <Button
              variant="contained"
              size={status === "Unpaid" ? "small" : "large"}
            >
              Refund
            </Button>
            {status === "Unpaid" && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => {
                    setSelectedPaymentType("");
                    handlePaymentClick();
                  }}
                  sx={{ whiteSpace: "nowrap", fontSize: "0.7em" }}
                >
                  E-payment
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => {
                    setSelectedPaymentType("Cash");
                    handlePaymentClick();
                  }}
                >
                  Pay by Cash
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {selectedPaymentType === "Cash" ? (
            <>
              <Typography>Pay by Cash</Typography>
            </>
          ) : (
            <>
              <Typography>E-Payment</Typography>
            </>
          )}
        </DialogTitle>
        <DialogContent sx={{ margin: "1em 0" }}>
          {selectedPaymentType === "Cash" ? (
            <>
              <TextField
                label="Amount Paid"
                value={amountPaid}
                type="number"
                onChange={handleAmountPaidChange}
                fullWidth
                color="secondary"
                margin="normal"
              />
            </>
          ) : (
            <>
              <InputLabel htmlFor="payment-type">
                Select Payment Type
              </InputLabel>
              <TextField
                select
                name="payment-type"
                value={selectedPaymentType}
                onChange={handlePaymentTypeChange}
                color="secondary"
                fullWidth
              >
                {["Gcash", "Paymaya", "Card", "Other Method"].map(
                  (type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  )
                )}
              </TextField>
              <TextField
                color="secondary"
                label="Transaction Code"
                value={transactionCode}
                onChange={handleTransactionCodeChange}
                fullWidth
                margin="normal"
              />
              <TextField
                color="secondary"
                label="Amount Paid"
                value={amountPaid}
                type="number"
                onChange={handleAmountPaidChange}
                fullWidth
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="error" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmPayment}
            color="success"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setAlertOpen(false)} severity="error">
          Insufficient balance!
        </Alert>
      </Snackbar>
    </>
  );
};

export default OrderReceipt;
