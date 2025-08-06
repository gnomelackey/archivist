import express from "express";
import https from 'https';
import cors from "cors";
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';

import { onboardingRouter } from "./routes/onboarding/router";
import { staticRouter } from "./routes/upload/router";

dotenv.config();

const port = process.env.PORT || 4001;
const baseRoute = process.env.BASE_ROUTE || "/api";
const certPath = path.join(__dirname, '..', 'certs');
const key = fs.readFileSync(path.join(certPath, 'key.pem'));
const cert = fs.readFileSync(path.join(certPath, 'cert.pem'));

const app = express();

app.use(cors());
app.use(express.json());

app.use(`${baseRoute}/onboarding`, onboardingRouter);
app.use(`${baseRoute}/static`, staticRouter);

const server = https.createServer({ key, cert }, app);

server.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
