// services/ReviewServices.js
import { prisma } from "../config/database.js";

// Create Review
export const createReview = async (data) => {
  const { userId, orderId, ticketId, rating, comment, image } = data;
  return await prisma.review.create({
    data: {
      userId,
      orderId,
      ticketId,
      rating: Number(rating),
      comment,
      image,
    },
  });
};

// Get All Reviews
export const getAllReviews = async () => {
  try {
    return await prisma.review.findMany({
      include: {
        user: true,
        ticket: true,
        responses: true,
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// Get Review By ID
export const getReviewById = async (reviewId) => {
  return await prisma.review.findUnique({
    where: { reviewId: Number(reviewId) },
    include: { user: true, ticket: true, responses: true },
  });
};

// Get Reviews By Ticket ID
export const getReviewsByTicketId = async (ticketId) => {
  return await prisma.review.findMany({
    where: { ticketId: Number(ticketId) },
    include: { user: true },
  });
};

// Update Review
export const updateReview = async (reviewId, data) => {
  return await prisma.review.update({
    where: { reviewId: Number(reviewId) },
    data,
  });
};

// Delete Review
export const deleteReview = async (reviewId) => {
  return await prisma.review.delete({
    where: { reviewId: Number(reviewId) },
  });
};

// Create Response
export const createResponse = async (reviewId, responseText) => {
  try {
    if (!prisma) {
      throw new Error("Prisma client is undefined");
    }
    if (!prisma.response) {
      throw new Error("Prisma response model is undefined");
    }

    // Check if a response already exists for this review
    const existingResponse = await prisma.response.findFirst({
      where: { reviewId: Number(reviewId) },
    });

    if (existingResponse) {
      throw new Error(
        "A response already exists for this review. Only one response is allowed per review."
      );
    }

    return await prisma.response.create({
      data: {
        reviewId: Number(reviewId),
        response: responseText,
      },
    });
  } catch (error) {
    console.error("Error creating response:", error);
    throw error;
  }
};

// Delete Response
export const deleteResponse = async (responseId) => {
  return await prisma.response.delete({
    where: { responseId: Number(responseId) },
  });
};

// Update Response
export const updateResponse = async (responseId, responseText) => {
  return await prisma.response.update({
    where: { responseId: Number(responseId) },
    data: { response: responseText, updatedAt: new Date() },
  });
};
