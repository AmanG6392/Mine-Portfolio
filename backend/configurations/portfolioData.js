import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portfolioData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../data/portfolioData.json"),
    "utf-8"
  )
);

export default portfolioData;
