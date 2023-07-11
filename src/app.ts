import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/web";
import connectDb from "./db/connect";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDb();

app.use("", router);

app.listen(3000, () => {
  console.log("Your server is running at http://localhost:3000");
});
