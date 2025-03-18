import express from "express";
import {
  addDestination,
  getDestinations,
  getDestination,
  editDestination,
  removeDestination,
} from "../controllers/DestinationController.js";

const router = express.Router();

router.post("/", addDestination);
router.get("/", getDestinations);
router.get("/:id", getDestination);
router.put("/:id", editDestination);
router.delete("/:id", removeDestination);

export default router;
