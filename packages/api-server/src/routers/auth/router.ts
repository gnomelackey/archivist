import express from "express";

import { loginRoute } from "./routes/login";
import { logoutRoute } from "./routes/logout";
import { sessionRoute } from "./routes/session";

const authRouter = express.Router();

authRouter.post("/login", ...loginRoute);
authRouter.post("/logout", ...logoutRoute);
authRouter.get("/session", ...sessionRoute);

export { authRouter };