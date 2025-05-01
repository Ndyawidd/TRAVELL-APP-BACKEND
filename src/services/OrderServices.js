import { prisma } from "../config/database.js";

// Create Order
export const createOrder = async (orderData) => {
  return await prisma.order.create({
    data: orderData,
  });
};

// Get All Orders
export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: { user: true, ticket: true },
    orderBy: { orderId: "desc" },
  });
};

// Get Order by ID
export const getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: { orderId: id },
    include: { user: true, ticket: true },
  });
};

// Update Order
export const updateOrder = async (id, updateData) => {
  return await prisma.order.update({
    where: { orderId: id },
    data: updateData,
  });
};

// Delete Order
export const deleteOrder = async (id) => {
  return await prisma.order.delete({
    where: { orderId: id },
  });
};

