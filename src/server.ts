import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
// Load environment variables from a .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

//Routes
app.use("/", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
