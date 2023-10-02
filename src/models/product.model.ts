import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  favoriteColor: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
