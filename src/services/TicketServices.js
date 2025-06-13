import { prisma } from "../config/database.js";

export const createTicket = async (data, image) => {
  return await prisma.ticket.create({
    data: {
      ...data,
      image,
    },
  });
};

export const getAllTickets = async () => {
  return await prisma.ticket.findMany();
};

export const getTicketById = async (ticketId) => {
  return await prisma.ticket.findUnique({
    where: { ticketId: Number(ticketId) },
  });
};

export const updateTicket = async (ticketId, data) => {
  return await prisma.ticket.update({
    where: { ticketId: Number(ticketId) },
    data,
  });
};

export const deleteTicket = async (ticketId) => {
  return await prisma.ticket.delete({ where: { ticketId: Number(ticketId) } });
};
