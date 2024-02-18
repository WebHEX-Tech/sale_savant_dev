import Receipt from "../models/Receipt.js";
import Menu from "../models/Menu.js";

export const createReceipt = async (req, res) => {
    try {
      const { items, orderType, tableNo, orderNo, totalAmount } = req.body;
      let salesTargetDeducted = false;
  
      // Iterate through items to deduct salesTarget for each menu item
      for (const item of items) {
        const menu = await Menu.findById(item.menuItemId);
        if (!menu) {
          return res.status(404).json({ message: `Menu item ${item.menuItemId} not found` });
        }
        if (item.quantity > menu.salesTarget) {
          return res.status(400).json({ message: `Not enough sales target available for menu item ${menu.menuItem}` });
        }
        menu.salesTarget -= item.quantity;
        await menu.save();
        salesTargetDeducted = true;
      }
  
      if (!salesTargetDeducted) {
        return res.status(400).json({ message: "No sales target deducted" });
      }
  
      const newReceipt = new Receipt({ items, orderType, tableNo, orderNo, totalAmount });
      const savedReceipt = await newReceipt.save();
      res.status(201).json(savedReceipt);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };