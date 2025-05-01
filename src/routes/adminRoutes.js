// src/routes/adminRoutes.js
import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin/data", authenticateToken, (req, res) => {
  if (req.user.role !== "ADMIN") return res.sendStatus(403);
  res.json({ message: "Welcome Admin!" });
});

export default router;
