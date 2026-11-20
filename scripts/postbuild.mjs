/* Copy the Next.js static export (out/) into dist/ so the existing Vercel
   project settings (outputDirectory: dist) keep working unchanged. */
import { rmSync, cpSync, existsSync } from "fs";
if (!existsSync("out")) { console.error("out/ missing — did next build run?"); process.exit(1); }
rmSync("dist", { recursive: true, force: true });
cpSync("out", "dist", { recursive: true });
console.log("dist/ synced from out/");
