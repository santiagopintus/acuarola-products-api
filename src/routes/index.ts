import express, { Request, Response } from "express";
import productsRouter from "./products";
import homeController from "../controllers";
const router = express.Router();

router.get("/", homeController);

router.use("/products", productsRouter);

export default router;
