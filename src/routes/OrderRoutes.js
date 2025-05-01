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
// router.get("/user/:userId", getOrdersByUser);
router.get("/:orderId", getOrder);
router.put("/:orderId", editOrder);
router.delete("/:orderId", removeOrder);

export default router;
