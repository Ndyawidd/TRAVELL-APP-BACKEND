import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create Wishlist
export const createWishlist = async (data) => {
  return await prisma.wishlist.create({ data });
};

// Get All Wishlists
export const getAllWishlists = async () => {
  return await prisma.wishlist.findMany({
    include: { user: true, destination: true },
  });
};

// Get Wishlist By ID
export const getWishlistById = async (wishlistId) => {
  return await prisma.wishlist.findUnique({
    where: { wishlistId: Number(wishlistId) },
  });
};

// Delete Wishlist
export const deleteWishlist = async (wishlistId) => {
  return await prisma.wishlist.delete({
    where: { wishlistId: Number(wishlistId) },
  });
};
