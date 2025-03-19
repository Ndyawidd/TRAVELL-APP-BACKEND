import express from "express";
import {
  registerResponse,
  getResponses,
  getResponse,
  editResponse,
  removeResponse,
} from "../controllers/ResponseController.js";

const router = express.Router();

router.post("/", registerResponse);
router.get("/", getResponses);
router.get("/:id", getResponse);
router.put("/:id", editResponse);
router.delete("/:id", removeResponse);

export default router;
