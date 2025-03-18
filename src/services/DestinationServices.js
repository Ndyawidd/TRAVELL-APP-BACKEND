import { prisma } from "../config/database.js";

export const createDestination = async (data) => {
  return await prisma.destination.create({ data });
};

export const getAllDestinations = async () => {
  return await prisma.destination.findMany();
};

export const getDestinationById = async (id) => {
  return await prisma.destination.findUnique({
    where: { destinationId: parseInt(id) },
  });
};

export const updateDestination = async (id, data) => {
  return await prisma.destination.update({
    where: { destinationId: parseInt(id) },
    data,
  });
};

export const deleteDestination = async (id) => {
  return await prisma.destination.delete({
    where: { destinationId: parseInt(id) },
  });
};
