import express from "express";
import { loginUser, handleRegister } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", handleRegister);

export default router;
