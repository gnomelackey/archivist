import express from "express";

import { jwtValidation } from "../../middleware/jwtValidation";
import { uploadRoute } from "./routes/upload";

const staticRouter = express.Router();

staticRouter.post("/upload", jwtValidation, ...uploadRoute);

export { staticRouter };