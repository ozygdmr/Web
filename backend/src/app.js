import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Adım 4: Health check endpoint'i
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501838"
  });
});

app.use("/events", eventRoutes);

// Eşleşmeyen route'lar için 404 handler
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;