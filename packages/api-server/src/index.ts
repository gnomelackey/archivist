import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { authRouter } from "./routers/auth/router";
import { onboardingRouter } from "./routers/onboarding/router";
import { staticRouter } from "./routers/static/router";

dotenv.config();

const port = Number(process.env.API_PORT ?? 4001);
const origin = process.env.API_ORIGIN ?? `http://localhost`;
const baseRoute = process.env.API_BASE_ROUTE ?? "/api";
const originUrl = `${origin}:${port}`;

const corsOriginUrl = process.env.CLIENT_ORIGIN ?? `http://localhost`;

const app = express();

app.use(cookieParser());
app.use(cors({ origin: corsOriginUrl, credentials: true }));
app.use(express.json());

app.use(`${baseRoute}/auth`, authRouter);
app.use(`${baseRoute}/onboarding`, onboardingRouter);
app.use(`${baseRoute}/static`, staticRouter);

app.listen(port, () => {
  console.log(`Server running at ${originUrl}`);
  console.log(`API running at ${originUrl}${baseRoute}`);
});
