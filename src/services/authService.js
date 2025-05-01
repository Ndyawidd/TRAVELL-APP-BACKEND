import { prisma } from "../config/database.js";

export const getUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

export const registerUser = async (data) => {
  return await prisma.user.create({ data });
};
