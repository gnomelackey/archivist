import { prisma } from "@repo/db";
import bcrypt from "bcrypt";
import type { Request, Response, NextFunction } from "express";

import { COOKIE_CONFIG, SESSION_COOKIE_NAME } from "../../../configs";
import { SessionManager } from "@repo/session";

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

  const sessionId = await SessionManager.createSession(user.id);

  res.cookie(SESSION_COOKIE_NAME, sessionId, COOKIE_CONFIG);

  res.json({ message: "login successful" });
};

export const loginRoute = [loginRequestValidation, loginHandler];
