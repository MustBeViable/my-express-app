import sharp from "sharp";
import "dotenv/config";

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    console.log("no file");
    next();
    return;
  }
  const thumbPath = req.file.path + "_thumb";
  await sharp(req.file.path)
    .resize(160, 160, { fit: "cover" })
    .png()
    .toFile(thumbPath);
  next();
};


export { createThumbnail };