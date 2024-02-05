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
      menuData.price = price;
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

// Delete Function
export const deleteMenuInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const existingItem = await MenuInventory.findById(id);
    if (!existingItem) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    await MenuInventory.findByIdAndDelete(id);

    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const existingItem = await Menu.findById(id);
    if (!existingItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    await Menu.findByIdAndDelete(id);

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
