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

app.post("/admin/procedures", async (req: Request, res: Response) => {
  const newProcedure = req.body;
  const myData = new schemas.Procedure(newProcedure, []);
  const response = await myData.save();
  res.send(response);
  res.end();
});