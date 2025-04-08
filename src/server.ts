// Set up your server
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import pageRouter from "./routes/page.routes";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/", pageRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send("Invalid route!");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
