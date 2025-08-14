import { prisma } from "@repo/db";
import type { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

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

const uploadRequestValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: string[] = [];

  if (!req.file) errors.push("File is required.");
  if (!req.body.name) errors.push("Name is required.");
  if (errors.length) return res.status(400).json({ errors });
  else next();
};

const uploadHandler = async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;
  const body = req.body as {
    name: string;
    description: string;
    campaignId: string;
  };

  const map = await prisma.map.create({
    data: {
      name: body.name,
      description: body.description,
      imageUrl: `/uploads/${file.filename}`,
      campaignId: body.campaignId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  res.status(201).json({ data: map });
};

export const uploadRoute = [
  uploadRequestValidation,
  upload.single("file"),
  uploadHandler,
];
