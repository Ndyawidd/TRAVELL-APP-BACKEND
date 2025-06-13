import { validateSchema } from "../utils/validator/validator.js";
import { userUpdateSchema } from "../validation/UserValidation.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/UserServices.js";
import bcrypt from "bcrypt";
import { uploadImageToFirebase } from "../config/firebase.js";

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const editUser = async (req, res) => {
  try {
    console.log("Create Review - REQ.BODY:", req.body);
    console.log("Create Review - REQ.FILE:", req.file);
    const validatedData = validateSchema(userUpdateSchema, req.body);

    // Jika user mengirim password, hash terlebih dahulu
    if (validatedData.password) {
      validatedData.password = await bcrypt.hash(validatedData.password, 10);
    }

    //image to firebase
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

    const updatedUser = await updateUser(req.params.id, validatedData);

    res.json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeUser = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export { getUsers, getUser, editUser, removeUser };
