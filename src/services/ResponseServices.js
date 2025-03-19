import { prisma } from "../config/database.js";

export const createResponse = async (data) => {
  return await prisma.adminResponse.create({ data });
};

export const getAllResponses = async () => {
  return await prisma.adminResponse.findMany();
};

export const getResponseById = async (id) => {
  return await prisma.adminResponse.findUnique({
    where: { responseId: Number(id) },
  });
};

export const updateResponse = async (id, data) => {
  return await prisma.adminResponse.update({
    where: { responseId: Number(id) },
    data,
  });
};

export const deleteResponse = async (id) => {
  return await prisma.adminResponse.delete({
    where: { responseId: Number(id) },
  });
};
