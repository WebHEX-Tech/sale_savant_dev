import {
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FlexBetween, OrderReceipt, TableOrder } from "components";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SaleSavantLogo } from "assets";
import CircleIcon from "@mui/icons-material/Circle";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CheckoutList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [receipt, setReceipt] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/cashier/get-receipt"
        );
        if (response.ok) {
          const data = await response.json();
          setReceipt(data);
        } else {
          console.error("Failed to fetch receipt data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchReceiptData();
  }, []);

  const handleButtonClick = (link) => {
    navigate(link);
  };

  const toggleReceiptDrawer = (open) => {
    setIsReceiptOpen(open);
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    swipeToSlide: true,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1380,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        width="100%"
      >
        {isDesktop ? (
          <>
            {selectedOrder ? (
              <OrderReceipt
                tableNo={selectedOrder.tableNo}
                orderNo={selectedOrder.orderNo}
                orderType={selectedOrder.orderType}
                totalAmount={selectedOrder.totalAmount}
                items={selectedOrder.items}
              />
            ) : (
              <Box
                sx={{
                  display: { sm: "none", md: "block" },
                  position: "absolute",
                  top: "30%",
                  left: "3%",
                  textAlign: "center",
                }}
              >
                <img
                  style={{ width: "18vw" }}
                  src={SaleSavantLogo}
                  alt="Sale Savant Logo"
                />
                <h1 style={{ margin: "0" }}> SaleSavant</h1>
              </Box>
            )}
          </>
        ) : (
          <>
            {/* Show Dialog Box OrderReceipt */}
            <Drawer
              container={
                window !== undefined ? () => window.document.body : undefined
              }
              anchor="left"
              open={isReceiptOpen}
              onClose={() => toggleReceiptDrawer(false)}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: 5, right: 5, zIndex: 1 }}
                onClick={() => toggleReceiptDrawer(false)}
              >
                <ChevronLeftIcon />
              </IconButton>
                {selectedOrder && (
                  <OrderReceipt
                    tableNo={selectedOrder.tableNo}
                    orderNo={selectedOrder.orderNo}
                    orderType={selectedOrder.orderType}
                    totalAmount={selectedOrder.totalAmount}
                    items={selectedOrder.items}
                  />
                )}
              </Drawer>
          </>
        )}

        <Box
          flex="1"
          margin="3em"
          width={{ sm: "91vw", md: "60vw" }}
          marginLeft={{ xs: "3em", md: "25vw" }}
        >
          <FlexBetween
            sx={{
              flexDirection: { xs: "column", sm: "column", md: "row" },
              gap: "2em",
              marginBottom: "2em",
            }}
          >
            <div style={{ display: "flex", gap: "1em" }}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick("/take-order")}
              >
                New Order
              </Button>
              <Badge
                color="secondary"
                badgeContent={receipt.length}
                invisible={receipt.length === 0}
              >
                <Button
                  variant="contained"
                  sx={{ background: theme.palette.primary[500] }}
                >
                  Checkout
                </Button>
              </Badge>
              <Button variant="contained">Refunds</Button>
            </div>

            <Box sx={{ display: "flex", gap: "2em" }}>
              <Box
                sx={{
                  border: "black 1px solid",
                  borderRadius: "5px",
                  display: "flex",
                  gap: "2em",
                  padding: " 0.5em 1em",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.2em",
                  }}
                >
                  <CircleIcon sx={{ color: "#8AF4BA", fontSize: "2.5em" }} />
                  <Typography variant="h4"> Paid</Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.2em",
                  }}
                >
                  <CircleIcon sx={{ color: "#F4CFCF", fontSize: "2.5em" }} />
                  <Typography variant="h4"> Unpaid</Typography>
                </div>
              </Box>
            </Box>
          </FlexBetween>

          <Box display="flex" justifyContent="center">
            <Box
              height="70vh"
              sx={{
                background: `rgba(90, 90, 90, 0.2) url(${SaleSavantLogo})`,
                backgroundSize: "300px auto",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "5px",
                padding: { xs: "1em", sm: "1em", md: "3em" },
                width: { xs: "85vw", md: "75vw" },
              }}
            >
              {/* Slider */}
              <FlexBetween>
                <Button
                  variant="text"
                  sx={{ color: theme.palette.primary[300] }}
                  onClick={() => sliderRef.current.slickPrev()}
                >
                  <NavigateBeforeIcon /> Previous
                </Button>

                <Button
                  variant="text"
                  sx={{ color: theme.palette.primary[300] }}
                  onClick={() => sliderRef.current.slickNext()}
                >
                  Next <NavigateNextIcon />
                </Button>
              </FlexBetween>

              <Slider ref={sliderRef} {...settings}>
                {receipt.map((item, index) => (
                  <TableOrder
                    key={index}
                    tableNo={item.tableNo}
                    orderNo={item.orderNo}
                    orderType={item.orderType}
                    totalAmount={item.totalAmount}
                    status={item.status}
                    onClick={() => {
                      console.log("TableOrder clicked:", item);
                      setSelectedOrder(item);
                      if (!isDesktop) {
                        toggleReceiptDrawer(true);
                      }
                    }}
                  />
                ))}
              </Slider>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CheckoutList;
