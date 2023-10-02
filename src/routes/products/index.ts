import express, { Request, Response } from "express";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  addProduct,
} from "../../controllers/products";
const router = express.Router();

// Define your routes here

/* ALL */
router.get("/", (req: Request, res: Response) => getProducts(req, res, null));
/* ONE */
router.get("/:id", (req: Request, res: Response) =>
  getProducts(req, res, req.params.id)
);
/* ADD */
router.post("/", (req: Request, res: Response) => updateProduct(req, res));
/* UPDATE */
router.put("/:id", (req: Request, res: Response) => updateProduct(req, res));
/* DELETE */
router.get("/delete", (req: Request, res: Response) => deleteProduct(req, res));

// Add more routes as needed

export default router;
