import { validateSchema } from "../utils/validator/validator.js";
import {
  orderCreateSchema,
  orderUpdateSchema,
} from "../validation/OrderValidation.js";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../services/OrderServices.js";

// Create Order
const registerOrder = async (req, res) => {
  try {
    const validatedData = validateSchema(orderCreateSchema, req.body);
    const newOrder = await createOrder(validatedData);
    res
      .status(201)
      .json({ message: "Order created successfully!", data: newOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Orders
const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get Order by ID
const getOrder = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Update Order
const editOrder = async (req, res) => {
  try {
    const validatedData = validateSchema(orderUpdateSchema, req.body);
    const updatedOrder = await updateOrder(req.params.id, validatedData);
    res.json({ message: "Order updated successfully", data: updatedOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Order
const removeOrder = async (req, res) => {
  try {
    await deleteOrder(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};

export { registerOrder, getOrders, getOrder, editOrder, removeOrder };
