import sharp from "sharp";

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    console.log("no file");
    next();
    return;
  }
  // TODO: use file path to create 160x160 png thumbnail with sharp
  const thumbPath = req.file.path + "_thumb";
  await sharp(req.file.path)
    .resize(160, 160, { fit: "cover" })
    .png()
    .toFile(thumbPath);
  next();
};

export { createThumbnail };
