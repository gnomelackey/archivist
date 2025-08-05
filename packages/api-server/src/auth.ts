import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

export const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        caseSensitive: false,
      },
    },
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.json({ token });
});
