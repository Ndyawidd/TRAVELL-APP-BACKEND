import express from "express";
import {
  createNewTicket,
  getAllTicketsList,
  getSingleTicket,
  editTicket,
  removeTicket,
  updateTicketCapacityController,
} from "../controllers/TicketController.js";
// import upload from "../middleware/upload.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/", upload.single("image"), createNewTicket);
router.put("/:id", upload.single("image"), editTicket);

// router.post("/", createNewTicket);
router.get("/", getAllTicketsList);
router.get("/:id", getSingleTicket);
router.put("/:id", editTicket);
router.delete("/:id", removeTicket);
router.patch("/:id/capacity", updateTicketCapacityController);

export default router;
