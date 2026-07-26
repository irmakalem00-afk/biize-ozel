import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: false
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(process.execPath, [resolve(root, "scripts/prepare-web.mjs")]);

if (!existsSync(resolve(root, "android"))) {
  console.log("Android projesi ilk kez oluşturuluyor...");
  run(npx, ["cap", "add", "android"]);
}

run(npx, ["cap", "sync", "android"]);
run(npx, [
  "@capacitor/assets",
  "generate",
  "--android",
  "--iconBackgroundColor",
  "#FFE4EC",
  "--iconBackgroundColorDark",
  "#FFE4EC",
  "--splashBackgroundColor",
  "#FFE4EC",
  "--splashBackgroundColorDark",
  "#FFE4EC"
]);

console.log("Android projesi APK üretimine hazır.");
