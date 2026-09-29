import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { Op } from "sequelize";
import PropertyFiles from "../models/propertyFilesModel.js";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __basedir = __dirname;

const PRODUCTION_IMAGE_ADDRESS = process.env.PRODUCTION_IMAGE_URL;
const DEVELOPMENT_IMAGE_URL = process.env.DEVELOPMENT_IMAGE_URL;

const uploadDir = path.join(__basedir, "Images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|mp4|mkv/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new Error("Only jpeg, jpg, png, mp4, or mkv files are allowed"));
  },
}).array("files", 5);

export const uploadApartment = async (req, res) => {
  try {
    const propertyId = req.body.property_id || req.body.apartment_id;
    const uploadedBy = req.user?.id || req.body.uploaded_by;
    const files = req.files;

    if (!propertyId || !uploadedBy) {
      return res.status(400).json({ message: "property_id and uploaded_by are required" });
    }

    if (!files || files.length < 1) {
      return res.status(400).json({ message: "At least one file is required" });
    }

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? DEVELOPMENT_IMAGE_URL
        : PRODUCTION_IMAGE_ADDRESS;

    const fileData = {
      property_id: propertyId,
      uploaded_by: uploadedBy,
      file_size: files.reduce((total, file) => total + file.size, 0),
    };

    if (files[0]) fileData.first_image = baseUrl + files[0].filename;
    if (files[1]) fileData.second_image = baseUrl + files[1].filename;
    if (files[2]) fileData.third_image = baseUrl + files[2].filename;
    if (files[3]) fileData.fourth_image = baseUrl + files[3].filename;
    if (files[4]) fileData.video_path = baseUrl + files[4].filename;

    const newApartment = await PropertyFiles.create(fileData);

    return res.status(201).json({
      message: "Property files uploaded successfully",
      data: newApartment,
    });
  } catch (error) {
    console.error("Error saving property files:", error);
    return res.status(500).json({ message: "Unable to save property files." });
  }
};

export const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

export const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: apartments } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, apartments, totalPages, currentPage };
};
