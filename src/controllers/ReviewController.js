import {
  reviewCreateSchema,
  reviewUpdateSchema,
} from "../validation/ReviewValidation.js";
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../services/ReviewServices.js";

// Create Review
export const addReview = async (req, res) => {
  try {
    const { error } = reviewCreateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { userId, destinationId, rating, comment } = req.body;
    const newReview = await createReview({
      userId,
      destinationId,
      rating,
      comment,
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review" });
  }
};

// Get All Reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// Get Review By ID
export const findReviewById = async (req, res) => {
  try {
    const review = await getReviewById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch review" });
  }
};

// Update Review
export const modifyReview = async (req, res) => {
  try {
    const { error } = reviewUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedReview = await updateReview(req.params.id, req.body);
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Failed to update review" });
  }
};

// Delete Review
export const removeReview = async (req, res) => {
  try {
    await deleteReview(req.params.id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review" });
  }
};
