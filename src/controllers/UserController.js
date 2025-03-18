import { validateSchema } from "../utils/validator/validator.js";
import { userCreateSchema, userUpdateSchema } from "../validation/UserValidation.js";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../services/UserServices.js";

const registerUser = async (req, res) => {
  try {
    const validatedData = validateSchema(userCreateSchema, req.body);
    const newUser = await createUser(validatedData);
    res.status(201).json({ message: "User registered successfully!", data: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
    const validatedData = validateSchema(userUpdateSchema, req.body);
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

export { registerUser, getUsers, getUser, editUser, removeUser };
