import MenuInventory from "../models/MenuInventory.js";
import Menu from "../models/Menu.js";
import { getNextSequenceValue } from "../models/Counter.js";

//Add Inventory
export const AddInventory = async (req, res) => {
    try {
        const {
          dateTime,
          menuItem,
          category,
          price,
          salesTarget,
          description,
        } = req.body;
    
        const newInventoryItem = new MenuInventory({
          dateTime,
          menuId: await getNextSequenceValue("menuId"),
          menuItem,
          category,
          price,
          salesTarget,
          description,
        });
    
        const savedInventoryItem = await newInventoryItem.save();
    
        res.status(201).json(savedInventoryItem);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

// Add Menu 
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