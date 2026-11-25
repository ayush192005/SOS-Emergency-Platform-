import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

// Test API
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SOS Backend is running!",
  });
});

// Allow requests from React frontend
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Test POST API
app.post("/api/test", (req, res) => {
  console.log("Data received from React:", req.body);

  res.json({
    success: true,
    message: "React successfully connected to Express!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});