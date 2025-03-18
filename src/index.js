import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes.js";
import destinationRoutes from "./routes/DestinationRoutes.js";
import ticketRoutes from "./routes/TicketRoutes.js";

dotenv.config();
const app = express();
app.use(express.json()); // Middleware untuk membaca JSON

app.use("/users", userRoutes); // Routing user
app.use("/destinations", destinationRoutes);
app.use("/tickets", ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
