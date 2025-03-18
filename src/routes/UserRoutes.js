import express from "express";
import {
  registerUser,
  getUsers,
  getUser,
  editUser,
  removeUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", registerUser); // Create
router.get("/", getUsers); // Read all
router.get("/:id", getUser); // Read by ID
router.put("/:id", editUser); // Update
router.delete("/:id", removeUser); // Delete

export default router;
