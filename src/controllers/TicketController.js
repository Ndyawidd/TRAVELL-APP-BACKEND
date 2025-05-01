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

const createNewTicket = async (req, res) => {
  try {
    const validatedData = validateSchema(ticketCreateSchema, req.body);
    const newTicket = await createTicket(validatedData);
    res
      .status(201)
      .json({ message: "Ticket created successfully!", data: newTicket });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTicketsList = async (req, res) => {
  try {
    const tickets = await getAllTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

const getSingleTicket = async (req, res) => {
  try {
    const ticket = await getTicketById(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
};

const editTicket = async (req, res) => {
  try {
    const validatedData = validateSchema(ticketUpdateSchema, req.body);
    const updatedTicket = await updateTicket(req.params.id, validatedData);
    res.json({ message: "Ticket updated successfully", data: updatedTicket });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeTicket = async (req, res) => {
  try {
    await deleteTicket(req.params.id);
    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete ticket" });
  }
};

export {
  createNewTicket,
  getAllTicketsList,
  getSingleTicket,
  editTicket,
  removeTicket,
};
