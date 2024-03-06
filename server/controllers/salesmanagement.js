import OrderSales from "../models/OrderSales.js";

export const getOrderSale = async (req, res) => {
  try {
    const orderSale = await OrderSales.find();
    if (!orderSale) {
      return res.status(404).json({ message: "Order Sale not found" });
    }
    res.status(200).json(orderSale);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
