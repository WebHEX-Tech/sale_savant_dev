import { Box, Button, Typography, useTheme } from "@mui/material";
import { FlexBetween, TableOrder } from "components";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CheckoutList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [receipt, setReceipt] = useState([]);

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

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      width="100%"
    >
      <Box flex="1" margin="3em" marginLeft={{ xs: "3em", md: "20vw" }}>
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
            <Button
              variant="contained"
              sx={{ background: theme.palette.primary[500] }}
            >
              Checkout
            </Button>
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
                <CircleIcon sx={{ color: "#1BD7EC", fontSize: "2.5em" }} />
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
                <CircleIcon sx={{ color: "#FF5A5A", fontSize: "2.5em" }} />
                <Typography variant="h4"> Unpaid</Typography>
              </div>
            </Box>
          </Box>
        </FlexBetween>

        <Box display="flex" justifyContent="center">
          <Box
            height="75vh"
            sx={{
              background: theme.palette.grey[400],
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
                />
              ))}
            </Slider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutList;
