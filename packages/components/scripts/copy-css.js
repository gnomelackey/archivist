import fs from "node:fs";
import path from "node:path";

const srcDir = path.resolve("src");
const distDir = path.resolve("dist");

function copyCss(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyCss(srcPath, destPath);
    } else if (file.endsWith(".css")) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyCss(srcDir, distDir);
console.log("CSS files copied");
