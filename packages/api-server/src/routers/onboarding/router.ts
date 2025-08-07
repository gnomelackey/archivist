import express from "express";

import { loginRoute } from "./routes/login";
import { registerRoute } from "./routes/register";

const onboardingRouter = express.Router();

onboardingRouter.post("/login", ...loginRoute);
onboardingRouter.post("/register", ...registerRoute);

export { onboardingRouter };