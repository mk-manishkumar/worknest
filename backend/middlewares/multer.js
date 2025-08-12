import multer from "multer";

const storage = multer.memoryStorage();

export const multipleUpload = multer({ storage }).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

export const singleUpload = multer({ storage }).single("file");
