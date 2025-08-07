import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import type { Request, Response, NextFunction } from "express";

const registerRequestValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: string[] = [];

  if (!req.body.email) errors.push("Please provide an email address.");
  if (!req.body.name) errors.push("Please provide an name.");
  if (!req.body.password) errors.push("Please provide a password.");
  if (!req.body.password !== req.body.confirmPassword) {
    errors.push("Passwords do not match.");
  }

  if (errors.length) return res.status(400).json({ errors });
  else next();
};

const registerHandler = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash: await bcrypt.hash(password, 10),
    },
  });

  res.status(201).json({ email: user.email, id: user.id });
};

export const registerRoute = [registerRequestValidation, registerHandler];
