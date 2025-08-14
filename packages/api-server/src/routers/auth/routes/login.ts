import { prisma } from "@repo/db";
import bcrypt from "bcrypt";
import type { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { SessionManager } from "../../../services";

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

  const invalidUser = !user;

  if (invalidUser) {
    console.log("Invalid user login attempt for email:", email);
    return res.status(401).json({ error: LOGIN_ERROR });
  }

  const invalidPassword = !(await bcrypt.compare(password, user.passwordHash));

  if (invalidPassword) {
    console.log("Invalid password login attempt for email:", email);
    return res.status(401).json({ error: LOGIN_ERROR });
  }

  const secret = process.env.JWT_SECRET ?? "your_jwt_secret";
  const expirationValue = process.env.JWT_EXPIRATION ?? "7d";
  const jwtExpiration = expirationValue as SignOptions["expiresIn"];

  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: jwtExpiration,
  });

  const sessionId = await SessionManager.createSession(user.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({ message: "login successful" });
};

export const loginRoute = [loginRequestValidation, loginHandler];
