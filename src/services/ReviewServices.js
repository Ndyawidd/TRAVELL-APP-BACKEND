import { prisma } from "../config/database.js";

// Create Review
export const createReview = async (data) => {
  return await prisma.review.create({ data });
};

// Get All Reviews
export const getAllReviews = async () => {
  return await prisma.review.findMany({
    include: { user: true, destination: true },
  });
};

// Get Review By ID
export const getReviewById = async (reviewId) => {
  return await prisma.review.findUnique({
    where: { reviewId: Number(reviewId) },
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
