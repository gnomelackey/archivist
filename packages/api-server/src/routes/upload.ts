import { prisma } from "@repo/db/client";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

import { jwtValidation } from "@api/middleware/jwtValidation";

export const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    const uploadPath = path.join(__dirname, "..", "..", "uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (_, file, cb) {
    const uniqueName = `${uuid()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const requestValidation = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors: string[] = [];

  if (!req.file) errors.push("File is required.");
  if (!req.body.name) errors.push("Name is required.");
  if (errors.length) return res.status(400).json({ errors });
  else next();
};

uploadRouter.post(
  "/",
  jwtValidation,
  requestValidation,
  upload.single("file"),
  async (req, res) => {
    const file = req.file as Express.Multer.File;
    const body = req.body as { name: string; description: string };

    const map = await prisma.map.create({
      data: {
        name: body.name,
        description: body.description,
        imageUrl: `/uploads/${file.filename}`,
      },
    });

    res.status(201).json({ data: map });
  }
);
