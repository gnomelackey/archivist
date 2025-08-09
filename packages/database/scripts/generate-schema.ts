import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "../prisma/definitions/main.prisma");
const inputModelsDir = path.join(__dirname, "../prisma/models");

const outputPath = path.join(__dirname, "../prisma/schema.prisma");

const base = fs.readFileSync(inputPath, "utf8");

const modelFiles = fs
  .readdirSync(inputModelsDir)
  .filter((f) => f.endsWith(".prisma"));

const models = modelFiles
  .map((file) => fs.readFileSync(path.join(inputModelsDir, file), "utf8"))
  .join("\n\n");

fs.writeFileSync(outputPath, `${base}\n\n${models}`);
console.log("✅ schema.prisma generated.");
