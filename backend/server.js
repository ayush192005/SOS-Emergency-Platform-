
/* eslint-disable no-undef */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.post("/api/send-sms", async (req, res) => {
  try {
    const { to, message } = req.body ?? {};

    if (!to || !message) {
      return res.status(400).json({
        success: false,
        message: "Phone number and message are required.",
      });
    }

    // Validate international phone number format
    if (!/^\+[1-9]\d{7,14}$/.test(to)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must use E.164 format, e.g. +919876543210.",
      });
    }

    if (!process.env.OPENSMS_API_KEY) {
      throw new Error("OpenSMS API key is missing from .env");
    }

    const response = await fetch(
      "https://opensms.dev/api/v1/messages",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENSMS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, message }),
      }
    );

    const data = await response.json();

    console.log("OpenSMS Response:", data);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.error?.message || "OpenSMS request failed.",
        error: data.error || data,
      });
    }

    return res.status(200).json({
      success: true,
      message: "SMS request accepted by OpenSMS.",
      id: data.id,
      status: data.status,
    });

  } catch (error) {
    console.error("OpenSMS Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send SMS.",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
