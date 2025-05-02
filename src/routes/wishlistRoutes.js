import express from "express";
import {
  addWishlist,
  getWishlists,
  findWishlistByUserId,
  removeWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/", addWishlist);                 
router.get("/", getWishlists);                
router.get("/user/:userId", findWishlistByUserId);  
router.delete("/", removeWishlist);            

export default router;
