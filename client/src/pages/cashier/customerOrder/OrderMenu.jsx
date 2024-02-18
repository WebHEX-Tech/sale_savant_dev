import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Add, Remove } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { OrderCard as ItemCard, FlexBetween, Receipt } from "components";
import React, { useEffect, useState } from "react";
import { useGetMenuQuery } from "state/api";
import { getOrderNo, getOrderType } from "../TakeOrder";
import { useNavigate } from "react-router-dom";

const tables = [
  { name: "Table 01", pax: 4, value: "01" },
  { name: "Table 02", pax: 4, value: "02" },
  { name: "Table 03", pax: 4, value: "03" },
  { name: "Table 04", pax: 4, value: "04" },
  { name: "Table 05", pax: 4, value: "05" },
  { name: "Table 06", pax: 4, value: "06" },
  { name: "Table 07", pax: 2, value: "07" },
  { name: "Table 08", pax: 2, value: "08" },
  { name: "Table 09", pax: 2, value: "09" },
  { name: "Table 10", pax: 2, value: "10" },
  { name: "Table 11", pax: 2, value: "11" },
  { name: "Table 12", pax: 2, value: "12" },
  { name: "Table 13", pax: 2, value: "13" },
  { name: "Table 14", pax: 2, value: "14" },
  { name: "Table 15", pax: 6, value: "15" },
  { name: "Table 16", pax: 6, value: "16" },
  { name: "Table 17", pax: 6, value: "17" },
  { name: "Table 18", pax: 8, value: "18" },
  { name: "Table 19", pax: 8, value: "19" },
  { name: "Table 20", pax: 6, value: "20" },
  { name: "Table 21", pax: 6, value: "21" },
  { name: "Table 22", pax: 6, value: "22" },
];

