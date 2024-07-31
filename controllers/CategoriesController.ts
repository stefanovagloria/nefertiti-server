import express, { Request, Response } from "express";
import { Category } from "../db/models/category.model";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const newCategory = req.body;
    const myData = new Category(newCategory, []);
    const response = await myData.save();
    res.send(response);
  });
  
  router.get("/", async (req: Request, res: Response) => {
    const response = await Category.find();
    res.json(response);
  });
  
  router.get("/:id", async (req: Request, res: Response) => {
    console.log('category')
    const response = await Category.findById(req.params.id);
    res.json(response);
  });

module.exports = router;
