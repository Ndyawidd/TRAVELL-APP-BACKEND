import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import ticketRoutes from "./routes/TicketRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import reviewRoutes from "./routes/ReviewRoutes.js";
import responseRoutes from "./routes/ResponseRoutes.js";

dotenv.config();
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

app.use("/", authRoutes); //handle login sama register
app.use("/admin", adminRoutes); // Routing user
app.use("/users", userRoutes); // Routing user
app.use("/tickets", ticketRoutes);
app.use("/orders", orderRoutes);
app.use("/wishlists", wishlistRoutes);
app.use("/reviews", reviewRoutes);
// app.use("/responses", responseRoutes);

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
