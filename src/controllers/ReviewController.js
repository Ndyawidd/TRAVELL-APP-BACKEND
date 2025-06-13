import { validateSchema } from "../utils/validator/validator.js";
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
  getReviewsByTicketId,
  createResponse,
  deleteResponse,
  updateResponse,
} from "../services/ReviewServices.js";
import { uploadImageToFirebase } from "../config/firebase.js";

// Create Review
export const addReview = async (req, res) => {
  try {
    console.log("Create Review - REQ.BODY:", req.body);
    console.log("Create Review - REQ.FILE:", req.file);

    const validatedData = validateSchema(reviewCreateSchema, req.body);

    let image = null;
    if (req.file) {
      try {
        image = await uploadImageToFirebase(req.file);
        console.log("Image uploaded successfully:", image);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return res.status(400).json({
          error: `Gagal upload gambar: ${uploadError.message}`,
        });
      }
    }

    const newReview = await createReview(validatedData, image);

    res.status(201).json({
      message: "Review created successfully!",
      data: newReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

// Get All Reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// Get Review By ID
export const findReviewById = async (req, res) => {
  try {
    const reviewId = Number(req.params.reviewId);
    if (isNaN(reviewId)) {
      return res.status(400).json({ error: "Invalid review ID" });
    }
    const review = await getReviewById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ error: "Failed to fetch review" });
  }
};

// Update Review
export const modifyReview = async (req, res) => {
  try {
    const reviewId = Number(req.params.reviewId);
    if (isNaN(reviewId)) {
      return res.status(400).json({ error: "Invalid review ID" });
    }

    const { error } = reviewUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedReview = await updateReview(reviewId, req.body);
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(500).json({ error: "Failed to update review" });
  }
};

// Delete Review
export const removeReview = async (req, res) => {
  try {
    const reviewId = Number(req.params.reviewId);
    if (isNaN(reviewId)) {
      return res.status(400).json({ error: "Invalid review ID" });
    }

    await deleteReview(reviewId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting review:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(500).json({ error: "Failed to delete review" });
  }
};

// Create a Response for a Review
export const addResponse = async (req, res) => {
  try {
    const { reviewId, response } = req.body;
    if (!reviewId || !response) {
      return res
        .status(400)
        .json({ error: "reviewId and response are required" });
    }

    const newResponse = await createResponse(reviewId, response);
    res.status(201).json(newResponse);
  } catch (error) {
    console.error("Error creating response:", error);
    if (error.message.includes("A response already exists")) {
      return res.status(409).json({ error: error.message }); // 409 Conflict
    }
    res.status(500).json({ error: "Failed to create response" });
  }
};

// Delete Response
export const removeResponse = async (req, res) => {
  try {
    const responseId = Number(req.params.responseId);
    if (isNaN(responseId)) {
      return res.status(400).json({ error: "Invalid response ID" });
    }

    await deleteResponse(responseId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting response:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Response not found" });
    }
    res.status(500).json({ error: "Failed to delete response" });
  }
};

// Update Response
export const modifyResponse = async (req, res) => {
  try {
    const responseId = Number(req.params.responseId);
    if (isNaN(responseId)) {
      return res.status(400).json({ error: "Invalid response ID" });
    }

    const { response } = req.body;
    if (!response) {
      return res.status(400).json({ error: "Response text is required" });
    }

    const updatedResponse = await updateResponse(responseId, response);
    res.status(200).json(updatedResponse);
  } catch (error) {
    console.error("Error updating response:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Response not found" });
    }
    res.status(500).json({ error: "Failed to update response" });
  }
};

// Get Reviews By Ticket ID
export const fetchReviewsByTicketId = async (req, res) => {
  try {
    const ticketId = Number(req.params.ticketId);
    if (isNaN(ticketId)) {
      return res.status(400).json({ error: "Invalid ticket ID" });
    }
    const reviews = await getReviewsByTicketId(ticketId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews by ticketId:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

export const fetchAllReviews = async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};
