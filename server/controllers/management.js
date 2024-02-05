import MenuInventory from "../models/MenuInventory.js";
import Menu from "../models/Menu.js";
import { getNextSequenceValue } from "../models/Counter.js";

// Add Function
export const AddMenu = async (req, res) => {
  try {
      const {
        menuItem,
        category,
        price,
        salesTarget,
        picturePath,
        description,
      } = req.body;
  
      const newMenuItem = new Menu({
        menuItem,
        category,
        price,
        salesTarget,
        picturePath,
        description,
      });
  
      const savedMenuItem = await newMenuItem.save();
  
      res.status(201).json(savedMenuItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}
export const AddInventory = async (req, res) => {
  try {
      const {
        dateTime,
        menuItem,
        category,
        price,
        salesTarget,
        noSold,
        description,
      } = req.body;
  
      // Retrieve corresponding Menu data
      const menuData = await Menu.findOne({ menuItem });

      if (!menuData) {
        return res.status(404).json({ error: "Menu item not found" });
      }

      // Update Menu salesTarget
      menuData.salesTarget = salesTarget;
      await menuData.save();

      const newInventoryItem = new MenuInventory({
        dateTime,
        menuItem,
        menuId: await getNextSequenceValue("menuId"),
        category,
        price,
        salesTarget,
        noSold,
        description,
      });
  
      const savedInventoryItem = await newInventoryItem.save();
  
      res.status(201).json(savedInventoryItem);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
}



// Get Function
export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getMenuInventory = async (req, res) => {
  try {
    const menuInventory = await MenuInventory.find();
    res.status(200).json(menuInventory);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
