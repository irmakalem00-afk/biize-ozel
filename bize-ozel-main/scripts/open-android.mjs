import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

for (const [command, args] of [
  [process.execPath, [resolve(root, "scripts/prepare-android.mjs")]],
  [npx, ["cap", "open", "android"]]
]) {
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit", shell: false });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
