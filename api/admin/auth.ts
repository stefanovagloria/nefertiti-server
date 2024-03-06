import exp from "constants";
import express, { Express, Request, Response } from "express";

const router = express.Router();

router.get('/login',(req: Request, res: Response) =>{
    res.send('OK')
})

module.exports = router;

