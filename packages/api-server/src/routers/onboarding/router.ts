import express from "express";

import { registerRoute } from "./routes/register";

const onboardingRouter = express.Router();

onboardingRouter.post("/register", ...registerRoute);

export { onboardingRouter };