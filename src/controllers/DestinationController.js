import { validateSchema } from "../utils/validator/validator.js";
import {
  destinationCreateSchema,
  destinationUpdateSchema,
} from "../validation/DestinationValidation.js";
import {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from "../services/DestinationServices.js";

export const addDestination = async (req, res) => {
  try {
    const validatedData = validateSchema(destinationCreateSchema, req.body);
    const newDestination = await createDestination(validatedData);
    res
      .status(201)
      .json({
        message: "Destination added successfully!",
        data: newDestination,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getDestinations = async (req, res) => {
  try {
    const destinations = await getAllDestinations();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
};

export const getDestination = async (req, res) => {
  try {
    const destination = await getDestinationById(req.params.id);
    if (!destination)
      return res.status(404).json({ error: "Destination not found" });
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch destination" });
  }
};

export const editDestination = async (req, res) => {
  try {
    const validatedData = validateSchema(destinationUpdateSchema, req.body);
    const updatedDestination = await updateDestination(
      req.params.id,
      validatedData
    );
    res.json({
      message: "Destination updated successfully",
      data: updatedDestination,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeDestination = async (req, res) => {
  try {
    await deleteDestination(req.params.id);
    res.json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete destination" });
  }
};
