import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { userId: parseInt(userId) },
  });
};

const updateUser = async (userId, userData) => {
  return await prisma.user.update({
    where: { userId: parseInt(userId) },
    data: userData,
  });
};

const deleteUser = async (userId) => {
  return await prisma.user.delete({
    where: { userId: parseInt(userId) },
  });
};

export { getAllUsers, getUserById, updateUser, deleteUser };
