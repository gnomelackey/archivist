import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const EXPIRATION_DEFAULT = "7d";
const LOGIN_ERROR = `There was an issue logging in. Please check your email or password, and try again.`;

const loginRequestValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: string[] = [];

  if (!req.body.email || !req.body.password) {
    errors.push("Please provide all required fields.");
  }

  if (errors.length) return res.status(400).json({ errors });
  else next();
};

const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
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
};

export const loginRoute = [loginRequestValidation, loginHandler];
