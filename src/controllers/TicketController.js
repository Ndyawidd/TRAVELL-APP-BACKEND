import { validateSchema } from "../utils/validator/validator.js";
import {
  ticketCreateSchema,
  ticketUpdateSchema,
} from "../validation/TicketValidation.js";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../services/TicketServices.js";

import { uploadImageToFirebase } from "../config/firebase.js";

const createNewTicket = async (req, res) => {
  try {
    console.log("Create Ticket - REQ.BODY:", req.body);
    console.log("Create Ticket - REQ.FILE:", req.file);

    const validatedData = validateSchema(ticketCreateSchema, req.body);

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

    const newTicket = await createTicket(validatedData, image);

    res.status(201).json({
      message: "Ticket created successfully!",
      data: newTicket,
    });
  } catch (error) {
    console.error("Create ticket error:", error);
    res.status(400).json({
      error: error.message,
      details: error.stack,
    });
  }
};

const getAllTicketsList = async (req, res) => {
  try {
    const tickets = await getAllTickets();
    res.json(tickets);
  } catch (error) {
    console.error("Get all tickets error:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

const getSingleTicket = async (req, res) => {
  try {
    const ticket = await getTicketById(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json(ticket);
  } catch (error) {
    console.error("Get single ticket error:", error);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
};


const editTicket = async (req, res) => {
  try {
    console.log("Edit Ticket - REQ.BODY:", req.body);
    console.log("Edit Ticket - REQ.FILE:", req.file);

    const validatedData = validateSchema(ticketUpdateSchema, req.body);

    // Handle image upload
    if (req.file) {
      try {
        const image = await uploadImageToFirebase(req.file);
        validatedData.image = image;
        console.log("New image uploaded:", image);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return res.status(400).json({
          error: `Gagal upload gambar: ${uploadError.message}`,
        });
      }
    } else if (req.body.image) {
      // Jika tidak ada file baru tapi ada image (gambar lama)
      validatedData.image = req.body.image;
      console.log("Using existing image:", req.body.image);
    }

    const updatedTicket = await updateTicket(req.params.id, validatedData);

    console.log("UPDATED TICKET:", updatedTicket);

    res.json({
      message: "Ticket updated successfully",
      data: updatedTicket,
    });
  } catch (error) {
    console.error("Edit Ticket Error:", error);
    res.status(400).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

const removeTicket = async (req, res) => {
  try {
    await deleteTicket(req.params.id);
    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Delete ticket error:", error);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
};

const updateTicketCapacityController = async (req, res) => {
  try {
    const ticketId = req.params.id; // Get ID from URL params
    const { capacity } = req.body; // Get capacity from request body

    console.log(`Backend: Received PATCH /tickets/${ticketId}/capacity with body:`, req.body); // DEBUG

    // Basic validation for capacity
    if (typeof capacity !== 'number' || !Number.isInteger(capacity) || capacity < 0) {
      console.error(`Backend: Invalid capacity value received: ${capacity}`); // DEBUG
      return res.status(400).json({ error: 'Invalid capacity value. Must be a non-negative integer.' });
    }

    // Call the generic updateTicket service function with specific data
    const updatedTicket = await updateTicket(ticketId, { capacity: capacity }); //

    if (!updatedTicket) {
      console.error(`Backend: Ticket not found or update failed for ID: ${ticketId}`); // DEBUG
      return res.status(404).json({ error: 'Ticket not found or update failed.' });
    }

    res.status(200).json({
      message: `Ticket ${ticketId} capacity updated successfully to ${capacity}.`,
      data: updatedTicket,
    });
  } catch (error) {
    console.error("Backend: Update Ticket Capacity Error:", error); // DEBUG
    res.status(500).json({
      error: "Failed to update ticket capacity.",
      details: error.message,
    });
  }
};

export {
  createNewTicket,
  getAllTicketsList,
  getSingleTicket,
  editTicket,
  removeTicket,
  updateTicketCapacityController,
};
