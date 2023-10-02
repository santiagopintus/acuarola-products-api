import express, { Request, Response } from "express";
import productsRouter from "./products";
import homeController from "../controllers";
const router = express.Router();

// Define your routes here

router.get("/", homeController);

router.use("/products", productsRouter);

// Add more routes as needed

export default router;
