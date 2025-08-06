import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRouter } from "./routes/auth";
import { uploadRouter } from "./routes/upload";

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/upload", uploadRouter);

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
