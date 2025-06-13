import express from "express";
import {
  getUsers,
  getUser,
  editUser,
  removeUser,
} from "../controllers/UserController.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get("/", getUsers); // Read all
router.get("/:id", getUser); // Read by ID
router.put("/:id", upload.single("image"), editUser); // Update
router.delete("/:id", removeUser); // Delete

export default router;
