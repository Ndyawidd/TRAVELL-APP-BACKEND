import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createWishlist = async (userId, ticketId) => {
  const exists = await prisma.wishlist.findFirst({
    where: { userId, ticketId },
  });

  if (exists) throw new Error("Already in wishlist");

  return await prisma.wishlist.create({
    data: { userId, ticketId },
  });
};

export const getAllWishlists = async () => {
  return await prisma.wishlist.findMany({
    include: { ticket: true, user: true },
  });
};

export const getWishlistByUserId = async (userId) => {
  return await prisma.wishlist.findMany({
    where: { userId },
    include: { ticket: true },
  });
};

export const deleteWishlistByUserAndTicket = async (userId, ticketId) => {
  return await prisma.wishlist.deleteMany({
    where: { userId, ticketId },
  });
};
