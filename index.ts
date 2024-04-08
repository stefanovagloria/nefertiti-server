import express, { Express, Request, Response } from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const mongoose = require("mongoose");
import dotenv from "dotenv";
const schemas = require("./db/models/schemas");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log(error));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/procedures", async (req: Request, res: Response) => {
  const procedures = await schemas.Procedure.find();
  res.json(procedures);
  res.end();
});

app.get("/procedures/:id", async (req: Request, res: Response) => {
  console.log(req.params.id)
  const procedures = await schemas.Procedure.find({
    category: req.params.id,
  });
  res.json(procedures);
  res.end();
});

app.get("/products", async (req: Request, res: Response) => {
  const products = await schemas.Product.find();
  res.json(products);
  res.end();
});

// ADMIN QUERIES

app.post("/admin/categories", async (req: Request, res: Response) => {
  const newCategory = req.body;
  const myData = new schemas.Category(newCategory, []);
  const response = await myData.save();
  res.send(response);
  res.end();
});

app.get("/admin/categories", async (req: Request, res: Response) => {
  const response = await schemas.Category.find();
  res.json(response);
  res.end();
});

app.get("/admin/categories/:id", async (req: Request, res: Response) => {
  const response = await schemas.Category.findById(req.params.id);
  res.json(response);
  res.end();
});

app.get("/admin/procedures/:id", async (req: Request, res: Response) => {
  const procedures = await schemas.Procedure.find({
    category: req.params.id,
  });
  res.json(procedures);
  res.end();
});

app.post("/admin/procedures", async (req: Request, res: Response) => {
  const newProcedure = req.body;
  const myData = new schemas.Procedure(newProcedure, []);
  const response = await myData.save();
  res.send(response);
  res.end();
});

app.get("/admin/products", async (req: Request, res: Response) => {
  const product = await schemas.Product.find();
  res.json(product);
  res.end();
});

app.get("/admin/products/:id", async (req: Request, res: Response) => {
  const products = await schemas.Product.find({
    category: req.params.id,
  });
  res.json(products);
  res.end();
});

app.post("/admin/products", async (req: Request, res: Response) => {
  const newProduct = req.body;
  const myData = new schemas.Product(newProduct, []);
  const response = await myData.save();
  res.send(response);
  res.end();
});
