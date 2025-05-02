import { prisma } from "../config/database.js";

export const getUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
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
