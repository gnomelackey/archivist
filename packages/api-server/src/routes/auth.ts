import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

export const authRouter = express.Router();

const EXPIRATION_DEFAULT = "7d";
const LOGIN_ERROR = `There was an issue logging in. Please check your email or password, and try again.`;

const requestValidation = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors: string[] = [];

  if (!req.body.email || !req.body.password) {
    errors.push("Please provide all required fields.");
  }

  if (errors.length) return res.status(400).json({ errors });
  else next();
};

authRouter.post("/login", requestValidation, async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        caseSensitive: false,
      },
    },
  });

  const invalidLogin =
    !user || !(await bcrypt.compare(password, user.passwordHash));

  if (invalidLogin) {
    return res.status(401).json({ error: LOGIN_ERROR });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: EXPIRATION_DEFAULT }
  );

  res.json({ token });
});
