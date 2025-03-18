import express from "express";
import { createNewTicket, getAllTicketsList, getSingleTicket, editTicket, removeTicket } from "../controllers/TicketController.js";

const router = express.Router();

router.post("/", createNewTicket);
router.get("/", getAllTicketsList);
router.get("/:id", getSingleTicket);
router.put("/:id", editTicket);
router.delete("/:id", removeTicket);

export default router;
