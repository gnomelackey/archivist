import express from "express";

import { sessionValidation } from "../../middleware/sessionValidation";
import { uploadRoute } from "./routes/upload";

const staticRouter = express.Router();

staticRouter.post("/upload", sessionValidation, ...uploadRoute);

export { staticRouter };