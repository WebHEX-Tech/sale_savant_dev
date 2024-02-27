import {
  Card,
  Box,
  Button,
  CardContent,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FlexBetween } from "components";
import React from "react";

const OrderReceipt = ({ tableNo, orderNo, orderType, items, totalAmount }) => {
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <Box
        position={isDesktop ? "fixed" : "relative"}
        margin={isDesktop ? "1em" : "4em 1em"}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "80vw", md: "21vw" },
          height: "90vh",
          zIndex: 2,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" ,
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
                padding:"1em 0.5em"
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
                      <Typography variant="body1">{`Php ${dish.price}`}</Typography>
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
                      whiteSpace:"nowrap"
                    }}
                  >
                    <Typography>
                      Quantity: {" "} {dish.quantity}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        fontWeight: "600",
                        color: theme.palette.secondary[400],
                      }}
                    >{`Php ${dish.totalPrice}`}</Typography>
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
              <Typography sx={{ fontWeight: "200" }}>Discount</Typography>
              <Typography sx={{ fontWeight: "200" }}>{/*  */}</Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography sx={{ fontWeight: "600" }}>Subtotal</Typography>
              <Typography sx={{ fontWeight: "600" }}>Php {totalAmount}</Typography>
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
            <Button variant="contained" size="small">
              Discount
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ whiteSpace: "nowrap", fontSize: "0.7em" }}
            >
              E-payment
            </Button>
            <Button variant="contained" color="success" size="small">
              Pay by Cash
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OrderReceipt;
