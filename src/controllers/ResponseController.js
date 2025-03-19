import { validateSchema } from "../utils/validator/validator.js";
import {
  adminResponseCreateSchema,
  adminResponseUpdateSchema,
} from "../validation/ResponseValidation.js";

import {
  createResponse,
  getAllResponses,
  getResponseById,
  updateResponse,
  deleteResponse,
} from "../services/ResponseServices.js";

const registerResponse = async (req, res) => {
  try {
    const validatedData = validateSchema(adminResponseCreateSchema, req.body);
    const newResponse = await createResponse(validatedData);
    res
      .status(201)
      .json({ message: "Response added successfully!", data: newResponse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getResponses = async (req, res) => {
  try {
    const responses = await getAllResponses();
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch responses" });
  }
};

const getResponse = async (req, res) => {
  try {
    const response = await getResponseById(req.params.id);
    if (!response) return res.status(404).json({ error: "Response not found" });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch response" });
  }
};

const editResponse = async (req, res) => {
  try {
    const validatedData = validateSchema(adminResponseUpdateSchema, req.body);
    const updatedResponse = await updateResponse(req.params.id, validatedData);
    res.json({
      message: "Response updated successfully",
      data: updatedResponse,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeResponse = async (req, res) => {
  try {
    await deleteResponse(req.params.id);
    res.json({ message: "Response deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete response" });
  }
};

export {
  registerResponse,
  getResponses,
  getResponse,
  editResponse,
  removeResponse,
};
