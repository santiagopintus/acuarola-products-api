import Product from "../../models/product.model";
import { Request, Response, ErrorRequestHandler } from "express";
import db from "../../db";

console.log(db);

/* Response to /products route */
const getProducts = async (
  _: Request,
  res: Response,
  id: string | null | undefined = null
) => {
  try {
    let products;
    if (id) {
      products = await Product.findOne({ _id: id });
    } else {
      products = await Product.find();
    }
    if (products == null) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting products");
  }
};

const addProduct = async (req: Request, res: Response) => {
  /* Checks for a valid req.body before reading it */
  if (!req.body) {
    console.log(req.body);
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  // Check if all fields are present
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create a new product document
  const newProduct = new Product({
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday,
  });

  // Save the new product document to the database
  try {
    // Save the new product document to the database
    const savedProduct = await newProduct.save();
    // Return the new product's ID in the response body
    return res.status(201).json({ id: savedProduct._id });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/****** UPDATE *******/
const updateProduct = async (req: Request, res: Response) => {
  // Check if ID parameter is present
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  // Check if at least one field is present in request body
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName && !lastName && !email && !favoriteColor && !birthday) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Update product with new values
  const updatedProduct = {
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday,
  };

  try {
    const result = await Product.findOneAndUpdate({ _id: id }, updatedProduct, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    /* If success */
    return res.status(204).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error updating product");
  }
};

/* DELETE A PRODUCT */
const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if ID parameter is present
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  try {
    // Delete product by ID
    const result = await Product.findOneAndDelete({ _id: id });

    // Check if product was found and deleted
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return 200
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error deleting product");
  }
};

export { getProducts, updateProduct, deleteProduct, addProduct };
