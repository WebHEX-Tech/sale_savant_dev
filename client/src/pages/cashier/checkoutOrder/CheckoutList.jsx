import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { FlexBetween } from "components";
import React, { useRef } from "react";
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

  const handleButtonClick = (link) => {
    navigate(link);
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
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
              background: theme.palette.grey[100],
              borderRadius: "5px",
              padding: { xs:"1em", sm:"1em",md:"3em"},
              width: { xs: "85vw", md: "77vw" },
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
              {[...Array(6)].map((_, index) => (
                <div key={index}>
                  <Box
                    sx={{
                      border: "1px solid #ccc",
                      padding: "20px",
                      textAlign: "center",
                      height: "55vh",
                      margin: "1em",
                    }}
                  >
                    Container {index + 1}
                  </Box>
                </div>
              ))}
            </Slider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutList;
