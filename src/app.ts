import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/web";
import connectDb from "./db/connect";

const app = express();

app.use(cors({
  
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

// Enable CORS for all origins
app.use((req: Request, res: Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDb();

app.use("", router);

app.listen(3000, () => {
  console.log("Your server is running at http://localhost:3000");
});
