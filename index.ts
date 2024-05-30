import express, { Express, Request, Response } from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
import dotenv from "dotenv";
const schemas = require("./db/models/schemas");
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import multer from "multer";
import firebaseConfig from "../backend/config/firebase.config";

const { ObjectId } = require("mongodb"); // Import ObjectId from mongodb library

console.log(firebaseConfig);

initializeApp(firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

const path = require("path");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log(error));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/admin/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new schemas.User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.get("/procedures", async (req: Request, res: Response) => {
  const procedures = await schemas.Procedure.find();
  res.json(procedures);
  res.end();
});

app.get("/procedures/:id", async (req: Request, res: Response) => {
  console.log(req.params.id);
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

app.get("/products/:id", async (req: Request, res: Response) => {
  const product = await schemas.Product.findOne({
    _id: req.params.id,
  });
  res.json(product);
  res.end();
});

app.post("/checkout", async (req: Request, res: Response) => {
  const newOrder = req.body;
  const myData = new schemas.Order(newOrder, []);
  const response = await myData.save();
  res.send(response);
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

app.put("/admin/procedures/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const updatedProcedure = await schemas.Procedure.findOneAndUpdate(
    { _id: id }, // Filter by ID
    updateData, // Data to update
    { new: true } // Return the updated document
  );

  res.json(updatedProcedure);
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

app.put("/admin/products/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const updatedProcedure = await schemas.Product.findOneAndUpdate(
    { _id: id }, // Filter by ID
    updateData, // Data to update
    { new: true } // Return the updated document
  );

  res.json(updatedProcedure);
  res.end();
});

app.post(
  "/admin/upload",
  upload.array("images"),
  async (req: Request, res: Response) => {
    try {
      console.log("Uploading...");
      const dateTime = Date.now();

      const files = req.files as Express.Multer.File[];

      let fileData = [];

      for (const file of files) {
        const filePath = `${dateTime}_${file.originalname}`;
        const storageRef = ref(storage, `files/${filePath}`);

        const metaData = {
          contentType: file.mimetype,
        };
        console.log(storage);

        const snapshot = await uploadBytesResumable(
          storageRef,
          file.buffer,
          metaData
        );
        const downloadUrl = await getDownloadURL(snapshot.ref);

        console.log("File successfully uploaded:", file.originalname);
        fileData.push({ downloadUrl, filePath });
      }

      res.send({
        message: "Files uploaded to firebase",
        fileCount: files.length,
        fileData: fileData,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).send({
        error: "An error occurred while uploading files",
      });
    }
  }
);

app.get("/admin/orders", async (req: Request, res: Response) => {
  const orders = await schemas.Order.find();
  res.json(orders);
  res.end();
});

app.put("/admin/orders/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const updatedProcedure = await schemas.Order.findOneAndUpdate(
    { _id: id }, // Filter by ID
    updateData, // Data to update
    { new: true } // Return the updated document
  );

  res.json(updatedProcedure);
  res.end();
});

app.get("/admin/products/:id", async (req: Request, res: Response) => {
  const product = await schemas.Product.findOne({
    _id: ObjectId(req.params.id),
  });
  res.json(product);
  res.end();
});
