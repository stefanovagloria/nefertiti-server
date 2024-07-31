import express from "express";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";

import firebaseConfig from "../backend/config/firebase.config";

initializeApp(firebaseConfig);

const cors = require("cors");
const mongoose = require("mongoose");

const adminRoutes = require("./controllers/AdminController");
const categoryRoutes = require("./controllers/CategoriesController");
const productRoutes = require("./controllers/ProductsController");
const procedureRoutes = require("./controllers/ProceduresController");
const orderRoutes = require("./controllers/OrdersController");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log(error));

const port = process.env.PORT || 4000;

app.use("/admin", adminRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/procedures", procedureRoutes);
app.use("/orders", orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
