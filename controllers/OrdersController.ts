import express, { Request, Response } from "express";
import { Order } from "../db/models/order.model";

const router = express.Router();

router.post("/checkout", async (req: Request, res: Response) => {
  const newOrder = req.body;
  const myData = new Order(newOrder, []);
  const response = await myData.save();
  res.send(response);
});

router.get("/", async (req: Request, res: Response) => {
  const orders = await Order.find();
  res.json(orders);
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const updatedProcedure = await Order.findOneAndUpdate(
    { _id: id }, // Filter by ID
    updateData, // Data to update
    { new: true } // Return the updated document
  );

  res.send(updatedProcedure);
});


module.exports = router;
