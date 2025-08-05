import fs from "fs";
import path from "path";

const basePath = path.join(__dirname, "../prisma/schema.base.prisma");
const modelsPath = path.join(__dirname, "../prisma/models");
const outputPath = path.join(__dirname, "../prisma/schema.prisma");

const base = fs.readFileSync(basePath, "utf8");

const modelFiles = fs
  .readdirSync(modelsPath)
  .filter((f) => f.endsWith(".prisma"));

const models = modelFiles
  .map((file) => fs.readFileSync(path.join(modelsPath, file), "utf8"))
  .join("\n\n");

fs.writeFileSync(outputPath, `${base}\n\n${models}`);
console.log("✅ schema.prisma generated.");
