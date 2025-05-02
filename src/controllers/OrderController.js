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

import dayjs from "dayjs";
import { prisma } from "../config/database.js";

// Get last order number of the day
export const getLastOrderNumberToday = async (prefix) => {
  const latest = await prisma.order.findFirst({
    where: {
      orderId: {
        startsWith: prefix,
      },
    },
    orderBy: { orderId: "desc" },
  });

  if (!latest) return 0;
  return parseInt(latest.orderId.slice(-3)); // Ambil 3 digit terakhir
};

// --- Generate custom ID like ORD250501001
const generateCustomOrderId = async () => {
  const today = dayjs().format("YYMMDD");
  const prefix = `ORD${today}`;
  const last = await getLastOrderNumberToday(prefix);
  const next = (last + 1).toString().padStart(3, "0");
  return `${prefix}${next}`;
};

// Create Order
const registerOrder = async (req, res) => {
  try {
    const validatedData = validateSchema(orderCreateSchema, req.body);

    // Ambil data tiket berdasarkan ticketId
    const ticket = await prisma.ticket.findUnique({
      where: { ticketId: validatedData.ticketId },
    });

    if (!ticket) {
      return res.status(404).json({ error: "Tiket tidak ditemukan" });
    }

    // Hitung total harga
    const totalPrice = ticket.price * validatedData.quantity;

    // Generate custom order ID
    const customOrderId = await generateCustomOrderId();

    const newOrder = await createOrder({
      ...validatedData,
      totalPrice,
      orderId: customOrderId,
    });

    res.status(201).json({
      message: "Order created successfully!",
      data: newOrder,
    });
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
    const order = await getOrderById(req.params.orderId);
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
    const updatedOrder = await updateOrder(req.params.orderId, validatedData);
    res.json({ message: "Order updated successfully", data: updatedOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Order
const removeOrder = async (req, res) => {
  try {
    await deleteOrder(req.params.orderId);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        ticket: true, // agar bisa ambil nama tiket, harga, dll
        user: true, // opsional, kalau mau data user juga
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders by user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  registerOrder,
  getOrders,
  getOrder,
  editOrder,
  removeOrder,
  getOrdersByUser,
};
