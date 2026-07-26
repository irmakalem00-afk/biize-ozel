import { existsSync, mkdirSync, copyFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const prepare = spawnSync(process.execPath, [resolve(root, "scripts/prepare-android.mjs")], {
  cwd: root,
  stdio: "inherit",
  shell: false
});
if (prepare.error) throw prepare.error;
if (prepare.status !== 0) process.exit(prepare.status ?? 1);

const android = resolve(root, "android");
const wrapper = process.platform === "win32" ? "gradlew.bat" : "./gradlew";
const build = spawnSync(wrapper, ["assembleDebug"], {
  cwd: android,
  stdio: "inherit",
  shell: process.platform === "win32"
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

const sourceApk = resolve(android, "app/build/outputs/apk/debug/app-debug.apk");
if (!existsSync(sourceApk)) throw new Error("APK oluşturuldu ancak çıktı dosyası bulunamadı.");
const outputDir = resolve(root, "APK-CIKTISI");
mkdirSync(outputDir, { recursive: true });
const targetApk = resolve(outputDir, "Bize-Ozel.apk");
copyFileSync(sourceApk, targetApk);
console.log(`APK hazır: ${targetApk}`);
