// routes/ReviewRoutes.js
import express from "express";
import {
  addReview,
  getReviews,
  findReviewById,
  modifyReview,
  removeReview,
  fetchReviewsByTicketId,
  addResponse,
  removeResponse,
  modifyResponse,
} from "../controllers/ReviewController.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// Review Routes
router.post("/", upload.single("image"), addReview); // Create a new review
router.get("/", getReviews); // Get all reviews
router.get("/ticket/:ticketId", fetchReviewsByTicketId); // Get reviews by ticket ID
router.get("/:reviewId", findReviewById); // Get a review by ID
router.put("/:reviewId", modifyReview); // Update a review
router.delete("/:reviewId", removeReview); // Delete a review

// Response Routes
router.post("/response", addResponse); // Create a response for a review
router.delete("/response/:responseId", removeResponse); // Delete a response
router.put("/response/:responseId", modifyResponse); // Update a response

export default router;
