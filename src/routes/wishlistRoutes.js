import express from "express";
import {
  addWishlist,
  getWishlists,
  findWishlistById,
  removeWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/", addWishlist);
router.get("/", getWishlists);
router.get("/:id", findWishlistById);
router.delete("/:id", removeWishlist);

export default router;
