import express from "express";
import {
  addReview,
  getReviews,
  findReviewById,
  modifyReview,
  removeReview,
} from "../controllers/ReviewController.js";

const router = express.Router();

router.post("/", addReview); // Create Review
router.get("/", getReviews); // Get All Reviews
router.get("/:id", findReviewById); // Get Review By ID
router.put("/:id", modifyReview); // Update Review
router.delete("/:id", removeReview); // Delete Review

export default router;
