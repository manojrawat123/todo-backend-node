import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/web";
import connectDb from "./db/connect";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(cors());

// Enable CORS for all origins

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDb();

app.use("", router);

app.listen(3000, () => {
  console.log("Your server is running at http://localhost:3000");
});
