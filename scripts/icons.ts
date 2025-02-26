import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

(async () => {
  const sizes = [16, 32, 48, 64, 96, 128, 256];
  const icon = await fs.readFile(
    path.resolve(__dirname, "..", "src", "assets", "icon.svg"),
  );

  await Promise.all(
    sizes.map((size) =>
      sharp(icon, { density: 300 })
        .resize(size, size)
        .toFile(
          path.resolve(
            __dirname,
            "..",
            "src",
            "assets",
            "icons",
            `${size}.png`,
          ),
        ),
    ),
  );
})();
