import { prisma } from "../config/database.js";

export const getUserByUsername = async (username) => {
  try {
    return await prisma.user.findUnique({
      where: { username },
    });
  } catch (error) {
    console.error("🔥 Error in getUserByUsername:", error);
    throw error;
  }
};

export const registerUser = async ({
  name,
  email,
  username,
  password,
  role,
}) => {
  if (password === "123456") {
    throw new Error("❌ Password belum di-hash!");
  }
  return await prisma.user.create({
    data: { name, email, username, password, role },
  });
};
