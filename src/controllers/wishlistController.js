import {
  wishlistCreateSchema,
  wishlistUpdateSchema,
} from "../validation/wishlistValidation.js";
import {
  createWishlist,
  getAllWishlists,
  getWishlistById,
  deleteWishlist,
} from "../services/wishlistServices.js";

// Create Wishlist
export const addWishlist = async (req, res) => {
  try {
    const { error } = wishlistCreateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { userId, destinationId } = req.body;
    const newWishlist = await createWishlist({ userId, destinationId });
    res.status(201).json(newWishlist);
  } catch (error) {
    res.status(500).json({ error: "Failed to create wishlist" });
  }
};

// Get All Wishlists
export const getWishlists = async (req, res) => {
  try {
    const wishlists = await getAllWishlists();
    res.status(200).json(wishlists);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wishlists" });
  }
};

// Get Wishlist By ID
export const findWishlistById = async (req, res) => {
  try {
    const wishlist = await getWishlistById(req.params.id);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

// Delete Wishlist
export const removeWishlist = async (req, res) => {
  try {
    await deleteWishlist(req.params.id);
    res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete wishlist" });
  }
};
