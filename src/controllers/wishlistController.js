import { wishlistCreateSchema } from "../validation/wishlistValidation.js";
import {
  createWishlist,
  getAllWishlists,
  getWishlistByUserId,
  deleteWishlistByUserAndTicket,
} from "../services/wishlistServices.js";

export const addWishlist = async (req, res) => {
  const { error } = wishlistCreateSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { userId, ticketId } = req.body;
  try {
    console.log("REQ BODY", req.body); // di controller addWishlist
    const newWishlist = await createWishlist(userId, ticketId);
    res.status(201).json(newWishlist);
  } catch (err) {
    console.error("addWishlist error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getWishlists = async (req, res) => {
  try {
    const wishlists = await getAllWishlists();
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findWishlistByUserId = async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const wishlists = await getWishlistByUserId(userId);
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeWishlist = async (req, res) => {
  const { userId, ticketId } = req.body;
  try {
    await deleteWishlistByUserAndTicket(userId, ticketId);
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
