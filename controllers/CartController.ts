import express, { Request, Response } from "express";
import { CartProduct } from "../db/models/cartProduct.model";

const { ObjectId } = require("mongodb");
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const newProduct = req.body;
  const myData = new CartProduct(newProduct, []);
  const response = await myData.save();
  res.send(response);
  res.end();
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const updatedCartProduct = await CartProduct.findOneAndUpdate(
    { _id: id }, // Filter by ID
    updatedData, // Data to update
    { new: true } // Return the updated document
  );

  res.send(updatedCartProduct);
});

router.get("/", async (req: Request, res: Response) => {
  const cartProducts = await CartProduct.find();
  res.json(cartProducts);
  res.end();
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await CartProduct.findByIdAndDelete(id);

    if (result) {
      res.send("Product removed successfully");
    } else {
      res.status(404).send("Product not found"); // Handle not found
    }
  } catch (error) {
    res.status(500).send(error.message); // Handle server errors
  }
});

module.exports = router;
