/* eslint-disable no-undef */
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    console.log("Request body:", req.body);
    const { name, phone, location } = req.body || {};

    if (!name || !phone || !location) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and location are required.",
      });
    }

    const { latitude, longitude } = location;

    if (
      !Number.isFinite(Number(latitude)) ||
      !Number.isFinite(Number(longitude))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid location coordinates.",
      });
    }

    const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    const message = `EMERGENCY ALERT!\n${name} needs help. Their current location is:\n${mapsLink}`;

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    return res.status(200).json({
      success: true,
      message: "Emergency SMS submitted to Twilio.",
      sid: result.sid,
    });
  } catch (error) {
    console.error("Twilio SMS error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to send emergency SMS.",
    });
  }
}
