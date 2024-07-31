import express, { Request, Response } from "express";
import { Product } from "../db/models/product.model";

const { ObjectId } = require("mongodb");
const router = express.Router();

router.get("/category/:id", async (req: Request, res: Response) => {
  const products = await Product.find({
    category: req.params.id,
  });
  res.json(products);
  res.end();
});

router.get("/:id", async (req: Request, res: Response) => {
  const product = await Product.findOne({
    _id: req.params.id,
  });
  res.json(product);
  res.end();
});

router.get("/", async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
  res.end();
});

router.get("/:id", async (req: Request, res: Response) => {
  const product = await Product.findOne({
    _id: ObjectId(req.params.id),
  });
  res.send(product);
});

router.post("/", async (req: Request, res: Response) => {
  const newProduct = req.body;
  const myData = new Product(newProduct, []);
  const response = await myData.save();
  res.send(response);
  res.end();
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const updatedProcedure = await Product.findOneAndUpdate(
    { _id: id }, // Filter by ID
    updateData, // Data to update
    { new: true } // Return the updated document
  );

  res.json(updatedProcedure);
  res.end();
});

module.exports = router;
