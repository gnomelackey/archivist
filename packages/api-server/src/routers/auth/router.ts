import express from "express";

import { loginRoute } from "./routes/login";
import { logoutRoute } from "./routes/logout";

const authRouter = express.Router();

authRouter.post("/login", ...loginRoute);
authRouter.post("/logout", ...logoutRoute);

export { authRouter };