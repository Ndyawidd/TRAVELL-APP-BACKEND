import express from "express";
import {
  registerOrder,
  getOrders,
  getOrder,
  editOrder,
  removeOrder,
} from "../controllers/OrderController.js";

const router = express.Router();

router.post("/", registerOrder);
router.get("/", getOrders);
router.get("/:id", getOrder);
router.put("/:id", editOrder);
router.delete("/:id", removeOrder);

export default router;