const OrderMenu = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [addedDishes, setAddedDishes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTables, setSelectedTables] = useState([]);
  const { window } = props;
  const OrderType = getOrderType();
  const OrderNo = getOrderNo();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/menumanagement/menu"
        );
        if (response.ok) {
          const data = await response.json();
          setMenuData(data);
        } else {
          console.error("Failed to fetch menu data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchMenuData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const { data } = useGetMenuQuery();

  useEffect(() => {
    if (data) {
      setMenuData(data);
    }
  }, [data]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCancelOrder = () => {
    navigate("/take-order")
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

  const handleConfirmTables = () => {
    console.log("Selected Tables:", selectedTables);
    handleCloseDialog();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

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

  const filteredMenuData =
    selectedCategory === "All"
      ? menuData.filter((menu) =>
          menu.menuItem.toLowerCase().includes(searchValue.toLowerCase())
        )
      : menuData.filter(
          (menu) =>
            menu.category === selectedCategory &&
            menu.menuItem.toLowerCase().includes(searchValue.toLowerCase())
        );

  const toggleReceiptDrawer = (open) => {
    setIsReceiptOpen(open);
  };

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

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

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        width="100%"
      >
        {isDesktop ? (
          <>
            <Typography
              sx={{
                position: "fixed",
                top: "2%",
                left: "2%",
                fontSize: "2em",
                fontWeight: "500",
                zIndex: -1,
              }}
            >
              Order Receipt
            </Typography>
            <Box
              position="fixed"
              margin="1em"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "95vw", md: "20vw" },
                height: "90vh",
                zIndex: 2,
                boxShadow: { xs: "none", md: "0px 4px 6px rgba(0, 0, 0, 0.2)" },
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
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
                    sx={{
                      borderRadius: "0",
                      background: "#fff",
                      color: "#000",
                    }}
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
                              width: "9vw",
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
                              onClick={() =>
                                handleQuantityChange(index, "decrement")
                              }
                            >
                              <Remove fontSize="0.8em" />
                            </IconButton>
                            <Typography variant="body1">
                              {dish.quantity}
                            </Typography>
                            <IconButton
                              sx={{
                                background: theme.palette.secondary[700],
                                fontSize: "0.8em",
                                padding: "5px",
                                "&:hover": {
                                  background: theme.palette.secondary[500],
                                },
                              }}
                              onClick={() =>
                                handleQuantityChange(index, "increment")
                              }
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
                  <Button variant="contained" onClick={handleOpenDialog}>
                    Select Table
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmitOrder}
                  >
                    Submit Order
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ textAlign: "center", pt: 3 }}>
              <Button
                variant="outlined"
                onClick={() => toggleReceiptDrawer(true)}
                color="success"
              >
                Show Order Receipt
              </Button>
            </Box>

            <Drawer
              container={
                window !== undefined ? () => window.document.body : undefined
              }
              anchor="left"
              open={isReceiptOpen}
              onClose={() => toggleReceiptDrawer(false)}
              onOpen={() => toggleReceiptDrawer(true)}
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
              <Receipt
                OrderType={OrderType}
                OrderNo={OrderNo}
                addedDishes={addedDishes}
                setAddedDishes={setAddedDishes}
                menuData={menuData}
              />
            </Drawer>
          </>
        )}

        <Box flex="1" margin="3em" marginLeft={{ xs: 0, md: "20vw" }}>
          <Box>
            <Toolbar
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                flexWrap: "wrap",
                flexDirection: { xs: "column", sm: "row", lg: "row" },
              }}
            >
              <FlexBetween>
                <Button
                  variant="contained"
                  sx={{
                    background: theme.palette.secondary[600],
                    fontSize: "1.2em",
                    color: theme.palette.primary[100],
                  }}
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </Button>
              </FlexBetween>

              <FlexBetween
                sx={{
                  gap: "1em",
                  marginTop: { xs: "2em", sm: "0", lg: "0" },
                  flexWrap: { xs: "wrap", sm: "wrap", lg: "nowrap" },
                  whiteSpace: "nowrap",
                }}
              >
                {/* Sorting Category Select */}
                <Box>
                  <FormControl>
                    <InputLabel
                      id="category-label"
                      sx={{ color: theme.palette.primary[200] }}
                    >
                      Category
                    </InputLabel>
                    <Select
                      label="Category"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      sx={{
                        width: "180px",
                        border: theme.palette.secondary[300],
                        color: theme.palette.primary[200],
                      }}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Main Dish">Main Dish</MenuItem>
                      <MenuItem value="Tausug Dish">Tausug Dish</MenuItem>
                      <MenuItem value="Dessert">Dessert</MenuItem>
                      <MenuItem value="Tausug Dessert">Tausug Dessert</MenuItem>
                      <MenuItem value="Drinks">Drinks</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Container sx={{ padding: "0 !important" }}>
                  <FlexBetween
                    backgroundColor={theme.palette.secondary[700]}
                    borderRadius="9px"
                    gap="3rem"
                    minWidth="300px"
                    width="100%"
                    p="0.5rem 1.5rem"
                  >
                    <InputBase
                      placeholder="Search Menu Item..."
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                    <Search />
                  </FlexBetween>
                </Container>
              </FlexBetween>
            </Toolbar>
          </Box>

          {isLoading || !menuData.length ? (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "1em",
                  margin: "1.5em",
                }}
              >
                {[...Array(16).keys()].map((index) => (
                  <Card
                    sx={{ width: 280, background: theme.palette.primary[400] }}
                  >
                    <Skeleton
                      sx={{ height: 180 }}
                      animation="wave"
                      variant="rectangular"
                    />
                    <CardContent>
                      <FlexBetween>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.2em",
                            width: "100%",
                          }}
                        >
                          <Skeleton
                            animation="wave"
                            variant="text"
                            height={30}
                            width="80%"
                          />
                          <Skeleton
                            animation="wave"
                            variant="text"
                            height={30}
                            width="50%"
                          />
                        </div>
                      </FlexBetween>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1em",
                margin: "1.5em",
              }}
            >
              {filteredMenuData.map((menu) => (
                <ItemCard
                  key={menu._id}
                  img={menu.picturePath}
                  menuName={menu.menuItem}
                  price={menu.price}
                  salesTarget={menu.salesTarget}
                  menuId={menu._id}
                  onAddDish={handleAddDish}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Select Tables (Maximum Tables: 2)</DialogTitle>
        <DialogContent>
          {tables.map((table, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedTables.includes(table.value)}
                  onChange={() => handleCheckboxChange(table.value)}
                  color="secondary"
                />
              }
              label={`${table.name} - Pax: ${table.pax}`}
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
            onClick={handleConfirmTables}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { tables };
export default OrderMenu;
