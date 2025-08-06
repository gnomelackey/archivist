import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import express from "express";

import { authRouter } from "./router";

const requestValidation = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors: string[] = [];

  if (!req.body.email) errors.push("Please provide an email address.");
  if (!req.body.password) errors.push("Please provide a password.");
  if (!req.body.password !== req.body.confirmPassword) {
    errors.push("Passwords do not match.");
  }

  if (errors.length) return res.status(400).json({ errors });
  else next();
};

authRouter.post("/register", requestValidation, async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, 10),
    },
  });

  res.status(201).json({ email: user.email, id: user.id });
});
