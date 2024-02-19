import Receipt from "../models/Receipt.js";
import Menu from "../models/Menu.js";
import Table from "../models/Table.js";
import MenuInventory from "../models/MenuInventory.js";

// Add
export const createReceipt = async (req, res) => {
  try {
    const { items, orderType, tableNo, orderNo, totalAmount } = req.body;
    let salesTargetDeducted = false;

    // Iterate through items to deduct salesTarget for each menu item
    for (const item of items) {
      const menu = await Menu.findById(item.menuItemId);
      if (!menu) {
        return res
          .status(404)
          .json({ message: `Menu item ${item.menuItemId} not found` });
      }
      if (item.quantity > menu.salesTarget) {
        return res
          .status(400)
          .json({
            message: `Not enough sales target available for menu item ${menu.menuItem}`,
          });
      }
      menu.salesTarget -= item.quantity;
      await menu.save();
      salesTargetDeducted = true;

      // Deduct the quantity of the dish from the existing inventory
      const existingInventory = await MenuInventory.findOne({
        menuItem: menu.menuItem,
      });
      if (existingInventory) {
        existingInventory.noSold += item.quantity;
        await existingInventory.save();
      }
    }

    if (!salesTargetDeducted) {
      return res.status(400).json({ message: "No sales target deducted" });
    }

    const newReceipt = new Receipt({
      items,
      orderType,
      tableNo,
      orderNo,
      totalAmount,
    });
    const savedReceipt = await newReceipt.save();
    res.status(201).json(savedReceipt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const AddTable = async (req, res) => {
  try {
    const { tableNo, pax, status } = req.body;

    const newTable = new Table({
      tableNo,
      pax,
      status,
    });

    const savedTable = await newTable.save();

    res.status(201).json(savedTable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get
export const getOrderReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.find();
    res.status(200).json(receipt);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getTable = async (req, res) => {
  try {
    const table = await Table.find();
    res.status(200).json(table);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update
export const updateTableStatus = async (req, res) => {
  try {
    const updatedTables = req.body;

    for (const updatedTable of updatedTables) {
      const { tableNo, status } = updatedTable;

      await Table.findOneAndUpdate({ tableNo }, { status });
    }

    res.status(200).json({ message: "Table statuses updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
