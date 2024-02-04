import MenuInventory from "../models/MenuInventory.js";
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