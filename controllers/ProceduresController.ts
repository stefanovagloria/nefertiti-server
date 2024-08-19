import express, { Request, Response } from "express";
import { Procedure } from "../db/models/procedure.model";

const { ObjectId } = require("mongodb");
const router = express.Router();

router.get("/byId/:id", async (req: Request, res: Response) => {
  console.log('here');
  const procedures = await Procedure.findById({
    _id: req.params.id,
  });
  res.json(procedures);
  res.end();
});



router.get("/:id", async (req: Request, res: Response) => {
  console.log('here');
  const procedures = await Procedure.find({
    category: req.params.id,
  });
  res.json(procedures);
  res.end();
});

router.get("/", async (req: Request, res: Response) => {
  console.log('here');
  const procedures = await Procedure.find();
  res.json(procedures);
  res.end();
});



router.get("/procedures/:id", async (req: Request, res: Response) => {
  console.log('here');
  const procedures = await Procedure.find({
    category: req.params.id,
  });
  res.json(procedures);
});

router.put("/procedures/:id", async (req: Request, res: Response) => {
  console.log('here');
  const id = req.params.id;
  const updateData = req.body;

  const updatedProcedure = await Procedure.findOneAndUpdate(
    { _id: id }, // Filter by ID
    updateData, // Data to update
    { new: true } // Return the updated document
  );

  res.json(updatedProcedure);
  res.end();
});

router.post("/", async (req: Request, res: Response) => {
  console.log('POST from Procedures');
  const newProcedure = req.body;
  const myData = new Procedure(newProcedure, []);
  const response = await myData.save();
  res.send(response);
  res.end();
});


module.exports = router;
