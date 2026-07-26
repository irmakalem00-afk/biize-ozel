import { cp, mkdir, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "www");
const files = ["index.html", "style.css", "app.js", "manifest.json", "sw.js"];

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of files) {
  const source = resolve(root, file);
  if (!(await exists(source))) throw new Error(`Eksik web dosyası: ${file}`);
  await cp(source, resolve(output, file));
}

await cp(resolve(root, "icons"), resolve(output, "icons"), { recursive: true });
console.log("Web dosyaları www klasörüne hazırlandı.");
