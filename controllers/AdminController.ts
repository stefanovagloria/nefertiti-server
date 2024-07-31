import express, { Request, Response } from "express";
import { User } from "../db/models/user.model";

import multer from "multer";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";


const storage = getStorage();
const { createSecretToken } = require("../util/SecretToken");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user);
    res.send({ message: "User logged in successfully", success: true, token });
  } catch (error) {
    console.error(error);
  }
});

router.post("/register", async (req: Request, res: Response, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);

    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
});

router.post("/check-access", (req: Request, res: Response) => {
  try {
    console.log(req.body);
    res.send(jwt.verify(req.body.token, process.env.TOKEN_KEY));
  } catch (error) {
    res.send(error);
  }
});

router.post(
  "/upload",
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

module.exports = router;
